import { 
  type User, 
  type InsertUser,
  type Conversation,
  type InsertConversation,
  type Message,
  type InsertMessage,
  type UserSettings,
  type InsertUserSettings
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getConversationsByUserId(userId: string): Promise<Conversation[]>;
  getConversation(id: string): Promise<Conversation | undefined>;
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  updateConversationTitle(id: string, title: string): Promise<Conversation | undefined>;
  deleteConversation(id: string): Promise<void>;
  
  getMessagesByConversationId(conversationId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  
  getUserSettings(userId: string): Promise<UserSettings | undefined>;
  createUserSettings(settings: InsertUserSettings): Promise<UserSettings>;
  updateUserSettings(userId: string, settings: Partial<InsertUserSettings>): Promise<UserSettings | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private conversations: Map<string, Conversation>;
  private messages: Map<number, Message>;
  private userSettings: Map<string, UserSettings>;
  private messageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.conversations = new Map();
    this.messages = new Map();
    this.userSettings = new Map();
    this.messageIdCounter = 1;
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      id,
      email: insertUser.email ?? null,
      password: insertUser.password ?? null,
      name: insertUser.name ?? null,
      provider: insertUser.provider ?? "local",
      providerId: insertUser.providerId ?? null,
      profileImage: insertUser.profileImage ?? null,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getConversationsByUserId(userId: string): Promise<Conversation[]> {
    return Array.from(this.conversations.values())
      .filter(conv => conv.userId === userId)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const id = randomUUID();
    const now = new Date();
    const conversation: Conversation = {
      id,
      userId: insertConversation.userId,
      title: insertConversation.title ?? "New Chat",
      createdAt: now,
      updatedAt: now,
    };
    this.conversations.set(id, conversation);
    return conversation;
  }

  async updateConversationTitle(id: string, title: string): Promise<Conversation | undefined> {
    const conversation = this.conversations.get(id);
    if (!conversation) return undefined;
    
    const updated: Conversation = {
      ...conversation,
      title,
      updatedAt: new Date(),
    };
    this.conversations.set(id, updated);
    return updated;
  }

  async deleteConversation(id: string): Promise<void> {
    this.conversations.delete(id);
    Array.from(this.messages.entries())
      .filter(([_, msg]) => msg.conversationId === id)
      .forEach(([msgId]) => this.messages.delete(msgId));
  }

  async getMessagesByConversationId(conversationId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(msg => msg.conversationId === conversationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageIdCounter++;
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    
    const conversation = this.conversations.get(insertMessage.conversationId);
    if (conversation) {
      conversation.updatedAt = new Date();
      this.conversations.set(conversation.id, conversation);
    }
    
    return message;
  }

  async getUserSettings(userId: string): Promise<UserSettings | undefined> {
    return Array.from(this.userSettings.values()).find(
      settings => settings.userId === userId
    );
  }

  async createUserSettings(insertSettings: InsertUserSettings): Promise<UserSettings> {
    const id = randomUUID();
    const settings: UserSettings = {
      id,
      userId: insertSettings.userId,
      model: insertSettings.model ?? "gpt-4o",
      maxTokens: insertSettings.maxTokens ?? 8192,
    };
    this.userSettings.set(id, settings);
    return settings;
  }

  async updateUserSettings(userId: string, partialSettings: Partial<InsertUserSettings>): Promise<UserSettings | undefined> {
    const settings = await this.getUserSettings(userId);
    if (!settings) return undefined;
    
    const updated: UserSettings = {
      ...settings,
      ...partialSettings,
    };
    this.userSettings.set(settings.id, updated);
    return updated;
  }
}

export const storage = new MemStorage();
