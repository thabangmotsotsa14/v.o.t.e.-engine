import { Download, Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import voteLogo from "@/assets/vote-logo-new.png";

const Footer = () => {
  return (
    <footer className="bg-vote-navy py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={voteLogo} alt="V.O.T.E." className="h-10 w-10" loading="lazy" width={512} height={512} />
              <span className="font-display font-bold text-xl text-primary-foreground">V.O.T.E. Party</span>
            </div>
            <p className="text-primary-foreground/50 text-sm leading-relaxed">
              Virtual Organized Transparency Engine · Consensus-as-a-Service (CaaS)
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              {[
                { id: "hotspot", label: "V.O.T.E. Hotspot" },
                { id: "deed", label: "Sign the Deed" },
                { id: "manifesto", label: "Manifesto" },
                { id: "donations", label: "Donate" },
                { id: "contact", label: "Contact" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                  className="block text-sm text-primary-foreground/50 hover:text-vote-gold transition-colors"
                >
                  {label}
                </button>
              ))}
              <a
                href="https://voteparty.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-vote-gold hover:text-vote-gold/80 transition-colors font-medium"
              >
                Start Voting Session →
              </a>
              <a
                href="https://apps.apple.com/za/app/iec-mobile-app/id1532013548"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-primary-foreground/50 hover:text-vote-gold transition-colors"
              >
                IEC Mobile App ↗
              </a>
            </div>
          </div>

          {/* Media Kit & Contact */}
          <div>
            <h4 className="font-display font-bold text-primary-foreground mb-4">Media Kit</h4>
            <p className="text-primary-foreground/50 text-sm mb-4">
              For the South African Podcasting Association (SAPA), digital strategists, and media inquiries.
            </p>
            <div className="space-y-2">
              <a href="mailto:eugene.motsotsa@gmail.com" className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-vote-gold transition-colors">
                <Mail className="h-4 w-4" /> eugene.motsotsa@gmail.com
              </a>
              <a href="https://wa.me/27670628019" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-vote-gold transition-colors">
                <MessageCircle className="h-4 w-4" /> 067 062 8019
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/30 text-xs">
            © {new Date().getFullYear()} V.O.T.E. Party. All rights reserved.
          </p>
          <p className="text-primary-foreground/30 text-xs text-center">
            Compliance-as-a-Service · Consensus-as-a-Service · Data Integrity by Design
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
