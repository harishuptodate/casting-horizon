import { Button } from "@/components/ui/button";
import { CastingSection } from "@/components/CastingSection";
import { NavBar } from "@/components/NavBar";

const featuredCastings = [
  {
    id: "1",
    title: "Lead Role in Drama Series",
    role: "Female Lead, 25-35",
    type: "TV Series",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
  },
  {
    id: "2",
    title: "Commercial Voice Over",
    role: "Male Voice Actor, 30-45",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
  },
  {
    id: "3",
    title: "Independent Film",
    role: "Supporting Role, 20-30",
    type: "Film",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
  },
  {
    id: "4",
    title: "Theater Production",
    role: "Ensemble Cast, 18+",
    type: "Theater",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1",
  },
];

const recentCastings = [
  {
    id: "5",
    title: "Music Video Lead",
    role: "Dancer, 18-25",
    type: "Music Video",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
  },
  {
    id: "6",
    title: "Short Film",
    role: "Character Actor, 40-50",
    type: "Film",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1",
  },
  {
    id: "7",
    title: "TV Commercial",
    role: "Family Members, All Ages",
    type: "Commercial",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04",
  },
  {
    id: "8",
    title: "Web Series",
    role: "Teen Lead, 16-19",
    type: "Digital",
    image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0"
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

      {/* Main Content */}
      <main className="container py-12">
        <CastingSection title="Featured Opportunities" castings={featuredCastings} />
        <CastingSection title="Recent Castings" castings={recentCastings} />
      </main>
    </div>
  );
};

export default Index;