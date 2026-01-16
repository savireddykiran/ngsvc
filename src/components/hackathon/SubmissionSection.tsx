import { Check, Link, Github, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const requirements = [
  {
    icon: Link,
    title: "Working Hosted Link",
    description: "Your application must be deployed and accessible online",
  },
  {
    icon: Github,
    title: "GitHub Repository",
    description: "Public repository with clear commit history",
  },
  {
    icon: FileText,
    title: "README Documentation",
    description: "Include all required information in your README",
  },
];

const readmeItems = [
  "Team name",
  "Tech stack used",
  "User stories completed",
  "AI usage explanation",
  "Hosted application link",
];

const SubmissionSection = () => {
  return (
    <section id="submission" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Submission Requirements</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Ensure your submission includes all required components
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {requirements.map((req, index) => (
            <Card
              key={req.title}
              className="glass-card border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <req.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{req.title}</h3>
                <p className="text-sm text-muted-foreground">{req.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* README Requirements */}
        <div className="glass-card rounded-xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-center text-foreground">README Must Include</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {readmeItems.map((item, index) => (
              <div
                key={item}
                className="flex items-center gap-3 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-accent" />
                </div>
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubmissionSection;
