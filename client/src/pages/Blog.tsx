import { useState } from "react";
import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import blog1 from "@assets/stock_images/modern_startup_offic_f50da08c.jpg";
import blog2 from "@assets/stock_images/modern_startup_offic_5a170015.jpg";
import blog3 from "@assets/stock_images/modern_startup_offic_10f7241f.jpg";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "AI", "SEO", "Startups", "Automation"];

  const posts = [
    {
      title: "10 Ways AI Can Transform Your Business Strategy",
      excerpt: "Discover how artificial intelligence is revolutionizing the way businesses plan, execute, and grow their operations in 2025.",
      image: blog1,
      date: "Jan 15, 2025",
      category: "AI",
      slug: "ai-transform-business",
    },
    {
      title: "The Complete Guide to SEO in 2025",
      excerpt: "Everything you need to know about modern SEO strategies, from keyword research to technical optimization.",
      image: blog2,
      date: "Jan 10, 2025",
      category: "SEO",
      slug: "complete-guide-seo",
    },
    {
      title: "Building a Startup in the AI Era",
      excerpt: "Learn from successful founders who leveraged AI to launch and scale their startups faster than ever before.",
      image: blog3,
      date: "Jan 5, 2025",
      category: "Startups",
      slug: "building-startup-ai",
    },
    {
      title: "Automating Your Marketing Workflow",
      excerpt: "Step-by-step guide to setting up marketing automation that saves time and increases conversions.",
      image: blog1,
      date: "Dec 28, 2024",
      category: "Automation",
      slug: "automating-marketing",
    },
    {
      title: "AI-Powered Business Planning: A New Approach",
      excerpt: "Why traditional business plans are outdated and how AI is changing the game for entrepreneurs.",
      image: blog2,
      date: "Dec 20, 2024",
      category: "AI",
      slug: "ai-powered-planning",
    },
    {
      title: "From Idea to Launch: 90-Day Startup Plan",
      excerpt: "A proven framework for taking your business idea from concept to launch in just three months.",
      image: blog3,
      date: "Dec 15, 2024",
      category: "Startups",
      slug: "idea-to-launch",
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col">
      <section className="py-20 lg:py-32 bg-gradient-to-br from-background via-primary/5 to-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Resources & Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to build and grow your business with AI-powered strategies and insights.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Search</h3>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search articles..."
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      data-testid="input-blog-search"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-4">Topics</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                        data-testid={`button-category-${category.toLowerCase()}`}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found. Try a different search or category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
