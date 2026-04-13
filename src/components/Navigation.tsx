import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import voteLogo from "@/assets/vote-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("hero")}>
            <img src={voteLogo} alt="V.O.T.E. Party" className="h-10 w-10" />
            <span className="font-display font-bold text-lg text-foreground">
              V.O.T.E. <span className="text-muted-foreground font-normal text-sm">Party</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollTo("manifesto")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Manifesto
            </button>
            <button onClick={() => scrollTo("pledge")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Join & Pledge
            </button>
            <button onClick={() => scrollTo("get-involved")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Get Involved
            </button>
            <button onClick={() => scrollTo("contact")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </button>
            <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              MEMBERSHIP LOGIN
            </Button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <button onClick={() => scrollTo("manifesto")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Manifesto</button>
            <button onClick={() => scrollTo("pledge")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Join & Pledge</button>
            <button onClick={() => scrollTo("get-involved")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Get Involved</button>
            <button onClick={() => scrollTo("contact")} className="block w-full text-left text-sm font-medium text-muted-foreground hover:text-foreground py-2">Contact</button>
            <Button variant="outline" size="sm" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">MEMBERSHIP LOGIN</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
