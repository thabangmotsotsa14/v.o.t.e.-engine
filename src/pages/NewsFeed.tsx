import { useMemo, useState } from "react";
import { Newspaper, Search, ExternalLink, CalendarDays, Tag, Zap } from "lucide-react";
import ArticleSummarizerModal, { type SummarizerPreset } from "@/components/ArticleSummarizerModal";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ARTICLES, STATS_CATEGORIES } from "@/data/articles";
import { cn } from "@/lib/utils";

const NewsFeed = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ARTICLES.filter((a) => {
      const matchesCategory = category === "All" || a.category === category;
      const matchesQuery =
        !q ||
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const activeCategories = useMemo(() => {
    const present = new Set(ARTICLES.map((a) => a.category));
    return ["All", ...STATS_CATEGORIES.filter((c) => present.has(c))];
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <header className="max-w-3xl">
            <Badge variant="outline" className="mb-4 border-primary/40 text-primary">
              <Newspaper className="mr-1.5 h-3.5 w-3.5" /> Stats SA Wire
            </Badge>
            <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">News &amp; Data Feed</h1>
            <p className="mt-3 text-muted-foreground">
              Official statistics releases, data stories and announcements from Statistics South Africa — the evidence
              base for transparent civic oversight.
            </p>
          </header>

          <div className="mt-8">
            <ArticleSummarizerModal preset={preset} />
          </div>

          {/* Search */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search releases (e.g., unemployment, CPI, population)..."
                className="pl-9"
                aria-label="Search articles"
              />
            </div>
            {query && (
              <Button variant="outline" onClick={() => setQuery("")}>
                Clear search
              </Button>
            )}
          </div>

          {/* Category filters */}
          <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Categories">
            {activeCategories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Results */}
          <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? "release" : "releases"}
            {category !== "All" && <> in {category}</>}
          </p>

          {filtered.length === 0 ? (
            <Card className="mt-6 border-dashed">
              <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                <Search className="h-8 w-8 text-muted-foreground" />
                <p className="font-medium text-foreground">No releases match your search</p>
                <p className="text-sm text-muted-foreground">Try a different keyword or category.</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                  }}
                >
                  Reset filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((a) => (
                <Card key={a.id} className="flex flex-col transition-shadow hover:shadow-lg">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" className="text-xs">
                        <Tag className="mr-1 h-3 w-3" />
                        {a.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <CalendarDays className="h-3 w-3" />
                        {a.date}
                      </span>
                    </div>
                    <CardTitle className="mt-2 text-lg leading-snug">{a.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col justify-between gap-4">
                    <CardDescription className="text-sm">{a.summary}</CardDescription>
                    <div className="flex flex-wrap gap-2">
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="inline-flex">
                        <Button variant="outline" size="sm">
                          Read on Stats SA
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </Button>
                      </a>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          setPreset({ text: `${a.title}\n\n${a.summary}\n\nSource: ${a.url}`, nonce: Date.now() });
                          document.getElementById("summarizer")?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <Zap className="mr-1.5 h-3.5 w-3.5" /> Summarize
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <p className="mt-10 text-xs text-muted-foreground">
            Source:{" "}
            <a
              href="https://www.statssa.gov.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Statistics South Africa
            </a>{" "}
            — official releases reproduced as summaries for civic transparency.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewsFeed;
