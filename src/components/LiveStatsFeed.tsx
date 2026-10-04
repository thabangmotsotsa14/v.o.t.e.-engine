import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import StatsBizExplorer from "./StatsBizExplorer";
import { fetchLiveStatsSaArticles } from "@/services/statsSaFeed";
import { RECENT_ARTICLES, type Article } from "@/data/statsBizData";

const POLL_MS = 15 * 60 * 1000;

const LiveStatsFeed = () => {
  const [items, setItems] = useState<Article[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updated, setUpdated] = useState<Date | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchLiveStatsSaArticles();
      if (!data.length) throw new Error("empty");
      setItems(data);
      setFailed(false);
    } catch {
      setFailed(true);
      setItems((prev) => prev ?? RECENT_ARTICLES);
    } finally {
      setUpdated(new Date());
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const t = setInterval(load, POLL_MS);
    return () => clearInterval(t);
  }, [load]);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {failed ? "Live feed unavailable right now — showing recent Stats SA releases." : "Live Stats SA releases · auto-refreshes every 15 minutes."}
          {updated && ` Updated ${updated.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit" })}.`}
        </p>
        <Button size="sm" variant="outline" onClick={load} disabled={loading}>
          <RefreshCw className={`mr-1.5 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />Refresh Feed
        </Button>
      </div>
      {!items ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Loading feed">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-lg border border-border p-4">
              <Skeleton className="h-4 w-1/3" /><Skeleton className="h-5 w-full" /><Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <StatsBizExplorer articles={items} />
      )}
    </div>
  );
};

export default LiveStatsFeed;
