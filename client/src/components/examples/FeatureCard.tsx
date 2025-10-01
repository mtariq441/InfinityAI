import { FeatureCard } from '../FeatureCard';
import { Zap } from 'lucide-react';

export default function FeatureCardExample() {
  return (
    <FeatureCard
      icon={Zap}
      title="Lightning Fast"
      description="Get instant AI-powered insights and recommendations for your business."
    />
  );
}
