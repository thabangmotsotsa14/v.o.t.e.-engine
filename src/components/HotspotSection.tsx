import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import {
  Search, ExternalLink, UserPlus, CheckCircle, MapPin, Users,
  BarChart3, Map, Calculator, TrendingUp, Building, DollarSign,
  Award, FileText, BookOpen, CheckSquare, Scale, Eye, Flame,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = {
  UserPlus, CheckCircle, MapPin, Users, BarChart3, Map, Calculator,
  TrendingUp, Building, DollarSign, Award, FileText, BookOpen,
  CheckSquare, Scale, Eye,
};

type Resource = {
  id: string;
  category: string;
  title: string;
  description: string | null;
  target_url: string;
  icon: string | null;
  search_tags: string[] | null;
};

const CATEGORIES = [
  { id: "voter", label: "Voter Center", color: "text-primary", bg: "bg-primary/10" },
  { id: "election", label: "Election Center", color: "text-vote-gold", bg: "bg-vote-gold/10" },
  { id: "party", label: "Party Center", color: "text-vote-green-light", bg: "bg-vote-green-light/10" },
  { id: "process", label: "Process Center", color: "text-foreground", bg: "bg-muted" },
];

const HotspotSection = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("voter");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("hotspot_metadata")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data }) => {
        if (data) setResources(data as Resource[]);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resources.filter((r) => r.category === activeCategory);
    return resources.filter((r) => {
      const haystack = [
        r.title, r.description ?? "", ...(r.search_tags ?? []),
      ].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [resources, query, activeCategory]);

  return (
    <section id="hotspot" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-vote-gold/10 text-vote-gold px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <Flame className="h-3 w-3" />
            V.O.T.E. Hotspot
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Electoral <span className="text-gradient-gold">Intelligence</span> Search
          </h2>
          <p className="text-muted-foreground text-lg">
            Instant access to every IEC resource. Register, verify, find your station, track results.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search: 'register', 'voting station', 'results'..."
              className="pl-12 h-14 text-base"
            />
          </div>
        </div>

        {/* Category tabs */}
        {!query && (
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-bold transition-all",
                  activeCategory === c.id
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-muted/70"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}

        {/* Results grid */}
        {loading ? (
          <p className="text-center text-muted-foreground">Loading IEC resources…</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground">No resources match your search.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {filtered.map((r) => {
              const Icon = ICONS[r.icon ?? ""] ?? FileText;
              const cat = CATEGORIES.find((c) => c.id === r.category);
              return (
                <a
                  key={r.id}
                  href={r.target_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card border border-border rounded-xl p-5 hover:border-primary hover:shadow-lg transition-all"
                >
                  <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-3", cat?.bg)}>
                    <Icon className={cn("h-5 w-5", cat?.color)} />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {r.title}
                  </h3>
                  {r.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{r.description}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-primary font-bold">
                    Open <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default HotspotSection;
