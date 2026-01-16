import { Check, ArrowRight } from "lucide-react";

const rankings = [
  {
    name: "Bronze",
    emoji: "🟤",
    color: "bronze",
    requirement: "Completes User Stories 1 & 2",
    stories: ["User Registration & Authentication", "Partner Connection & Onboarding"],
  },
  {
    name: "Silver",
    emoji: "🥈",
    color: "silver",
    requirement: "Completes User Stories 1 to 3",
    stories: ["Bronze requirements", "Daily Task Generation"],
  },
  {
    name: "Gold",
    emoji: "🥇",
    color: "gold",
    requirement: "Completes User Stories 1 to 4",
    stories: ["Silver requirements", "Feedback & Adaptation"],
  },
  {
    name: "Platinum",
    emoji: "💎",
    color: "platinum",
    requirement: "Completes User Stories 1 to 5",
    stories: ["Gold requirements", "Intent Understanding & Personalization"],
  },
];

const RankingSection = () => {
  return (
    <section className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Ranking System</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your performance will be ranked based on how many user stories you complete.
            Bonus points available for optional advanced features!
          </p>
        </div>

        {/* Progression Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-bronze via-silver via-gold to-platinum rounded-full" />

            {rankings.map((rank, index) => (
              <div
                key={rank.name}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`glass-card rounded-xl p-6 h-full border-2 border-${rank.color}/30 hover:border-${rank.color}/60 transition-all duration-300`}>
                  {/* Badge */}
                  <div className="flex justify-center mb-4">
                    <div className={`w-16 h-16 rounded-full tier-${rank.color} flex items-center justify-center text-3xl relative z-10`}>
                      {rank.emoji}
                    </div>
                  </div>

                  <h3 className={`text-xl font-bold text-center mb-2 text-${rank.color}`}>
                    {rank.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {rank.requirement}
                  </p>

                  <ul className="space-y-2">
                    {rank.stories.map((story, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Check className={`w-4 h-4 text-${rank.color} flex-shrink-0 mt-0.5`} />
                        <span>{story}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arrow */}
                {index < rankings.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-16 z-20">
                    <ArrowRight className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bonus Note */}
          <div className="mt-12 glass-card rounded-xl p-6 text-center max-w-2xl mx-auto border border-accent/30">
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-2xl">✨</span>
              <span className="text-lg font-semibold text-accent">Bonus Points</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Earn additional points by implementing optional advanced features like mood check-ins,
              task history analytics, smart reminders, and relationship timelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankingSection;
