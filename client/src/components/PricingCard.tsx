import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "wouter";

interface PricingCardProps {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export function PricingCard({
  name,
  price,
  period = "month",
  description,
  features,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={`p-8 relative hover-elevate transition-all duration-300 ${
        popular ? "border-primary border-2 shadow-lg" : ""
      }`}
      data-testid={`card-pricing-${name.toLowerCase()}`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground mt-2">{description}</p>
        </div>
        <div className="flex items-baseline space-x-1">
          <span className="text-4xl lg:text-5xl font-bold">{price}</span>
          {price !== "Free" && (
            <span className="text-muted-foreground">/{period}</span>
          )}
        </div>
        <Link href="/login">
          <Button
            className="w-full"
            variant={popular ? "default" : "outline"}
            size="lg"
            data-testid={`button-pricing-${name.toLowerCase()}`}
          >
            Get Started
          </Button>
        </Link>
        <div className="space-y-3 pt-4 border-t border-border">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
