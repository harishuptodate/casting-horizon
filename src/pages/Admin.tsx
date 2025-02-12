
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Loader2 } from "lucide-react";

const Admin = () => {
  const { user, profile, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only redirect if we're sure the user is not an admin
    // This prevents flashing and unnecessary redirects during auth state loading
    if (user && profile && !isAdmin) {
      navigate("/");
    }
  }, [user, profile, isAdmin, navigate]);

  // Show loading state while we're checking auth
  if (!user || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // Only show dashboard if user is admin
  if (!isAdmin) return null;

  return <AdminDashboard />;
};

export default Admin;
