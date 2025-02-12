
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, User } from "lucide-react";
import { format } from "date-fns";

interface CardContentProps {
  title: string;
  role: string;
  type: string;
  description?: string;
  isVerified?: boolean;
  deadline: string;
  location: string;
  roles: number;
  gender: string;
  min_age?: number;
  max_age?: number;
}

export function CardContent({
  title,
  role,
  type,
  description,
  isVerified,
  deadline,
  location,
  roles,
  gender,
  min_age,
  max_age,
}: CardContentProps) {
  const getAgeRangeText = () => {
    if (min_age && max_age) {
      return `${min_age}-${max_age} years`;
    } else if (min_age) {
      return `${min_age}+ years`;
    } else if (max_age) {
      return `Up to ${max_age} years`;
    }
    return "Any age";
  };

  const formatDeadline = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const getGenderIcon = () => {
    switch (gender.toLowerCase()) {
      case 'male':
        return <User className="h-3 w-3 text-blue-500" />;
      case 'female':
        return <User className="h-3 w-3 text-pink-500" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  return (
    <div className="absolute bottom-0 p-4">
      <div className="mb-2 flex gap-2">
        <Badge variant="secondary">{type}</Badge>
        {isVerified && (
          <Badge variant="default" className="bg-green-500">
            Verified
          </Badge>
        )}
      </div>
      <h3 className="mb-1 text-lg font-semibold text-white">{title}</h3>
      <p className="mb-3 text-sm text-gray-300">{role}</p>
      {description && (
        <p className="mb-3 text-sm text-gray-300 line-clamp-2">{description}</p>
      )}
      <div className="flex flex-wrap gap-3 text-xs text-gray-300">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3 text-white" />
          <span>Deadline: {formatDeadline(deadline)}</span>
        </div>
        <div className="flex items-center gap-1">
          {getGenderIcon()}
          <span className="capitalize">{gender}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3" />
          <span>{roles} roles</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="h-3 w-3" />
          <span>{getAgeRangeText()}</span>
        </div>
      </div>
    </div>
  );
}
