import { useState } from "react";
import { PricingCard } from "@/components/PricingCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Free",
      price: "Free",
      description: "Perfect for trying out Infinity AI",
      features: [
        "10 AI queries per day",
        "Basic business plan templates",
        "Limited marketing insights",
        "Community support",
      ],
    },
    {
      name: "Pro",
      price: isYearly ? "$12" : "$15",
      period: "month",
      description: "Everything you need to grow",
      features: [
        "Unlimited AI queries",
        "Full business plan generation",
        "Advanced marketing & SEO tools",
        "AI memory of your business",
        "Priority email support",
        "All integrations included",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: isYearly ? "$79" : "$99",
      period: "month",
      description: "For teams and larger organizations",
      features: [
        "Everything in Pro",
        "Team AI with shared context",
        "Custom AI training on your data",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced analytics",
      ],
    },
  ];

  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any differences.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express) and PayPal for your convenience.",
    },
    {
      question: "Is there a free trial?",
      answer: "Yes! Our Free plan gives you 10 queries per day to try out Infinity AI. You can upgrade anytime to unlock unlimited access.",
    },
    {
      question: "What's included in AI memory?",
      answer: "AI memory allows our assistant to remember your business details, preferences, and previous conversations, providing more personalized and contextual recommendations.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Absolutely. There are no long-term contracts. You can cancel your subscription at any time from your account settings.",
    },
  ];

  return (
    <div className="flex flex-col">
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Simple pricing, built for everyone
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your business. Start free, upgrade as you grow.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Monthly
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-14 h-7 rounded-full transition-colors ${
                isYearly ? "bg-primary" : "bg-muted"
              }`}
              data-testid="button-pricing-toggle"
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                  isYearly ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </Button>
            <span className={`text-sm font-medium ${isYearly ? "text-foreground" : "text-muted-foreground"}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                Save 20%
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left" data-testid={`accordion-faq-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl lg:text-5xl font-bold">
            Start your journey today
          </h2>
          <p className="text-xl text-muted-foreground">
            No credit card required. Start with our free plan and upgrade when you're ready.
          </p>
          <Link href="/login">
            <Button size="lg" className="text-lg px-8" data-testid="button-pricing-start-free">
              Start Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
