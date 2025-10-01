import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import Login from "@/pages/Login";
import Chat from "@/pages/Chat";
import { useEffect } from "react";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <Component />;
}

function AppContent() {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (location === "/" && isAuthenticated) {
      window.location.href = "/chat";
    } else if (location === "/" && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [location, isAuthenticated]);

  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/chat">
        <ProtectedRoute component={Chat} />
      </Route>
      <Route path="/">
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">AI Chat</h1>
            <p className="text-muted-foreground">Redirecting...</p>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AppContent />
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
