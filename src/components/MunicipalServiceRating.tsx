import { useCallback, useEffect, useState } from "react";
import { Star, Loader2, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { municipalMetrics } from "@/data/municipalities";

const SERVICES = [
  { key: "water_rating", label: "Water" },
  { key: "electricity_rating", label: "Electricity" },
  { key: "refuse_rating", label: "Refuse" },
  { key: "roads_rating", label: "Roads" },
] as const;
type ServiceKey = (typeof SERVICES)[number]["key"];

interface RatingRow { id: string; municipality_name: string; comment: string | null; upvotes: number; created_at: string; water_rating: number | null; electricity_rating: number | null; refuse_rating: number | null; roads_rating: number | null }

const Stars = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => (
  <div className="flex items-center justify-between gap-3">
    <span className="text-sm text-foreground">{label}</span>
    <div className="flex" role="radiogroup" aria-label={`${label} rating`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" role="radio" aria-checked={value === n} aria-label={`${n} star${n > 1 ? "s" : ""}`} onClick={() => onChange(n)} className="p-1">
          <Star className={cn("h-5 w-5", n <= value ? "fill-accent text-accent" : "text-muted-foreground")} />
        </button>
      ))}
    </div>
  </div>
);

const MunicipalServiceRating = () => {
  const [muniId, setMuniId] = useState(municipalMetrics[0].id);
  const [ratings, setRatings] = useState<Record<ServiceKey, number>>({ water_rating: 0, electricity_rating: 0, refuse_rating: 0, roads_rating: 0 });
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [recent, setRecent] = useState<RatingRow[]>([]);

  const load = useCallback(async () => {
    const { data } = await supabase.from("municipal_ratings").select("*").order("created_at", { ascending: false }).limit(6);
    setRecent((data as RatingRow[]) ?? []);
  }, []);
  useEffect(() => { load(); }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(ratings).every((v) => v === 0)) {
      toast({ title: "Rate at least one service", variant: "destructive" });
      return;
    }
    const muni = municipalMetrics.find((m) => m.id === muniId)!;
    setSubmitting(true);
    const payload = Object.fromEntries(Object.entries(ratings).map(([k, v]) => [k, v || null])) as Record<ServiceKey, number | null>;
    const { error } = await supabase.from("municipal_ratings").insert({
      municipality_id: muni.id, municipality_name: muni.name, comment: comment.trim().slice(0, 1000) || null, ...payload,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Could not submit rating", description: "Please try again shortly.", variant: "destructive" });
      return;
    }
    toast({ title: "Thank you!", description: `Your rating for ${muni.name} was recorded.` });
    setRatings({ water_rating: 0, electricity_rating: 0, refuse_rating: 0, roads_rating: 0 });
    setComment("");
    load();
  };

  const upvote = async (id: string) => {
    const { data, error } = await supabase.rpc("upvote_municipal_rating", { _id: id });
    if (!error) setRecent((r) => r.map((x) => (x.id === id ? { ...x, upvotes: Number(data) } : x)));
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form onSubmit={submit} className="space-y-4 rounded-lg border border-border bg-card p-5">
        <label className="block text-sm text-muted-foreground">
          Municipality
          <select value={muniId} onChange={(e) => setMuniId(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">
            {municipalMetrics.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </label>
        {SERVICES.map((s) => (
          <Stars key={s.key} label={s.label} value={ratings[s.key]} onChange={(v) => setRatings((r) => ({ ...r, [s.key]: v }))} />
        ))}
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} maxLength={1000} placeholder="Optional comment about service delivery..." rows={3} />
        <Button type="submit" disabled={submitting} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Submit Rating
        </Button>
      </form>
      <div className="space-y-3">
        <h3 className="font-display text-lg font-semibold text-foreground">Recent community ratings</h3>
        {recent.length === 0 ? <p className="text-sm text-muted-foreground">No ratings yet — be the first.</p> : recent.map((r) => {
          const vals = [r.water_rating, r.electricity_rating, r.refuse_rating, r.roads_rating].filter((v): v is number => v !== null);
          const avg = vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "—";
          return (
            <div key={r.id} className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground">{r.municipality_name}</span>
                <span className="flex items-center gap-1 text-sm text-accent"><Star className="h-4 w-4 fill-accent" />{avg}</span>
              </div>
              {r.comment && <p className="mt-1 text-sm text-muted-foreground">{r.comment}</p>}
              <button onClick={() => upvote(r.id)} className="mt-2 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
                <ThumbsUp className="h-3 w-3" />{r.upvotes}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MunicipalServiceRating;
