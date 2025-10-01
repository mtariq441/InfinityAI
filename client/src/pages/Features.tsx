import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, TrendingUp, LayoutDashboard, Brain, Plug, Check } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: FileText,
      title: "Business Plan AI",
      description: "Generate comprehensive business plans tailored to your industry and goals.",
      benefits: [
        "Market analysis and competitive research",
        "Financial projections and revenue models",
        "Strategic roadmaps and milestones",
        "Executive summaries for investors",
      ],
    },
    {
      icon: TrendingUp,
      title: "Marketing Assistant",
      description: "Create and optimize marketing campaigns with AI-powered insights.",
      benefits: [
        "SEO-optimized content generation",
        "Social media post scheduling",
        "Ad campaign recommendations",
        "Performance analytics and reporting",
      ],
    },
    {
      icon: LayoutDashboard,
      title: "Daily Dashboard",
      description: "Get personalized action items and insights every morning.",
      benefits: [
        "AI-generated daily task lists",
        "Priority recommendations",
        "Performance metrics tracking",
        "Goal progress monitoring",
      ],
    },
    {
      icon: Brain,
      title: "AI Memory",
      description: "Your AI assistant remembers your business context and preferences.",
      benefits: [
        "Persistent business knowledge",
        "Personalized recommendations",
        "Context-aware suggestions",
        "Learning from your feedback",
      ],
    },
    {
      icon: Plug,
      title: "Integrations",
      description: "Connect seamlessly with your favorite business tools.",
      benefits: [
        "Gmail and calendar sync",
        "Shopify e-commerce integration",
        "Webflow website management",
        "Google Ads campaign automation",
      ],
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            All-in-One AI Business Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to plan, launch, and scale your business with the power of artificial intelligence.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold">{feature.title}</h2>
                <p className="text-lg text-muted-foreground">{feature.description}</p>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Card className={`p-8 lg:p-12 bg-gradient-to-br from-card to-card/50 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                <div className="aspect-video flex items-center justify-center">
                  <feature.icon className="w-32 h-32 text-primary/20" />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Card className="p-8 lg:p-12 text-center space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to transform your business?
            </h2>
            <p className="text-lg text-muted-foreground">
              Upgrade to Pro for just $15/month and unlock unlimited AI-powered insights.
            </p>
            <Link href="/pricing">
              <Button size="lg" className="text-lg px-8" data-testid="button-upgrade-pro">
                Upgrade to Pro → $15/month
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
}
