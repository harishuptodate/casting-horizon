import { CastingCard } from "./CastingCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface CastingSectionProps {
  title: string;
  castings: Array<{
    id: string;
    title: string;
    role: string;
    type: string;
    image: string;
  }>;
}

export function CastingSection({ title, castings }: CastingSectionProps) {
  if (!castings.length) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Button variant="ghost" className="gap-2">
          View all <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {castings.map((casting) => (
          <CastingCard key={casting.id} {...casting} />
        ))}
      </div>
    </section>
  );
}