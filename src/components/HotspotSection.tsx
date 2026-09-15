import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search, ExternalLink, UserPlus, CheckCircle, MapPin, Users,
  BarChart3, Map, Calculator, TrendingUp, Building, DollarSign,
  Award, FileText, BookOpen, CheckSquare, Scale, Eye, Flame,
  Share2, X, Bell,
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

const FALLBACK_RESOURCES: Resource[] = [
  // Voter Center
  { id: "fb-voter-1", category: "voter", title: "Register to Vote", description: "Register online with the IEC using your South African ID", target_url: "https://registertovote.elections.org.za/", icon: "UserPlus", search_tags: ["register","voter","registration","sign up","enrol"] },
  { id: "fb-voter-2", category: "voter", title: "Check Voter Status", description: "Confirm your registration status and voting district", target_url: "https://www.elections.org.za/pw/Voter/Registration-Status", icon: "CheckCircle", search_tags: ["status","check","verify","confirm","registered"] },
  { id: "fb-voter-3", category: "voter", title: "Find Your Voting Station", description: "Locate your assigned voting station by ID number", target_url: "https://www.elections.org.za/pw/Voter/Voting-Station-Finder", icon: "MapPin", search_tags: ["station","find","location","where","vote"] },
  { id: "fb-voter-4", category: "voter", title: "Who is My Ward Councillor?", description: "Look up your ward and elected councillor", target_url: "https://www.elections.org.za/pw/Voter/My-Ward-Councillor", icon: "Users", search_tags: ["ward","councillor","representative","local"] },
  // Election Center
  { id: "fb-election-1", category: "election", title: "Results & Statistics", description: "Official IEC results portal for all elections", target_url: "https://results.elections.org.za/", icon: "BarChart3", search_tags: ["results","statistics","outcomes","tally"] },
  { id: "fb-election-2", category: "election", title: "Atlas of Results", description: "Geographic visualisation of election results", target_url: "https://www.elections.org.za/pw/Elections-And-Results/Elections-Atlas", icon: "Map", search_tags: ["atlas","map","geographic","visualisation"] },
  { id: "fb-election-3", category: "election", title: "Seat Calculation", description: "How seats are allocated under proportional representation", target_url: "https://www.elections.org.za/pw/Elections-And-Results/Seat-Calculation-Detail", icon: "Calculator", search_tags: ["seats","calculation","allocation","proportional"] },
  { id: "fb-election-4", category: "election", title: "Voters' Roll Statistics", description: "National voter registration statistics", target_url: "https://www.elections.org.za/pw/Voter/Voters-Roll", icon: "TrendingUp", search_tags: ["roll","statistics","demographics","registered","voters"] },
  // Party Center
  { id: "fb-party-1", category: "party", title: "Party Registration Statistics", description: "List of all registered political parties in SA", target_url: "https://www.elections.org.za/pw/Parties-And-Candidates/Registered-Parties", icon: "Building", search_tags: ["parties","registered","statistics","political"] },
  { id: "fb-party-2", category: "party", title: "Political Funding Declarations", description: "Public and private funding disclosures", target_url: "https://www.elections.org.za/pw/Parties-And-Candidates/Party-Funding", icon: "DollarSign", search_tags: ["funding","declarations","private","public","donations"] },
  { id: "fb-party-3", category: "party", title: "Contesting Elections", description: "Candidate nomination requirements and process", target_url: "https://www.elections.org.za/pw/Parties-And-Candidates/Contest-Elections", icon: "Award", search_tags: ["contest","candidate","nomination","elections"] },
  { id: "fb-party-4", category: "party", title: "Register a New Party", description: "Annexure 1 requirements and the R5,000 fee", target_url: "https://www.elections.org.za/pw/Parties-And-Candidates/Register-A-New-Party", icon: "FileText", search_tags: ["register","party","annexure","founding","new party"] },
  // Process Center
  { id: "fb-process-1", category: "process", title: "How Voting Works", description: "Step-by-step guide to casting your ballot", target_url: "https://www.elections.org.za/pw/Voter/How-Does-Voting-Work", icon: "BookOpen", search_tags: ["voting","process","how to","guide","ballot"] },
  { id: "fb-process-2", category: "process", title: "Counting & Verification", description: "How votes are counted and audited", target_url: "https://www.elections.org.za/pw/Elections-And-Results/Counting-And-Verification", icon: "CheckSquare", search_tags: ["counting","verification","audit","tally"] },
  { id: "fb-process-3", category: "process", title: "Objections & Disputes", description: "Lodge an objection or electoral complaint", target_url: "https://www.elections.org.za/pw/About-Us/Electoral-Court-South-Africa", icon: "Scale", search_tags: ["objections","disputes","complaints","court"] },
  { id: "fb-process-4", category: "process", title: "Observers & Party Agents", description: "Become an accredited election observer", target_url: "https://www.elections.org.za/pw/Elections-And-Results/Observers", icon: "Eye", search_tags: ["observer","agent","accreditation","monitor"] },
  // V.O.T.E. Party Facilitation
  { id: "fb-party-vote", category: "party", title: "Start a Voting Session", description: "Launch a V.O.T.E. Party facilitated voting session", target_url: "https://voteparty.vercel.app", icon: "CheckSquare", search_tags: ["vote","voting session","facilitation","voteparty","start"] },
];

const HotspotSection = () => {
  const [resources, setResources] = useState<Resource[]>(FALLBACK_RESOURCES);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("voter");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase
      .from("hotspot_metadata")
      .select("*")
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setResources(data as Resource[]);
        }
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
