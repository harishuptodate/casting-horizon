import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  const { data: pendingCastings, isLoading } = useQuery({
    queryKey: ["pendingCastings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("casting_calls")
        .select("*, profiles(full_name, email)")
        .eq("status", "pending");

      if (error) throw error;
      return data;
    },
  });

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("casting_calls")
        .update({ status: "approved" })
        .eq("id", id);

      if (error) throw error;

      toast.success("Casting call approved");
      queryClient.invalidateQueries({ queryKey: ["pendingCastings"] });
    } catch (error) {
      console.error("Error approving casting call:", error);
      toast.error("Failed to approve casting call");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("casting_calls")
        .update({ status: "rejected" })
        .eq("id", id);

      if (error) throw error;

      toast.success("Casting call rejected");
      queryClient.invalidateQueries({ queryKey: ["pendingCastings"] });
    } catch (error) {
      console.error("Error rejecting casting call:", error);
      toast.error("Failed to reject casting call");
    }
  };

  if (!isAdmin) return null;

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="rounded-lg border">
        <div className="bg-muted p-4">
          <h2 className="text-xl font-semibold">Pending Approvals</h2>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Submitted By</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingCastings?.map((casting) => (
                <TableRow key={casting.id}>
                  <TableCell className="font-medium">
                    {casting.title}
                  </TableCell>
                  <TableCell>
                    {casting.profiles?.full_name || casting.profiles?.email}
                  </TableCell>
                  <TableCell>{casting.type}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {casting.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="gap-2"
                        onClick={() => handleApprove(casting.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="gap-2"
                        onClick={() => handleReject(casting.id)}
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {!pendingCastings?.length && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    No pending casting calls
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Admin;