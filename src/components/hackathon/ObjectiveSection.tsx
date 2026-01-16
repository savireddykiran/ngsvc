import { Code, Brain, GitBranch, Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Code,
    title: "Full-Stack SaaS",
    description: "Build and deploy a complete application with frontend, backend, and database",
  },
  {
    icon: Brain,
    title: "AI-Powered",
    description: "Leverage Gemini API for intelligent intent understanding and task generation",
  },
  {
    icon: GitBranch,
    title: "Adaptive System",
    description: "Create feedback loops that dynamically evolve based on user behavior",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    description: "Deploy to production and push to GitHub with meaningful commits",
  },
];

const ObjectiveSection = () => {
  return (
    <section id="overview" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Objective</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Build and deploy a full-stack SaaS application that helps couples stay emotionally 
            engaged through adaptive daily activities, powered by intelligent intent understanding 
            and continuous feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="glass-card border-border/50 hover:border-primary/50 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ObjectiveSection;
