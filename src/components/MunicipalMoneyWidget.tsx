import { useEffect, useState } from "react";
import { Loader2, Wallet, ShieldCheck, Landmark } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { MunicipalMetric } from "@/data/municipalities";
import { fetchMunicipalOverview, formatRand, type MunicipalOverview } from "@/services/municipalMoneyApi";

const auditTone = (a: string) =>
  /clean/i.test(a) ? "bg-primary/15 text-primary border-primary/40"
  : /unqualified/i.test(a) ? "bg-accent/15 text-accent border-accent/40"
  : "bg-destructive/15 text-destructive border-destructive/40";

const MunicipalMoneyWidget = ({ metric }: { metric: MunicipalMetric }) => {
  const [live, setLive] = useState<MunicipalOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchMunicipalOverview(metric.code).then((o) => { if (active) { setLive(o); setLoading(false); } });
    return () => { active = false; };
  }, [metric.code]);

  const audit = live?.auditOutcome ?? metric.auditRating;
  const cash = live?.cashCoverageMonths ?? metric.cashCoverageMonths;
  const budget = live?.operatingBudget ? formatRand(live.operatingBudget) : metric.operatingBudget;
  const cashPct = Math.min(100, (cash / 3) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm text-muted-foreground"><ShieldCheck className="h-4 w-4" />Auditor-General outcome</CardTitle></CardHeader>
        <CardContent><Badge variant="outline" className={cn("text-sm", auditTone(audit))}>{audit}</Badge></CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm text-muted-foreground"><Wallet className="h-4 w-4" />Operating budget</CardTitle></CardHeader>
        <CardContent>
          <p className="font-display text-2xl font-bold text-foreground">{budget}</p>
          {live?.capitalExpenditure ? <p className="text-xs text-muted-foreground">Capital budget: {formatRand(live.capitalExpenditure)}</p> : null}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-sm text-muted-foreground"><Landmark className="h-4 w-4" />Cash coverage</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <p className="font-display text-2xl font-bold text-foreground">{cash} <span className="text-sm font-normal text-muted-foreground">months</span></p>
          <Progress value={cashPct} aria-label="Cash coverage health" />
          <p className="text-xs text-muted-foreground">Treasury norm: 1–3 months. {cash >= 1 ? "Within healthy range." : "Below norm — liquidity risk."}</p>
        </CardContent>
      </Card>
      <p className="md:col-span-3 flex items-center gap-2 text-xs text-muted-foreground">
        {loading ? <><Loader2 className="h-3 w-3 animate-spin" />Checking Municipal Money for live figures…</>
          : live?.source === "live" ? "Includes live figures from National Treasury's Municipal Money API."
          : "Live Treasury data unavailable — showing latest reference figures."}
      </p>
    </div>
  );
};

export default MunicipalMoneyWidget;
