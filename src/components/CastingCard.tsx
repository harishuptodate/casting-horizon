import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

interface CastingCardProps {
  title: string;
  role: string;
  type: string;
  image: string;
}

export function CastingCard({ title, role, type, image }: CastingCardProps) {
  return (
    <Card className="casting-card group cursor-pointer">
      <div className="relative aspect-[2/3] overflow-hidden rounded-md">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 p-4">
          <Badge className="mb-2" variant="secondary">
            {type}
          </Badge>
          <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
          <p className="mb-3 text-sm text-gray-300">{role}</p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Deadline: 7 days</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>Los Angeles</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>10 roles</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}