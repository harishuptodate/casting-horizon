
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Heart, Share2, User, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";

interface CastingCardProps {
  id: string;
  title: string;
  role: string;
  type: string;
  image: string;
  deadline?: string;
  location?: string;
  roles?: number;
  description?: string;
  isVerified?: boolean;
  min_age?: number;
  max_age?: number;
  gender?: string;
}

export function CastingCard({
  id,
  title,
  role,
  type,
  image,
  deadline = "7 days",
  location = "Los Angeles",
  roles = 10,
  description,
  isVerified = false,
  min_age,
  max_age,
  gender = "any",
}: CastingCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast(isFavorited ? "Removed from favorites" : "Added to favorites", {
      description: isFavorited 
        ? "This casting call has been removed from your favorites" 
        : "This casting call has been added to your favorites",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast("Link copied", {
      description: "The link has been copied to your clipboard",
    });
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('casting_calls')
        .delete()
        .eq('id', id);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ["castings"] });
      queryClient.invalidateQueries({ queryKey: ["pendingCastings"] });

      toast.success("Casting call deleted successfully");
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting casting call:", error);
      toast.error("Failed to delete casting call");
    }
  };

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
    <>
      <Card className="casting-card group cursor-pointer">
        <div className="relative aspect-[2/3] overflow-hidden rounded-md">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <div className="absolute right-2 top-2 flex gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorited ? "fill-current text-red-500" : ""}`} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              onClick={handleShare}
            >
              <Share2 className="h-4 w-4" />
            </Button>
            {isAdmin && (
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>

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
                <span>{formatDeadline(deadline)}</span>
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
        </div>
      </Card>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this casting call. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
