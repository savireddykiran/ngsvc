import { Calendar, Globe, User, Sparkles } from "lucide-react";
import RegistrationForm from "./RegistrationForm";

const RegisterSection = () => {
  return (
    <section id="register" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 animated-bg" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-accent font-semibold">100% FREE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="gradient-text">Build Something Amazing?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join the Vibe Coding Competition 2K26 and showcase your full-stack development skills.
              Build an adaptive, AI-powered relationship engagement platform in just 3 days!
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm">Jan 20-22, 2026</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                <Globe className="w-4 h-4 text-accent" />
                <span className="text-sm">Online</span>
              </div>
              <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2">
                <User className="w-4 h-4 text-platinum" />
                <span className="text-sm">Individual</span>
              </div>
            </div>
          </div>

          <RegistrationForm />
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
