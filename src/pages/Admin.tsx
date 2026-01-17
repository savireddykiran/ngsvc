import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, LogOut, Download, Trash2, Eye, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface Registration {
  id: string;
  created_at: string;
  name: string;
  personal_email: string;
  college_email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  other_social: string | null;
  tried_vibe_coding: boolean;
  vibe_coding_projects: string | null;
  realtime_impact: string | null;
  vibe_coding_process: string | null;
  anything_to_say: string | null;
}

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    if (token) {
      setIsAuthenticated(true);
      fetchRegistrations(token);
    }
  }, []);

  const fetchRegistrations = async (token: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("admin-registrations", {
        body: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle the response properly based on the query param
      const response = await supabase.functions.invoke("admin-registrations?action=list", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.error) throw response.error;
      setRegistrations(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast({
        title: "Error",
        description: "Failed to fetch registrations",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { data: response, error } = await supabase.functions.invoke(
        "admin-registrations?action=login",
        {
          method: "POST",
          body: { email: data.email, password: data.password },
        }
      );

      if (error) throw error;
      if (!response.success) {
        toast({
          title: "Login Failed",
          description: response.error || "Invalid credentials",
          variant: "destructive",
        });
        return;
      }

      sessionStorage.setItem("admin_token", response.token);
      setIsAuthenticated(true);
      fetchRegistrations(response.token);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setRegistrations([]);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const token = sessionStorage.getItem("admin_token");
    if (!token) return;

    try {
      const { error } = await supabase.functions.invoke(
        "admin-registrations?action=delete",
        {
          method: "DELETE",
          body: { id: deleteId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (error) throw error;

      setRegistrations(registrations.filter((r) => r.id !== deleteId));
      toast({
        title: "Deleted",
        description: "Registration deleted successfully",
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete registration",
        variant: "destructive",
      });
    } finally {
      setDeleteId(null);
    }
  };

  const exportToCSV = () => {
    if (registrations.length === 0) return;

    const headers = [
      "Name",
      "Personal Email",
      "College Email",
      "GitHub",
      "LinkedIn",
      "Instagram",
      "Other Social",
      "Tried Vibe Coding",
      "Vibe Coding Projects",
      "Realtime Impact",
      "Vibe Coding Process",
      "Anything to Say",
      "Registered At",
    ];

    const csvContent = [
      headers.join(","),
      ...registrations.map((r) =>
        [
          `"${r.name}"`,
          `"${r.personal_email}"`,
          `"${r.college_email || ""}"`,
          `"${r.github_url || ""}"`,
          `"${r.linkedin_url || ""}"`,
          `"${r.instagram_url || ""}"`,
          `"${r.other_social || ""}"`,
          r.tried_vibe_coding ? "Yes" : "No",
          `"${(r.vibe_coding_projects || "").replace(/"/g, '""')}"`,
          `"${(r.realtime_impact || "").replace(/"/g, '""')}"`,
          `"${(r.vibe_coding_process || "").replace(/"/g, '""')}"`,
          `"${(r.anything_to_say || "").replace(/"/g, '""')}"`,
          new Date(r.created_at).toLocaleString(),
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `vibe-coding-registrations-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="glass-card rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold gradient-text">Admin Login</h1>
              <p className="text-muted-foreground mt-2">
                Access the registration dashboard
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onLogin)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="admin@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">
              Registration Dashboard
            </h1>
            <p className="text-muted-foreground">
              {registrations.length} total registrations
            </p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate("/")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Home
            </Button>
            <Button onClick={exportToCSV} variant="outline" disabled={registrations.length === 0}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : registrations.length === 0 ? (
          <div className="glass-card rounded-xl p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Registrations Yet</h3>
            <p className="text-muted-foreground">
              Registrations will appear here once participants sign up.
            </p>
          </div>
        ) : (
          <div className="glass-card rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>GitHub</TableHead>
                    <TableHead>Vibe Coding Exp</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrations.map((reg) => (
                    <TableRow key={reg.id}>
                      <TableCell className="font-medium">{reg.name}</TableCell>
                      <TableCell>{reg.personal_email}</TableCell>
                      <TableCell>
                        {reg.github_url ? (
                          <a
                            href={reg.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View
                          </a>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            reg.tried_vibe_coding
                              ? "bg-accent/20 text-accent"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {reg.tried_vibe_coding ? "Yes" : "No"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(reg.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedRegistration(reg)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-destructive hover:text-destructive"
                            onClick={() => setDeleteId(reg.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {/* View Dialog */}
      <Dialog
        open={!!selectedRegistration}
        onOpenChange={() => setSelectedRegistration(null)}
      >
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registration Details</DialogTitle>
          </DialogHeader>
          {selectedRegistration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <p className="font-medium">{selectedRegistration.name}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Personal Email</label>
                  <p className="font-medium">{selectedRegistration.personal_email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">College Email</label>
                  <p className="font-medium">{selectedRegistration.college_email || "-"}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Registered At</label>
                  <p className="font-medium">
                    {new Date(selectedRegistration.created_at).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Social Media</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground">GitHub</label>
                    <p className="font-medium">
                      {selectedRegistration.github_url ? (
                        <a
                          href={selectedRegistration.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedRegistration.github_url}
                        </a>
                      ) : (
                        "-"
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">LinkedIn</label>
                    <p className="font-medium">
                      {selectedRegistration.linkedin_url ? (
                        <a
                          href={selectedRegistration.linkedin_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedRegistration.linkedin_url}
                        </a>
                      ) : (
                        "-"
                      )}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Instagram</label>
                    <p className="font-medium">{selectedRegistration.instagram_url || "-"}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Other</label>
                    <p className="font-medium">{selectedRegistration.other_social || "-"}</p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Screening Answers</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Tried Vibe Coding Before?
                    </label>
                    <p className="font-medium">
                      {selectedRegistration.tried_vibe_coding ? "Yes" : "No"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Projects Built with Vibe Coding
                    </label>
                    <p className="font-medium whitespace-pre-wrap">
                      {selectedRegistration.vibe_coding_projects || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Real-time Impact</label>
                    <p className="font-medium whitespace-pre-wrap">
                      {selectedRegistration.realtime_impact || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">
                      Vibe Coding Process
                    </label>
                    <p className="font-medium whitespace-pre-wrap">
                      {selectedRegistration.vibe_coding_process || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Additional Notes</label>
                    <p className="font-medium whitespace-pre-wrap">
                      {selectedRegistration.anything_to_say || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Registration?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              registration from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;