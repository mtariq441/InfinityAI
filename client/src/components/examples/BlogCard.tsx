import { BlogCard } from '../BlogCard';
import blogImage from '@assets/stock_images/modern_startup_offic_f50da08c.jpg';

export default function BlogCardExample() {
  return (
    <BlogCard
      title="10 Ways AI Can Transform Your Business Strategy"
      excerpt="Discover how artificial intelligence is revolutionizing the way businesses plan, execute, and grow their operations in 2025."
      image={blogImage}
      date="Jan 15, 2025"
      category="AI"
      slug="ai-transform-business"
    />
  );
}
