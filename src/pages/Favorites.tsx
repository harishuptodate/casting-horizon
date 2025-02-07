
import { NavBar } from "@/components/NavBar";
import { CastingCard } from "@/components/CastingCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Favorites = () => {
  const { user } = useAuth();

  const { data: favorites, isLoading, error } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data, error } = await supabase
        .from("favorites")
        .select(`
          casting_calls (
            id,
            title,
            role,
            type,
            description,
            deadline,
            location,
            roles_available,
            image_url,
            is_verified,
            min_age,
            max_age
          )
        `)
        .eq("user_id", user.id);

      if (error) throw error;

      return data?.map(f => f.casting_calls) || [];
    },
    enabled: !!user?.id,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-lg">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error.message || "Failed to load favorites. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container py-12">
        <h1 className="mb-8 text-3xl font-bold">My Favorites</h1>
        {favorites && favorites.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {favorites.map((casting) => (
              <CastingCard key={casting.id} {...casting} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-muted-foreground">No favorite casting calls yet.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Favorites;
