import { Button } from "@/components/ui/button";
import { CastingCard } from "@/components/CastingCard";
import { NavBar } from "@/components/NavBar";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

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

interface CastingCall {
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
}

interface CastingResponse {
  items: CastingCall[];
  nextPage: number;
  hasMore: boolean;
}

const fetchCastings = async ({ pageParam = 0, category = "" }): Promise<CastingResponse> => {
  // Simulated API call with pagination and filtering
  const castings = {
    items: Array.from({ length: 8 }, (_, i) => ({
      id: `${pageParam}-${i + 1}`,
      title: `Casting Call ${pageParam * 8 + i + 1}`,
      role: "Various Roles",
      type: category || categories[Math.floor(Math.random() * categories.length)],
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
      deadline: "7 days",
      location: "Los Angeles",
      roles: Math.floor(Math.random() * 10) + 1,
      description: "Looking for talented actors for an upcoming production...",
      isVerified: Math.random() > 0.5,
    })),
    nextPage: pageParam + 1,
    hasMore: pageParam < 3, // Limit to 4 pages for demo
  };
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return castings;
};

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { ref, inView } = useInView();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["castings", selectedCategory],
    queryFn: ({ pageParam }) => fetchCastings({ pageParam, category: selectedCategory }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const allCastings = data?.pages.flatMap(page => page.items) ?? [];

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
      <section className="sticky top-16 z-10 border-b bg-card/50 py-6 backdrop-blur-sm">
        <div className="container">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <SearchBar />
            <CategoryFilter 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {allCastings.map((casting) => (
            <CastingCard key={casting.id} {...casting} />
          ))}
        </div>
        
        {/* Load More Trigger */}
        <div
          ref={ref}
          className="mt-8 flex justify-center"
        >
          {isFetchingNextPage ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : hasNextPage ? (
            <Button
              variant="outline"
              onClick={() => fetchNextPage()}
              className="opacity-0"
            >
              Load More
            </Button>
          ) : null}
        </div>
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