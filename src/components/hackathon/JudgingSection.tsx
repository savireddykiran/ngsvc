import { Zap, Brain, Palette, Code, Cloud } from "lucide-react";

const criteria = [
  {
    icon: Zap,
    title: "Functionality",
    description: "Core features working end-to-end",
    weight: "High Impact",
  },
  {
    icon: Brain,
    title: "Adaptivity & Intelligence",
    description: "How well the system evolves with user input",
    weight: "High Impact",
  },
  {
    icon: Palette,
    title: "Design & User Experience",
    description: "Comfort, clarity, and emotional sensitivity",
    weight: "Medium Impact",
  },
  {
    icon: Code,
    title: "Code Quality",
    description: "Readability, structure, and maintainability",
    weight: "Medium Impact",
  },
  {
    icon: Cloud,
    title: "Deployment & Stability",
    description: "Hosted, usable, and testable system",
    weight: "Essential",
  },
];

const JudgingSection = () => {
  return (
    <section className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Judging Criteria</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your project will be evaluated across these key dimensions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
          {criteria.map((item, index) => (
            <div
              key={item.title}
              className="glass-card rounded-xl p-6 text-center hover:border-primary/50 border border-border/50 transition-all duration-300 animate-fade-in-up group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
              <span className="inline-block px-3 py-1 bg-secondary rounded-full text-xs font-medium text-primary">
                {item.weight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JudgingSection;
