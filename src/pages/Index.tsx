
import { Button } from "@/components/ui/button";
import { CastingCard } from "@/components/CastingCard";
import { NavBar } from "@/components/NavBar";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { AgeRangeFilter } from "@/components/AgeRangeFilter";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, AlertCircle, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchCastingCalls } from "@/lib/supabase";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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

const Index = () => {
  const { ref, inView } = useInView();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minAge, setMinAge] = useState<number | undefined>();
  const [maxAge, setMaxAge] = useState<number | undefined>();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["castings", selectedCategory, minAge, maxAge, searchQuery],
    queryFn: ({ pageParam = 0 }) => 
      fetchCastingCalls({ 
        pageParam, 
        category: selectedCategory,
        minAge,
        maxAge,
        searchQuery,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.hasMore ? lastPage.nextPage : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAgeChange = (newMinAge: number | undefined, newMaxAge: number | undefined) => {
    setMinAge(newMinAge);
    setMaxAge(newMaxAge);
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-lg">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error?.message || "Failed to load casting calls. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const allCastings = data?.pages.flatMap(page => page?.items || []) ?? [];

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
            <SearchBar onSearch={handleSearch} />
            <div className="flex gap-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Categories
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48 p-0">
                  <CategoryFilter 
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                  />
                </PopoverContent>
              </Popover>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Age Range
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <AgeRangeFilter onAgeChange={handleAgeChange} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container py-12">
        {selectedCategory && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Showing results for: {selectedCategory}
            </h2>
          </div>
        )}
        {allCastings.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allCastings.map((casting) => (
              <CastingCard key={casting.id} {...casting} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-lg text-muted-foreground">
              {selectedCategory 
                ? `No casting calls available for ${selectedCategory}`
                : "No casting calls available."}
            </p>
          </div>
        )}
        
        <div ref={ref} className="mt-8 flex justify-center">
          {isFetchingNextPage && (
            <Loader2 className="h-6 w-6 animate-spin" />
          )}
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
                <li><a href="#" className="hover:text-primary">Browse Castings</a></li>
                <li><a href="#" className="hover:text-primary">Submit Casting</a></li>
                <li><a href="#" className="hover:text-primary">Success Stories</a></li>
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
