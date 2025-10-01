import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/FeatureCard";
import { TestimonialCard } from "@/components/TestimonialCard";
import { FileText, TrendingUp, LayoutDashboard, Plug, MessageSquare, Eye, Rocket } from "lucide-react";
import { SiShopify, SiWebflow, SiGoogle } from "react-icons/si";
import heroImage from "@assets/generated_images/AI_assistant_hero_illustration_a14ab5ab.png";
import testimonial1 from "@assets/stock_images/professional_busines_81613ec2.jpg";
import testimonial2 from "@assets/stock_images/professional_busines_06abdee6.jpg";
import testimonial3 from "@assets/stock_images/professional_busines_71e05e9d.jpg";

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: "Business Plan Generator",
      description: "Create comprehensive business plans in minutes with AI-powered insights and market analysis.",
    },
    {
      icon: TrendingUp,
      title: "Marketing & SEO Assistant",
      description: "Optimize your marketing strategy with AI-driven SEO recommendations and content creation.",
    },
    {
      icon: LayoutDashboard,
      title: "Daily Dashboard",
      description: "Get personalized daily action items and insights to keep your business on track.",
    },
    {
      icon: Plug,
      title: "Automation Integrations",
      description: "Connect with your favorite tools and automate workflows seamlessly.",
    },
  ];

  const testimonials = [
    {
      quote: "Infinity AI helped me launch my business in just 2 weeks. The AI-generated business plan was spot on!",
      author: "Sarah Johnson",
      role: "Founder, TechStart",
      image: testimonial1,
    },
    {
      quote: "The marketing insights are incredible. My SEO rankings improved by 300% in just 3 months.",
      author: "Michael Chen",
      role: "CEO, GrowthLabs",
      image: testimonial2,
    },
    {
      quote: "Best investment for my startup. The daily dashboard keeps me focused on what matters most.",
      author: "Emily Rodriguez",
      role: "Entrepreneur",
      image: testimonial3,
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                Your AI Business{" "}
                <span className="text-primary">Co-Pilot</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground">
                Plan, launch, and grow your business with AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="text-lg px-8" data-testid="button-hero-start-free">
                    Start Free
                  </Button>
                </Link>
                <Link href="/features">
                  <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-hero-see-demo">
                    See Demo
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative z-10">
                <img
                  src={heroImage}
                  alt="AI Assistant Illustration"
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">Everything you need to succeed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful AI tools designed to help you build and grow your business faster.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to transform your business with AI
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4" data-testid="step-ask">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                <MessageSquare className="w-8 h-8 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-semibold">Ask</h3>
              <p className="text-muted-foreground">
                Type your business questions or goals into our AI interface
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4" data-testid="step-review">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                <Eye className="w-8 h-8 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-semibold">Review</h3>
              <p className="text-muted-foreground">
                AI prepares comprehensive plans and actionable content for you
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-4" data-testid="step-launch">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center relative">
                <Rocket className="w-8 h-8 text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-semibold">Launch</h3>
              <p className="text-muted-foreground">
                Publish your plans and automate your business workflows
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">Trusted by innovators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of businesses using AI to accelerate their growth
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 mb-16 grayscale opacity-60">
            <SiShopify className="w-12 h-12" />
            <SiWebflow className="w-12 h-12" />
            <SiGoogle className="w-12 h-12" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.author} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-6xl font-bold">
            Start growing with AI today
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of businesses already using Infinity AI to achieve their goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8" data-testid="button-cta-get-started">
                Get Started Free
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-cta-explore">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
