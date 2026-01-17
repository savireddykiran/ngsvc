import { Calendar, Globe, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountdownTimer from "./CountdownTimer";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden animated-bg pt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-platinum/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-muted-foreground">NxtGenSec Presents</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <span className="gradient-text">Vibe Coding</span>
            <br />
            <span className="text-foreground">Competition – 2K26</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Build an <span className="text-primary font-semibold">Adaptive Relationship Engagement Platform</span>
          </p>

          {/* Info Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="glass-card px-5 py-3 rounded-full flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">3 Days</span>
            </div>
            <div className="glass-card px-5 py-3 rounded-full flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Online</span>
            </div>
            <div className="glass-card px-5 py-3 rounded-full flex items-center gap-2">
              <User className="w-5 h-5 text-platinum" />
              <span className="text-sm font-medium">Individual</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mb-12 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <p className="text-muted-foreground mb-4 text-sm uppercase tracking-wider">Starts In</p>
            <CountdownTimer />
            <p className="text-muted-foreground mt-4 text-sm">
              20th Jan 2026 – 22nd Jan 2026
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary text-lg px-8 py-6"
              onClick={() => window.open("#register", "_self")}
            >
              Register Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 text-lg px-8 py-6"
              onClick={() => document.querySelector("#overview")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
