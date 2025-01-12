import { Button } from "@/components/ui/button";
import { CastingSection } from "@/components/CastingSection";
import { NavBar } from "@/components/NavBar";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const categories = [
  "Film",
  "TV",
  "Theater",
  "Commercial",
  "Voice Over",
  "Music Video",
  "Web Series",
  "Student Film",
];

const fetchCastings = async () => {
  // Simulated API call
  return {
    featured: [
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
    ],
    recent: [
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
    ],
  };
};

const Index = () => {
  const { data: castings, isLoading } = useQuery({
    queryKey: ["castings"],
    queryFn: fetchCastings,
  });

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
            <div className="flex gap-4">
              <Button size="lg" className="text-lg">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="border-b bg-card/50 py-6">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchBar />
            <CategoryFilter categories={categories} />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-12">
        <CastingSection title="Featured Opportunities" castings={castings?.featured || []} />
        <CastingSection title="Recent Castings" castings={castings?.recent || []} />
      </main>

      {/* Footer */}
      <footer className="border-t bg-card/50 py-12">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-lg font-semibold">About CastLink</h3>
              <p className="text-sm text-muted-foreground">
                Connecting talent with opportunities in the entertainment industry.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">Browse Castings</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">Submit Casting</a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">Success Stories</a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Categories</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {categories.slice(0, 4).map((category) => (
                  <li key={category}>
                    <a href="#" className="hover:text-primary">{category}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: contact@castlink.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Location: Los Angeles, CA</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;