import { CastingCard } from "./CastingCard";

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
  return (
    <section className="py-8">
      <h2 className="mb-6 text-2xl font-semibold">{title}</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {castings.map((casting) => (
          <CastingCard key={casting.id} {...casting} />
        ))}
      </div>
    </section>
  );
}