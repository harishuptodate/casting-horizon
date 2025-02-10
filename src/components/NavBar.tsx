
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { Plus, ClipboardList, LogIn } from "lucide-react";

export function NavBar() {
  const { user, profile, logout } = useAuth();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('NavBar logout error:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3" />
          </svg>
          ActCast
        </Link>

        <div className="ml-auto flex items-center gap-4">
          {user ? (
            <>
              <Link to="/submit">
                <Button variant="outline" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Submit Casting Call
                </Button>
              </Link>
              {profile?.role === 'admin' && (
                <Link to="/admin">
                  <Button variant="outline" className="gap-2">
                    <ClipboardList className="h-4 w-4" />
                    Requests
                  </Button>
                </Link>
              )}
              <Button variant="destructive" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <AuthModal
              trigger={
                <Button variant="default" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              }
            />
          )}
        </div>
      </div>
    </nav>
  );
}
