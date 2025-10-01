import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  MessageSquare,
  FileText,
  CheckSquare,
  Plug,
  CreditCard,
  Send,
  Plus,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hello! I'm your AI business co-pilot. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("chat");

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I understand. Let me help you with that. This is a demo response showing how the AI would interact with your request.",
        },
      ]);
    }, 1000);
  };

  const savedPlans = [
    { id: 1, title: "E-commerce Business Plan", date: "Jan 15, 2025" },
    { id: 2, title: "Marketing Strategy Q1", date: "Jan 10, 2025" },
    { id: 3, title: "Product Launch Roadmap", date: "Jan 5, 2025" },
  ];

  const tasks = [
    { id: 1, title: "Review Q1 financial projections", completed: false },
    { id: 2, title: "Update social media content calendar", completed: true },
    { id: 3, title: "Prepare investor pitch deck", completed: false },
    { id: 4, title: "Analyze competitor pricing", completed: false },
  ];

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r border-border bg-card flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">∞</span>
            </div>
            <span className="font-bold text-xl">Infinity AI</span>
          </div>
        </div>

        <ScrollArea className="flex-1 p-4">
          <nav className="space-y-2">
            <Button
              variant={activeTab === "chat" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("chat")}
              data-testid="button-nav-chat"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
            <Button
              variant={activeTab === "projects" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("projects")}
              data-testid="button-nav-projects"
            >
              <FileText className="w-4 h-4 mr-2" />
              Saved Projects
            </Button>
            <Button
              variant={activeTab === "tasks" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("tasks")}
              data-testid="button-nav-tasks"
            >
              <CheckSquare className="w-4 h-4 mr-2" />
              Tasks
            </Button>
            <Button
              variant={activeTab === "integrations" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("integrations")}
              data-testid="button-nav-integrations"
            >
              <Plug className="w-4 h-4 mr-2" />
              Integrations
            </Button>
            <Button
              variant={activeTab === "billing" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("billing")}
              data-testid="button-nav-billing"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Billing
            </Button>
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">John Doe</span>
            </div>
            <Button variant="ghost" size="icon">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold">
            {activeTab === "chat" && "AI Chat"}
            {activeTab === "projects" && "Saved Projects"}
            {activeTab === "tasks" && "Daily Tasks"}
            {activeTab === "integrations" && "Integrations"}
            {activeTab === "billing" && "Billing & Subscription"}
          </h1>
          <ThemeToggle />
        </header>

        <div className="flex-1 overflow-hidden">
          {activeTab === "chat" && (
            <div className="h-full flex flex-col">
              <ScrollArea className="flex-1 p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      data-testid={`message-${message.role}-${index}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-border"
                        }`}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="border-t border-border p-6">
                <div className="max-w-3xl mx-auto flex space-x-4">
                  <Input
                    placeholder="Ask me anything about your business..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                    data-testid="input-chat-message"
                  />
                  <Button onClick={handleSend} data-testid="button-send-message">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-muted-foreground">Your saved business plans and documents</p>
                  <Button data-testid="button-new-project">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </div>
                <div className="space-y-4">
                  {savedPlans.map((plan) => (
                    <Card key={plan.id} className="p-6 hover-elevate cursor-pointer" data-testid={`card-project-${plan.id}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{plan.title}</h3>
                          <p className="text-sm text-muted-foreground">Last updated: {plan.date}</p>
                        </div>
                        <FileText className="w-6 h-6 text-muted-foreground" />
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-muted-foreground">AI-generated daily action items for your business</p>
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <Card key={task.id} className="p-4 hover-elevate cursor-pointer" data-testid={`card-task-${task.id}`}>
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => console.log("Toggle task", task.id)}
                          className="w-5 h-5 rounded border-border"
                          data-testid={`checkbox-task-${task.id}`}
                        />
                        <span className={task.completed ? "line-through text-muted-foreground" : ""}>
                          {task.title}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <p className="text-muted-foreground">Connect your favorite tools and automate workflows</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["Gmail", "Shopify", "Webflow", "Google Ads"].map((integration) => (
                    <Card key={integration} className="p-6" data-testid={`card-integration-${integration.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold mb-1">{integration}</h3>
                          <p className="text-sm text-muted-foreground">Not connected</p>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                <Card className="p-8">
                  <h3 className="text-2xl font-bold mb-4">Current Plan: Pro</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monthly subscription</span>
                      <span className="font-semibold">$15/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next billing date</span>
                      <span className="font-semibold">Feb 15, 2025</span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <Button variant="outline" className="w-full">Manage Subscription</Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
