import { Gift, Award, Users, HelpCircle, DollarSign } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const benefits = [
  {
    icon: Award,
    title: "Certificates",
    description: "Official certificates from NxtGenSec for all participants",
  },
  {
    icon: Gift,
    title: "Premium Resources",
    description: "Access to exclusive learning materials and tools",
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Guidance from industry experts throughout the competition",
  },
];

const faqs = [
  {
    question: "Is this hackathon completely free?",
    answer: "Yes! The Vibe Coding Competition 2K26 is 100% FREE to participate. There are no registration fees, hidden charges, or costs involved. We believe in making tech competitions accessible to everyone.",
  },
  {
    question: "Who can participate?",
    answer: "Students, developers, and anyone interested in vibe coding are welcome! Whether you're a beginner exploring AI-assisted development or an experienced developer, this competition is open to all skill levels. You just need enthusiasm and a willingness to learn.",
  },
  {
    question: "What is Vibe Coding?",
    answer: "Vibe Coding is a modern approach to software development where you collaborate with AI assistants to build applications. It's about maintaining the right 'vibe' - staying in flow, leveraging AI tools effectively, and creating innovative solutions faster than traditional coding methods.",
  },
  {
    question: "Do I need prior vibe coding experience?",
    answer: "No prior vibe coding experience is required! We welcome both beginners and experienced practitioners. This competition is a great opportunity to learn and improve your vibe coding skills.",
  },
  {
    question: "What will participants receive?",
    answer: "All participants will receive: Official certificates from NxtGenSec, access to premium learning resources, expert mentorship and support during the competition, networking opportunities with fellow developers, and valuable experience building real-world applications.",
  },
  {
    question: "Can I participate as a team?",
    answer: "This is an individual competition. Each participant works independently to showcase their personal skills in vibe coding and full-stack development.",
  },
  {
    question: "What tech stack should I use?",
    answer: "You can use React.js or Next.js for frontend, Node.js with Express.js for backend, MongoDB/PostgreSQL/Supabase for database, and the Gemini API for AI integration. Other modern technologies are also acceptable as long as they meet the project requirements.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* FREE Banner */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="glass-card rounded-2xl p-8 text-center border-2 border-accent relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10" />
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <DollarSign className="w-8 h-8 text-accent line-through opacity-50" />
                <span className="text-4xl md:text-5xl font-bold gradient-text">100% FREE</span>
              </div>
              <p className="text-lg text-muted-foreground">
                No registration fees • No hidden charges • Open to everyone
              </p>
            </div>
          </div>
        </div>

        {/* What Participants Get */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            What You'll <span className="gradient-text">Receive</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="glass-card rounded-xl p-6 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8">
            <HelpCircle className="w-8 h-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="gradient-text">FAQ</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left hover:no-underline py-5">
                  <span className="font-semibold text-foreground">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;