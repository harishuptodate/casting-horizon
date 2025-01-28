import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { CastingCall } from "@/lib/supabase-types";
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
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const Admin = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  const { data: pendingCastings, isLoading: isLoadingPending } = useQuery({
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
    const { error } = await supabase
      .from("casting_calls")
      .update({ status: "approved" })
      .eq("id", id);

    if (error) {
      toast.error("Failed to approve casting call");
      return;
    }

    toast.success("Casting call approved successfully");
  };

  const handleReject = async (id: string) => {
    const { error } = await supabase
      .from("casting_calls")
      .update({ status: "rejected" })
      .eq("id", id);

    if (error) {
      toast.error("Failed to reject casting call");
      return;
    }

    toast.success("Casting call rejected");
  };

  if (!isAdmin) return null;

  return (
    <div className="container py-20">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="space-y-8">
        <div className="rounded-lg border">
          <div className="p-4 bg-muted">
            <h2 className="text-xl font-semibold">Pending Approvals</h2>
          </div>
          
          {isLoadingPending ? (
            <div className="p-8 flex justify-center">
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
                          onClick={() => handleApprove(casting.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(casting.id)}
                        >
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
    </div>
  );
};

export default Admin;