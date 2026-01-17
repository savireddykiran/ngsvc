import { Rocket, Code, Trophy } from "lucide-react";

const timelineData = [
  {
    day: "Day 1",
    date: "Jan 20, 2026",
    title: "Kickoff & Foundation",
    description: "Project initialization, team setup, architecture planning, and core development begins",
    icon: Rocket,
    color: "primary",
  },
  {
    day: "Day 2",
    date: "Jan 21, 2026",
    title: "Core Development",
    description: "Build main features, implement AI integration, create feedback loops, and test functionality",
    icon: Code,
    color: "platinum",
  },
  {
    day: "Day 3",
    date: "Jan 22, 2026",
    title: "Polish & Submit",
    description: "Final testing, deployment, documentation, and submission of your project",
    icon: Trophy,
    color: "accent",
  },
];

const TimelineSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">3-Day Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your hackathon experience mapped out day by day
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-platinum to-accent rounded-full transform -translate-y-1/2" />

            <div className="grid grid-cols-3 gap-8">
              {timelineData.map((item, index) => (
                <div
                  key={item.day}
                  className={`relative animate-fade-in-up ${index % 2 === 0 ? "pt-0" : "pt-0"}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Node */}
                  <div className="flex flex-col items-center">
                    <div className={`w-20 h-20 rounded-full bg-${item.color}/20 border-4 border-${item.color} flex items-center justify-center mb-4 relative z-10 bg-background`}>
                      <item.icon className={`w-8 h-8 text-${item.color}`} />
                    </div>

                    <div className="glass-card rounded-xl p-6 text-center">
                      <div className={`text-sm font-semibold text-${item.color} mb-1`}>{item.day}</div>
                      <div className="text-xs text-muted-foreground mb-3">{item.date}</div>
                      <h3 className="text-lg font-bold mb-2 text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-8">
            {timelineData.map((item, index) => (
              <div
                key={item.day}
                className="flex gap-4 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-full bg-${item.color}/20 border-2 border-${item.color} flex items-center justify-center flex-shrink-0`}>
                    <item.icon className={`w-6 h-6 text-${item.color}`} />
                  </div>
                  {index < timelineData.length - 1 && (
                    <div className="w-0.5 flex-1 bg-gradient-to-b from-border to-transparent mt-2" />
                  )}
                </div>

                <div className="glass-card rounded-xl p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-sm font-semibold text-${item.color}`}>{item.day}</span>
                    <span className="text-xs text-muted-foreground">• {item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-1 text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
