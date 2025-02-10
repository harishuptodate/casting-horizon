import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const castingTypes = [
  "Film",
  "TV",
  "Theater",
  "Commercial",
  "Voice Over",
  "Music Video",
  "Web Series",
  "Student Film",
];

interface CastingCallForm {
  title: string;
  role: string;
  type: string;
  description: string;
  image: string;
  deadline: string;
  location: string;
  roles: number;
  min_age?: number;
  max_age?: number;
  gender: "male" | "female" | "any";
}

interface SubmitCastingCallProps {
  hideAdminRequest?: boolean;
  onSuccess?: () => void;
}

export function SubmitCastingCall({ hideAdminRequest = false, onSuccess }: SubmitCastingCallProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestAdmin, setRequestAdmin] = useState(false);
  const [adminRequestReason, setAdminRequestReason] = useState("");

  const form = useForm<CastingCallForm>({
    defaultValues: {
      title: "",
      role: "",
      type: "Film",
      description: "",
      image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0",
      deadline: "",
      location: "",
      roles: 1,
      gender: "any",
    },
  });

  const onSubmit = async (data: CastingCallForm) => {
    if (!user) {
      toast.error("You must be logged in to submit a casting call");
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit casting call
      const { error: castingError } = await supabase.from("casting_calls").insert({
        ...data,
        created_by: user.id,
      });

      if (castingError) throw castingError;

      // Submit admin request if checked
      if (requestAdmin) {
        const { error: adminRequestError } = await supabase.rpc(
          "request_admin_role",
          {
            user_id: user.id,
            reason: adminRequestReason,
          }
        );

        if (adminRequestError) throw adminRequestError;
        toast.success("Admin request submitted successfully!");
      }

      toast.success("Casting call submitted successfully!");
      form.reset();
      setRequestAdmin(false);
      setAdminRequestReason("");
      onSuccess?.();
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter casting call title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="Enter role description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select casting type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {castingTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter detailed description"
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="min_age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Min age"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value ? parseInt(e.target.value) : undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="max_age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Max age"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.value ? parseInt(e.target.value) : undefined)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deadline</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Roles</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender requirement" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="any">Any</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {!hideAdminRequest && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="requestAdmin"
                  checked={requestAdmin}
                  onCheckedChange={(checked) => setRequestAdmin(checked as boolean)}
                />
                <label
                  htmlFor="requestAdmin"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Request Admin Rights
                </label>
              </div>
              {requestAdmin && (
                <Textarea
                  placeholder="Please explain why you're requesting admin rights..."
                  value={adminRequestReason}
                  onChange={(e) => setAdminRequestReason(e.target.value)}
                  className="h-32"
                  required
                />
              )}
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Casting Call"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
