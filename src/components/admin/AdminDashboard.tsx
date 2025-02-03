import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FilePlus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SubmitCastingCall } from "@/components/SubmitCastingCall";
import { PendingCastingCalls } from "./PendingCastingCalls";
import { AdminRequests } from "./AdminRequests";

export function AdminDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="container py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <FilePlus className="h-4 w-4" />
              Submit Casting Call
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Submit a New Casting Call</DialogTitle>
            </DialogHeader>
            <SubmitCastingCall hideAdminRequest onSuccess={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="castings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="castings">Pending Castings</TabsTrigger>
          <TabsTrigger value="requests">Admin Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="castings">
          <PendingCastingCalls />
        </TabsContent>

        <TabsContent value="requests">
          <AdminRequests />
        </TabsContent>
      </Tabs>
    </div>
  );
}