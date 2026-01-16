const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl text-foreground">NxtGenSec</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://nxtgensec.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Website
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Privacy
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} NxtGenSec. All rights reserved.
          </p>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Vibe Coding Competition 2K26 • Adaptive Relationship Engagement Platform
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
