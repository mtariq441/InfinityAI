import { TeamCard } from "@/components/TeamCard";
import { Card } from "@/components/ui/card";
import { Target, Heart, Zap } from "lucide-react";
import team1 from "@assets/stock_images/professional_busines_81613ec2.jpg";
import team2 from "@assets/stock_images/professional_busines_06abdee6.jpg";
import team3 from "@assets/stock_images/professional_busines_71e05e9d.jpg";

export default function About() {
  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image: team1,
      bio: "Former Google AI researcher with a passion for democratizing business intelligence.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      name: "Alex Chen",
      role: "CTO",
      image: team2,
      bio: "15+ years building scalable AI systems for Fortune 500 companies.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Product",
      image: team3,
      bio: "Product leader focused on creating intuitive AI experiences for businesses.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We're committed to empowering every entrepreneur with AI tools that were once only available to large corporations.",
    },
    {
      icon: Heart,
      title: "Customer-First",
      description: "Every feature we build starts with understanding our customers' needs and challenges.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We're constantly pushing the boundaries of what's possible with AI to help businesses succeed.",
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            We're building the future of business with AI
          </h1>
          <p className="text-xl text-muted-foreground">
            Our mission is to democratize AI-powered business intelligence and make it accessible to every entrepreneur.
          </p>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Infinity AI was born from a simple observation: while AI technology was advancing rapidly, most small businesses and entrepreneurs couldn't access the tools that large corporations were using to gain competitive advantages.
                </p>
                <p>
                  In 2023, our founding team came together with a shared vision to change that. We wanted to create an AI assistant that could understand the unique challenges of building and growing a business, and provide actionable insights that actually move the needle.
                </p>
                <p>
                  Today, we're proud to serve thousands of businesses worldwide, helping them make smarter decisions, save time, and achieve their goals faster with the power of AI.
                </p>
              </div>
            </div>
            <Card className="p-8 lg:p-12 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="space-y-8">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                  <div className="text-muted-foreground">Active businesses</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">500,000+</div>
                  <div className="text-muted-foreground">Business plans generated</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-muted-foreground">Customer satisfaction</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {values.map((value) => (
              <Card key={value.title} className="p-8 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate experts dedicated to your success
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <TeamCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
