import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle, User, Mail, Github, Linkedin, Instagram, Link, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
  personal_email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  college_email: z.string().trim().email("Please enter a valid college email").max(255, "Email must be less than 255 characters").optional().or(z.literal("")),
  github_url: z.string().trim().url("Please enter a valid URL").optional().or(z.literal("")),
  linkedin_url: z.string().trim().url("Please enter a valid URL").optional().or(z.literal("")),
  instagram_url: z.string().trim().optional(),
  other_social: z.string().trim().optional(),
  tried_vibe_coding: z.enum(["true", "false"], { required_error: "Please select an option" }),
  vibe_coding_projects: z.string().trim().max(1000, "Must be less than 1000 characters").optional(),
  realtime_impact: z.string().trim().max(1000, "Must be less than 1000 characters").optional(),
  vibe_coding_process: z.string().trim().max(1000, "Must be less than 1000 characters").optional(),
  anything_to_say: z.string().trim().max(1000, "Must be less than 1000 characters").optional(),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegistrationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      personal_email: "",
      college_email: "",
      github_url: "",
      linkedin_url: "",
      instagram_url: "",
      other_social: "",
      tried_vibe_coding: undefined,
      vibe_coding_projects: "",
      realtime_impact: "",
      vibe_coding_process: "",
      anything_to_say: "",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("registrations").insert({
        name: data.name,
        personal_email: data.personal_email,
        college_email: data.college_email || null,
        github_url: data.github_url || null,
        linkedin_url: data.linkedin_url || null,
        instagram_url: data.instagram_url || null,
        other_social: data.other_social || null,
        tried_vibe_coding: data.tried_vibe_coding === "true",
        vibe_coding_projects: data.vibe_coding_projects || null,
        realtime_impact: data.realtime_impact || null,
        vibe_coding_process: data.vibe_coding_process || null,
        anything_to_say: data.anything_to_say || null,
      });

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already Registered",
            description: "This email is already registered for the competition.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      setIsSuccess(true);
      toast({
        title: "Registration Successful! 🎉",
        description: "You're now registered for Vibe Coding Competition 2K26!",
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass-card rounded-2xl p-8 md:p-12 text-center animate-scale-in">
        <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-accent" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-4 gradient-text">
          Registration Complete!
        </h3>
        <p className="text-muted-foreground mb-6">
          Thank you for registering for Vibe Coding Competition 2K26. We'll send you updates to your email.
        </p>
        <p className="text-sm text-muted-foreground">
          Competition starts: <span className="text-primary font-semibold">January 20-22, 2026</span>
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 md:p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="personal_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="college_email"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>College/University Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@university.edu" {...field} />
                    </FormControl>
                    <FormDescription>Optional - for student verification</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Link className="w-5 h-5 text-primary" />
              Social Media Profiles
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="github_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Github className="w-4 h-4" /> GitHub
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4" /> LinkedIn
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/in/username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="instagram_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Instagram className="w-4 h-4" /> Instagram
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="@username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="other_social"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Social Media</FormLabel>
                    <FormControl>
                      <Input placeholder="Twitter, Portfolio, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Screening Questions */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Screening Questions
            </h3>
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="tried_vibe_coding"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Have you tried Vibe Coding before? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="true" id="yes" />
                          <Label htmlFor="yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="false" id="no" />
                          <Label htmlFor="no">No</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vibe_coding_projects"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What projects have you built with Vibe Coding?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe any projects you've built using AI-assisted development..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="realtime_impact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Have any of your solutions made a real-time impact?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe any real-world impact your projects have had..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vibe_coding_process"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe your process for Vibe Coding</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How do you approach AI-assisted development? What tools do you use?"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="anything_to_say"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Anything else you'd like to share with us?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any questions, comments, or things you'd like us to know..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 glow-primary text-lg py-6"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              "Register for Competition"
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By registering, you agree to participate in the Vibe Coding Competition 2K26.
            Your information will be kept secure and only used for competition purposes.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;