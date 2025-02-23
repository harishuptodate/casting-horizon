
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function PendingCastingCalls() {
  const { user, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const { data: pendingCastings, isLoading: castingsLoading } = useQuery({
    queryKey: ["pendingCastings"],
    queryFn: async () => {
      console.log("Starting to fetch pending castings");
      console.log("Current user:", user?.id);
      console.log("Is admin:", isAdmin);

      if (!user?.id || !isAdmin) {
        console.log("User not authorized to view pending castings");
        return [];
      }

      const { count, error: countError } = await supabase
        .from("casting_calls")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      console.log("Total pending castings count:", count);

      if (countError) {
        console.error("Error counting pending castings:", countError);
        throw countError;
      }

      const { data, error } = await supabase
        .from("casting_calls")
        .select(`
          *,
          profiles:created_by (
            full_name,
            email
          )
        `)
        .eq("status", "pending");

      if (error) {
        console.error("Error fetching pending castings:", error);
        throw error;
      }

      console.log("Raw pending castings data:", data);
      return data || [];
    },
    enabled: !!user?.id && isAdmin,
  });

  const handleCastingCall = async (id: string, status: "approved" | "rejected") => {
    try {
      console.log("Handling casting call:", id, status);
      console.log("Admin user:", user?.id);

      const { error } = await supabase.rpc("handle_casting_call", {
        casting_id: id,
        new_status: status,
        admin_user_id: user?.id,
      });

      if (error) throw error;

      toast.success(`Casting call ${status}`);
      queryClient.invalidateQueries({ queryKey: ["pendingCastings"] });
    } catch (error) {
      console.error("Error handling casting call:", error);
      toast.error("Failed to handle casting call");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('casting_calls')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success("Casting call deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["pendingCastings"] });
    } catch (error) {
      console.error("Error deleting casting call:", error);
      toast.error("Failed to delete casting call");
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="rounded-lg border">
      <div className="bg-muted p-4">
        <h2 className="text-xl font-semibold">Pending Casting Calls</h2>
      </div>
      
      {castingsLoading ? (
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
                      onClick={() => handleCastingCall(casting.id, "approved")}
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-2"
                      onClick={() => handleCastingCall(casting.id, "rejected")}
                    >
                      <XCircle className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-2"
                      onClick={() => handleDelete(casting.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
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
  );
}
