import { Button } from "@/components/ui/button";

export function NavBar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className="text-2xl font-bold">
            CastLink
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary">
              Browse
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              Categories
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary">
              About
            </a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden md:inline-flex">
            Sign In
          </Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </nav>
  );
}