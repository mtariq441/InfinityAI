import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SiLinkedin, SiX } from "react-icons/si";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
}

export function TeamCard({ name, role, image, bio, linkedin, twitter }: TeamCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="p-6 hover-elevate transition-all duration-300" data-testid={`card-team-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex flex-col items-center text-center space-y-4">
        <Avatar className="w-24 h-24 lg:w-32 lg:h-32 border-4 border-primary/10">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-sm text-primary">{role}</p>
        </div>
        <p className="text-sm text-muted-foreground">{bio}</p>
        <div className="flex space-x-3">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-linkedin-${name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <SiLinkedin className="w-5 h-5" />
            </a>
          )}
          {twitter && (
            <a
              href={twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              data-testid={`link-twitter-${name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <SiX className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
