import { SubmitCastingCall } from "@/components/SubmitCastingCall";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Submit = () => {
  const { user } = useAuth();

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