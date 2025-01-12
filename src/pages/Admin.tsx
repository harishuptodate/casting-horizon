import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Pending Approvals</h2>
          {/* TODO: Add pending approvals list */}
        </div>
        <div className="p-6 bg-card rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Admin Requests</h2>
          {/* TODO: Add admin requests list */}
        </div>
      </div>
    </div>
  );
};

export default Admin;