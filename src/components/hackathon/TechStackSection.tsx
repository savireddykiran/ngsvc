import { Card, CardContent } from "@/components/ui/card";

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js"],
    description: "Modern JavaScript framework",
    gradient: "from-primary to-primary/50",
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js"],
    description: "Server-side runtime & framework",
    gradient: "from-accent to-accent/50",
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL", "Supabase"],
    description: "Data persistence layer",
    gradient: "from-platinum to-platinum/50",
  },
  {
    category: "AI Layer",
    items: ["Gemini API"],
    description: "Intent understanding & task generation",
    gradient: "from-gold to-gold/50",
  },
  {
    category: "Authentication",
    items: ["Email/Password", "OAuth"],
    description: "Secure user authentication",
    gradient: "from-silver to-silver/50",
  },
  {
    category: "Deployment",
    items: ["Vercel", "Netlify", "Render", "Railway"],
    description: "Production hosting",
    gradient: "from-bronze to-bronze/50",
  },
];

const TechStackSection = () => {
  return (
    <section id="requirements" className="py-24 relative bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Technical Requirements</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Build with modern technologies and deploy to production
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {techStack.map((tech, index) => (
            <Card
              key={tech.category}
              className="glass-card border-border/50 hover:border-primary/50 transition-all duration-300 group overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 relative">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tech.gradient}`} />
                
                <h3 className="text-lg font-semibold mb-2 text-foreground">{tech.category}</h3>
                <p className="text-xs text-muted-foreground mb-4">{tech.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-secondary rounded-full text-sm font-medium text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Requirements */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-center text-foreground">Version Control</h3>
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">Push to GitHub</p>
                <p className="text-xs text-muted-foreground">with meaningful commits</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
