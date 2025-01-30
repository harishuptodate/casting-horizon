import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate]);

  const { data: pendingCastings, isLoading: castingsLoading } = useQuery({
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

  const { data: adminRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["adminRequests"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("admin_request_status", "pending");

      if (error) throw error;
      return data;
    },
  });

  const handleAdminRequest = async (userId: string, status: "approved" | "rejected") => {
    try {
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

  const handleCastingCall = async (id: string, status: "approved" | "rejected") => {
    try {
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

  if (!isAdmin) return null;

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      
      <Tabs defaultValue="castings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="castings">Pending Castings</TabsTrigger>
          <TabsTrigger value="requests">Admin Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="castings">
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
        </TabsContent>

        <TabsContent value="requests">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Admin;