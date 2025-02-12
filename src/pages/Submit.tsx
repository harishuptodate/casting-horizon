
import { SubmitCastingCall } from "@/components/SubmitCastingCall";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Submit = () => {
  const { user, profile } = useAuth();

  // Show loading state while checking auth
  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  // Only redirect once we're sure about the auth state
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container py-12">
      <SubmitCastingCall />
    </div>
  );
};

export default Submit;
