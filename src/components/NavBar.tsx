import { Button } from "@/components/ui/button";
import { AuthModal } from "./AuthModal";
import { useAuth } from "@/contexts/AuthContext";

export function NavBar() {
  const { user, logout } = useAuth();

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
          {user ? (
            <>
              <Button variant="ghost" className="hidden md:inline-flex">
                Profile
              </Button>
              <Button onClick={logout}>Sign Out</Button>
            </>
          ) : (
            <>
              <AuthModal
                mode="signin"
                trigger={
                  <Button variant="ghost" className="hidden md:inline-flex">
                    Sign In
                  </Button>
                }
              />
              <AuthModal
                mode="signup"
                trigger={<Button>Sign Up</Button>}
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}