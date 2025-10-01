import { TeamCard } from '../TeamCard';
import teamImage from '@assets/stock_images/professional_busines_06abdee6.jpg';

export default function TeamCardExample() {
  return (
    <TeamCard
      name="Alex Chen"
      role="CEO & Founder"
      image={teamImage}
      bio="Former Google AI researcher with a passion for democratizing business intelligence."
      linkedin="https://linkedin.com"
      twitter="https://twitter.com"
    />
  );
}
