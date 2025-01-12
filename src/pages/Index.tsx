import { Button } from "@/components/ui/button";
import { CastingSection } from "@/components/CastingSection";

const featuredCastings = [
  {
    id: "1",
    title: "Drama Series Lead",
    role: "Female Lead, 25-35",
    type: "TV Series",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    id: "2",
    title: "Commercial Voice Over",
    role: "Male Voice Actor, 30-45",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
  },
  {
    id: "3",
    title: "Independent Film",
    role: "Supporting Role, 20-30",
    type: "Film",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  },
  {
    id: "4",
    title: "Theater Production",
    role: "Ensemble Cast, 18+",
    type: "Theater",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 to-background" />
        <div className="container relative flex h-full items-center">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-5xl font-bold">Discover Your Next Role</h1>
            <p className="mb-8 text-xl text-gray-300">
              Browse thousands of casting calls and audition opportunities. Your next big break is just a click away.
            </p>
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Castings */}
      <div className="container">
        <CastingSection title="Featured Opportunities" castings={featuredCastings} />
      </div>
    </div>
  );
};

export default Index;