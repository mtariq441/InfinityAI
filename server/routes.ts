import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { insertUserSchema, insertConversationSchema, insertMessageSchema } from "@shared/schema";
import OpenAI from "openai";

const JWT_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable must be set in production");
  }
  return "dev-secret-key-not-for-production";
})();
const SALT_ROUNDS = 10;

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface AuthRequest extends Request {
  userId?: string;
}

function authenticateToken(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.userId = decoded.userId;
    next();
  });
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(validatedData.password, SALT_ROUNDS);
      const user = await storage.createUser({
        ...validatedData,
        password: hashedPassword,
      });

      await storage.createUserSettings({ userId: user.id });

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message || "Login failed" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
      });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/conversations", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const conversations = await storage.getConversationsByUserId(req.userId!);
      res.json(conversations);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/conversations", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const validatedData = insertConversationSchema.parse({
        ...req.body,
        userId: req.userId,
      });

      const conversation = await storage.createConversation(validatedData);
      res.json(conversation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.delete("/api/conversations/:id", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const conversation = await storage.getConversation(req.params.id);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      if (conversation.userId !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      await storage.deleteConversation(req.params.id);
      res.json({ success: true });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/conversations/:id/messages", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const conversation = await storage.getConversation(req.params.id);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      if (conversation.userId !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      const messages = await storage.getMessagesByConversationId(req.params.id);
      res.json(messages);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/chat", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const { conversationId, message, model = "gpt-5", maxTokens = 8192 } = req.body;

      if (!conversationId || !message) {
        return res.status(400).json({ error: "conversationId and message are required" });
      }

      const conversation = await storage.getConversation(conversationId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      if (conversation.userId !== req.userId) {
        return res.status(403).json({ error: "Unauthorized" });
      }

      await storage.createMessage({
        conversationId,
        role: "user",
        content: message,
      });

      const messages = await storage.getMessagesByConversationId(conversationId);
      const chatMessages = messages.map(m => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      }));

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      const stream = await openai.chat.completions.create({
        model: model,
        messages: chatMessages,
        max_completion_tokens: maxTokens,
        stream: true,
      });

      let fullResponse = "";

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          fullResponse += content;
          res.write(`data: ${JSON.stringify({ content })}\n\n`);
        }
      }

      await storage.createMessage({
        conversationId,
        role: "assistant",
        content: fullResponse,
      });

      if (messages.length === 0) {
        const titlePrompt = `Generate a short 3-5 word title for a conversation that starts with: "${message.substring(0, 100)}"`;
        const titleResponse = await openai.chat.completions.create({
          model: "gpt-5",
          messages: [{ role: "user", content: titlePrompt }],
          max_completion_tokens: 20,
        });
        const title = titleResponse.choices[0].message.content?.replace(/['"]/g, '').trim() || "New Chat";
        await storage.updateConversationTitle(conversationId, title);
      }

      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error: any) {
      console.error("Chat error:", error);
      res.status(500).json({ error: error.message || "Chat failed" });
    }
  });

  app.get("/api/settings", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const settings = await storage.getUserSettings(req.userId!);
      if (!settings) {
        const newSettings = await storage.createUserSettings({ userId: req.userId! });
        return res.json(newSettings);
      }
      res.json(settings);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/settings", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
      const settings = await storage.updateUserSettings(req.userId!, req.body);
      if (!settings) {
        return res.status(404).json({ error: "Settings not found" });
      }
      res.json(settings);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
