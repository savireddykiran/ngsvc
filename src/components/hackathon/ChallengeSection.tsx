import { MessageSquare, Sparkles, LineChart, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const deliverables = [
  {
    icon: MessageSquare,
    title: "Partner Understanding",
    description: "Understand both partners through structured onboarding questions",
  },
  {
    icon: Sparkles,
    title: "Task Generation",
    description: "Generate personalized daily couple tasks based on preferences",
  },
  {
    icon: LineChart,
    title: "Feedback Collection",
    description: "Collect meaningful feedback from both individuals",
  },
  {
    icon: RefreshCw,
    title: "Dynamic Adaptation",
    description: "Adapt future tasks based on behavior and responses",
  },
];

const ChallengeSection = () => {
  return (
    <section id="challenge" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Challenge Overview</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Design and implement a relationship engagement platform that evolves with its users.
            Your project will be judged on functionality, adaptivity, UX, and code quality.
          </p>
        </div>

        {/* Deliverables */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {deliverables.map((item, index) => (
            <Card
              key={item.title}
              className="glass-card border-border/50 hover:border-accent/50 transition-all duration-300 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Ranking Preview */}
        <div className="glass-card rounded-2xl p-8 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-6 text-center">Performance Rankings</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="tier-bronze px-6 py-3 rounded-full font-semibold flex items-center gap-2">
              <span>🟤</span> Bronze
            </div>
            <div className="tier-silver px-6 py-3 rounded-full font-semibold flex items-center gap-2">
              <span>🥈</span> Silver
            </div>
            <div className="tier-gold px-6 py-3 rounded-full font-semibold flex items-center gap-2">
              <span>🥇</span> Gold
            </div>
            <div className="tier-platinum px-6 py-3 rounded-full font-semibold flex items-center gap-2">
              <span>💎</span> Platinum
            </div>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-4">
            Ranked based on how many user stories are completed
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChallengeSection;
