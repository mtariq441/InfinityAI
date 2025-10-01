import { PricingCard } from '../PricingCard';

export default function PricingCardExample() {
  return (
    <PricingCard
      name="Pro"
      price="$15"
      period="month"
      description="Perfect for growing businesses"
      features={[
        "Unlimited AI queries",
        "Business plan generation",
        "Marketing & SEO assistant",
        "AI memory of your business",
        "Priority support"
      ]}
      popular={true}
    />
  );
}
