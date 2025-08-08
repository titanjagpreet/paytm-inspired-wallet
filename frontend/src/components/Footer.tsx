import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Logo */}
          <div className="mb-8">
            <a href="#" className="text-3xl font-bold text-gradient">
              WalletX
            </a>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              The future of digital payments. Secure, fast, and intuitive.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Support
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="flex items-center justify-center text-sm text-muted-foreground">
            <span>© 2024 WalletX. Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
            <span>for the future of finance.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}