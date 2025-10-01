import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  image: string;
}

export function TestimonialCard({ quote, author, role, image }: TestimonialCardProps) {
  const initials = author
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="p-6 hover-elevate transition-all duration-300" data-testid={`card-testimonial-${author.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex flex-col space-y-4">
        <p className="text-muted-foreground italic">"{quote}"</p>
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={image} alt={author} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-sm">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
