import { AlertTriangle, Check, Shield, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const warnings = [
  {
    icon: X,
    text: "Static or hardcoded task lists are NOT acceptable",
    type: "error",
  },
  {
    icon: AlertTriangle,
    text: "Feedback must influence future outputs",
    type: "warning",
  },
  {
    icon: Shield,
    text: "AI responses must be controlled and validated",
    type: "warning",
  },
  {
    icon: Check,
    text: "Privacy and respectful UX are critical",
    type: "success",
  },
];

const ImportantNotesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Important Notes</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Key guidelines to keep in mind during development
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {warnings.map((warning, index) => (
            <Card
              key={index}
              className={`glass-card animate-fade-in-up ${
                warning.type === "error"
                  ? "border-destructive/50"
                  : warning.type === "warning"
                  ? "border-gold/50"
                  : "border-accent/50"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    warning.type === "error"
                      ? "bg-destructive/20"
                      : warning.type === "warning"
                      ? "bg-gold/20"
                      : "bg-accent/20"
                  }`}
                >
                  <warning.icon
                    className={`w-5 h-5 ${
                      warning.type === "error"
                        ? "text-destructive"
                        : warning.type === "warning"
                        ? "text-gold"
                        : "text-accent"
                    }`}
                  />
                </div>
                <p className="text-foreground font-medium">{warning.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 glass-card rounded-xl p-6 max-w-3xl mx-auto text-center border border-primary/30">
          <p className="text-muted-foreground">
            <span className="text-primary font-semibold">Pro Tip:</span> Participants are encouraged 
            to incorporate additional features as deemed necessary through independent research and product reasoning.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImportantNotesSection;
