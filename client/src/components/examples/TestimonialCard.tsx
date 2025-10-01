import { TestimonialCard } from '../TestimonialCard';
import testimonialImage from '@assets/stock_images/professional_busines_81613ec2.jpg';

export default function TestimonialCardExample() {
  return (
    <TestimonialCard
      quote="Infinity AI helped me launch my business in just 2 weeks. The AI-generated business plan was spot on!"
      author="Sarah Johnson"
      role="Founder, TechStart"
      image={testimonialImage}
    />
  );
}
