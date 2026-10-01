import { useState } from "react";
import { Menu, X, FileText, Search, Mail, ExternalLink, User, Building2, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { id: "hotspot", label: "Hotspot", icon: Search },
  { id: "manifesto", label: "Manifesto", icon: FileText },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  const scrollTo = (id: string) => {
    setIsOpen(false);
    if (!isHome) {
      navigate(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border",
        isHome ? "top-8" : "top-0",
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button onClick={() => scrollTo("hero")} aria-label="Home" className="flex items-center gap-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-background/40 backdrop-blur-md">
              <img
                src="/logo.png"
                alt="V.O.T.E Party Logo"
                className="h-11 w-11 rounded-full object-cover mix-blend-multiply"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </span>
            <span className="hidden font-display text-lg font-bold text-foreground sm:inline">V.O.T.E. Party</span>
          </button>

          {/* Desktop: icon-led nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={label}
                title={label}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden lg:inline">{label}</span>
              </button>
            ))}
            <Link
              to="/municipal-insights"
              aria-label="Municipal Insights"
              title="Municipal Insights"
              aria-current={location.pathname === "/municipal-insights" ? "page" : undefined}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-foreground hover:bg-muted",
                location.pathname === "/municipal-insights" ? "bg-muted text-foreground" : "text-muted-foreground",
              )}
            >
              <Building2 className="h-4 w-4" />
              <span className="hidden lg:inline">Municipal Insights</span>
            </Link>
            <Link
              to="/news-feed"
              aria-label="News Feed"
              title="News Feed"
              aria-current={location.pathname === "/news-feed" ? "page" : undefined}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-foreground hover:bg-muted",
                location.pathname === "/news-feed" ? "bg-muted text-foreground" : "text-muted-foreground",
              )}
            >
              <Newspaper className="h-4 w-4" />
              <span className="hidden lg:inline">News Feed</span>
            </Link>
            <Link
              to="/founder"
              aria-label="Founder"
              title="Founder"
              aria-current={location.pathname === "/founder" ? "page" : undefined}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:text-foreground hover:bg-muted",
                location.pathname === "/founder" ? "bg-muted text-foreground" : "text-muted-foreground",
              )}
            >
              <User className="h-4 w-4" />
              <span className="hidden lg:inline">Founder</span>
            </Link>
            <a href="https://voteparty.vercel.app" target="_blank" rel="noopener noreferrer" className="ml-2">
              <Button size="sm" className="bg-gradient-gold text-accent-foreground font-bold">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                START A VOTING PARTY
              </Button>
            </a>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 grid grid-cols-3 gap-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted text-muted-foreground hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{label}</span>
              </button>
            ))}
            <Link
              to="/municipal-insights"
              onClick={() => setIsOpen(false)}
              className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted text-muted-foreground hover:text-foreground"
            >
              <Building2 className="h-5 w-5" />
              <span className="text-xs">Municipal</span>
            </Link>
            <Link
              to="/news-feed"
              onClick={() => setIsOpen(false)}
              className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted text-muted-foreground hover:text-foreground"
            >
              <Newspaper className="h-5 w-5" />
              <span className="text-xs">News</span>
            </Link>
            <Link
              to="/founder"
              onClick={() => setIsOpen(false)}
              className="flex flex-col items-center gap-1 p-3 rounded-lg bg-muted text-muted-foreground hover:text-foreground"
            >
              <User className="h-5 w-5" />
              <span className="text-xs">Founder</span>
            </Link>
            <a href="https://voteparty.vercel.app" target="_blank" rel="noopener noreferrer" className="col-span-3 mt-2">
              <Button size="sm" className="w-full bg-gradient-gold text-accent-foreground font-bold">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> START A VOTING PARTY
              </Button>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
