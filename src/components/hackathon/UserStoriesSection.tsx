import { useState } from "react";
import { ChevronDown, ChevronUp, Shield, Users, Calendar, MessageCircle, Brain, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface UserStory {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  points: string[];
}

interface Tier {
  name: string;
  emoji: string;
  color: string;
  bgColor: string;
  borderColor: string;
  stories: UserStory[];
}

const tiers: Tier[] = [
  {
    name: "Bronze",
    emoji: "🟤",
    color: "text-bronze",
    bgColor: "bg-bronze/10",
    borderColor: "border-bronze/50",
    stories: [
      {
        id: 1,
        title: "User Registration & Authentication",
        icon: Shield,
        points: [
          "Register using name, email, and password to create an account",
          "Log in securely to access personal dashboard",
          "Store user credentials securely in a database",
        ],
      },
      {
        id: 2,
        title: "Partner Connection & Onboarding",
        icon: Users,
        points: [
          "Invite or connect with partner using a unique code or link",
          "Answer onboarding questions for preference and communication style",
          "Store onboarding responses separately for each partner",
        ],
      },
    ],
  },
  {
    name: "Silver",
    emoji: "🥈",
    color: "text-silver",
    bgColor: "bg-silver/10",
    borderColor: "border-silver/50",
    stories: [
      {
        id: 3,
        title: "Daily Task Generation",
        icon: Calendar,
        points: [
          "Receive one daily activity or task for intentional engagement",
          "Generate tasks based on onboarding data and recent interactions",
          "View today's task clearly in a shared dashboard",
        ],
      },
    ],
  },
  {
    name: "Gold",
    emoji: "🥇",
    color: "text-gold",
    bgColor: "bg-gold/10",
    borderColor: "border-gold/50",
    stories: [
      {
        id: 4,
        title: "Feedback & Adaptation",
        icon: MessageCircle,
        points: [
          "Provide feedback on how you felt about a completed task",
          "Analyze feedback from both partners",
          "Adapt future tasks based on past feedback, engagement level, and sentiment",
        ],
      },
    ],
  },
  {
    name: "Platinum",
    emoji: "💎",
    color: "text-platinum",
    bgColor: "bg-platinum/10",
    borderColor: "border-platinum/50",
    stories: [
      {
        id: 5,
        title: "Intent Understanding & Intelligent Personalization",
        icon: Brain,
        points: [
          "Infer emotional intent from user responses and check-ins",
          "Avoid repetitive or irrelevant tasks over time",
          "Deliver tasks that feel personalized, timely, and emotionally appropriate",
        ],
      },
      {
        id: 6,
        title: "Optional Advanced Features (Bonus)",
        icon: Sparkles,
        points: [
          "Individual mood check-ins with privacy controls",
          "Task history and engagement analytics",
          "Smart reminders or notifications",
          "Adjustable comfort levels and task intensity",
          "Relationship timeline or progress view",
        ],
      },
    ],
  },
];

const UserStoriesSection = () => {
  const [openTiers, setOpenTiers] = useState<string[]>(["Bronze"]);

  const toggleTier = (tierName: string) => {
    setOpenTiers((prev) =>
      prev.includes(tierName) ? prev.filter((t) => t !== tierName) : [...prev, tierName]
    );
  };

  return (
    <section id="user-stories" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">User Stories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Each user story increases in complexity, starting with core functionality 
            and progressing toward adaptive intelligence.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {tiers.map((tier, tierIndex) => (
            <Collapsible
              key={tier.name}
              open={openTiers.includes(tier.name)}
              onOpenChange={() => toggleTier(tier.name)}
            >
              <Card
                className={`glass-card ${tier.borderColor} border-2 overflow-hidden animate-fade-in-up`}
                style={{ animationDelay: `${tierIndex * 0.15}s` }}
              >
                <CollapsibleTrigger className="w-full">
                  <CardHeader className={`${tier.bgColor} cursor-pointer transition-colors hover:opacity-90`}>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <span className="text-2xl">{tier.emoji}</span>
                        <span className={tier.color}>{tier.name} Level</span>
                        <span className="text-muted-foreground text-sm font-normal">
                          ({tier.stories.length} {tier.stories.length === 1 ? "story" : "stories"})
                        </span>
                      </CardTitle>
                      {openTiers.includes(tier.name) ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <CardContent className="pt-6 space-y-6">
                    {tier.stories.map((story) => (
                      <div key={story.id} className="border-l-2 border-border pl-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-lg ${tier.bgColor} flex items-center justify-center`}>
                            <story.icon className={`w-5 h-5 ${tier.color}`} />
                          </div>
                          <h4 className="font-semibold text-foreground">
                            User Story {story.id} – {story.title}
                          </h4>
                        </div>
                        <ul className="space-y-2 ml-13">
                          {story.points.map((point, index) => (
                            <li key={index} className="text-muted-foreground text-sm flex items-start gap-2">
                              <span className={`w-1.5 h-1.5 rounded-full ${tier.bgColor} mt-2 flex-shrink-0`} 
                                    style={{ backgroundColor: `hsl(var(--${tier.name.toLowerCase()}))` }} />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserStoriesSection;
