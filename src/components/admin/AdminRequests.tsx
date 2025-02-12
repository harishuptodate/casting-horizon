
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

export function AdminRequests() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: adminRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["adminRequests"],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("admin_request_status", "pending");

      if (error) throw error;
      return data;
    },
    // Disable the query if there's no user
    enabled: !!user,
    // Add retry logic
    retry: 3,
    retryDelay: 1000,
  });

  const handleAdminRequest = async (userId: string, status: "approved" | "rejected") => {
    try {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.rpc("handle_admin_request", {
        target_user_id: userId,
        new_status: status,
        admin_user_id: user?.id,
      });

      if (error) throw error;

      toast.success(`Admin request ${status}`);
      queryClient.invalidateQueries({ queryKey: ["adminRequests"] });
    } catch (error) {
      console.error("Error handling admin request:", error);
      toast.error("Failed to handle admin request");
    }
  };

  return (
    <div className="rounded-lg border">
      <div className="bg-muted p-4">
        <h2 className="text-xl font-semibold">Admin Access Requests</h2>
      </div>
      
      {requestsLoading ? (
        <div className="flex justify-center p-8">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Requested Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminRequests?.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">
                  {request.full_name || request.email}
                </TableCell>
                <TableCell>{request.admin_request_reason}</TableCell>
                <TableCell>
                  {new Date(request.admin_request_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="gap-2"
                      onClick={() => handleAdminRequest(request.id, "approved")}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-2"
                      onClick={() => handleAdminRequest(request.id, "rejected")}
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {!adminRequests?.length && (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No pending admin requests
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
