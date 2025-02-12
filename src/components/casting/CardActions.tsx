
import { Button } from "@/components/ui/button";
import { Heart, Share2, Trash2 } from "lucide-react";

interface CardActionsProps {
  isFavorited: boolean;
  isAdmin: boolean;
  onFavorite: () => void;
  onShare: () => void;
  onDelete: () => void;
}

export function CardActions({
  isFavorited,
  isAdmin,
  onFavorite,
  onShare,
  onDelete,
}: CardActionsProps) {
  return (
    <div className="absolute right-2 top-2 flex gap-2">
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        onClick={onFavorite}
      >
        <Heart className={`h-4 w-4 ${isFavorited ? "fill-current text-red-500" : ""}`} />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        onClick={onShare}
      >
        <Share2 className="h-4 w-4" />
      </Button>
      {isAdmin && (
        <Button
          variant="destructive"
          size="icon"
          className="h-8 w-8 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
          onClick={onDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
