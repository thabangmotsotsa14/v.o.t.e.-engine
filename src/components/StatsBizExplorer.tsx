import { useMemo, useState } from "react";
import { Search, ExternalLink, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { RECENT_ARTICLES, STATS_CATEGORIES, type Article } from "@/data/statsBizData";

const StatsBizExplorer = ({ articles = RECENT_ARTICLES }: { articles?: Article[] }) => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const list = useMemo(() => {
    const s = q.toLowerCase();
    return articles.filter((a) => (cat === "All" || a.category === cat) && `${a.title} ${a.summary} ${a.category}`.toLowerCase().includes(s));
  }, [articles, q, cat]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Stats SA releases..." className="pl-9" aria-label="Search Stats SA releases" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Categories">
        {["All", ...STATS_CATEGORIES].map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={cn("shrink-0 rounded-full border px-3 py-1 text-xs transition-colors", cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground")}>
            {c}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted-foreground">No releases match. Try another search or category.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((a) => (
            <Card key={a.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="text-xs">{a.category}</Badge>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground"><CalendarDays className="h-3 w-3" />{a.date}</span>
                </div>
                <CardTitle className="mt-2 text-base leading-snug">{a.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-3">
                <p className="text-sm text-muted-foreground">{a.summary}</p>
                <a href={a.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  Read on StatsSA.gov.za <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsBizExplorer;
