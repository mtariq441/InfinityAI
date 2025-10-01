import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { Calendar } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  slug: string;
}

export function BlogCard({ title, excerpt, image, date, category, slug }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`}>
      <Card className="overflow-hidden hover-elevate transition-all duration-300 cursor-pointer" data-testid={`card-blog-${slug}`}>
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="p-6 space-y-3">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span className="text-primary font-medium">{category}</span>
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold line-clamp-2">{title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
        </div>
      </Card>
    </Link>
  );
}
