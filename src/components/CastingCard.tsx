
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useQueryClient } from "@tanstack/react-query";
import { CardActions } from "./casting/CardActions";
import { CardContent } from "./casting/CardContent";
import { DeleteDialog } from "./casting/DeleteDialog";

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
          
          <CardActions
            isFavorited={isFavorited}
            isAdmin={isAdmin}
            onFavorite={handleFavorite}
            onShare={handleShare}
            onDelete={() => setIsDeleteDialogOpen(true)}
          />

          <CardContent
            title={title}
            role={role}
            type={type}
            description={description}
            isVerified={isVerified}
            deadline={deadline}
            location={location}
            roles={roles}
            gender={gender}
            min_age={min_age}
            max_age={max_age}
          />
        </div>
      </Card>

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDelete}
      />
    </>
  );
}
