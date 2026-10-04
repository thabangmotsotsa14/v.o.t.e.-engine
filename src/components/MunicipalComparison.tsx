import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { municipalMetrics, NATIONAL_BENCHMARKS as NB, type MunicipalMetric } from "@/data/municipalities";

const auditScore = (a: string) => (/clean/i.test(a) ? 3 : /unqualified/i.test(a) ? 2 : 1);
const budgetNum = (b: string) => parseFloat(b.replace(/[^\d.]/g, ""));

type Row = { label: string; national: string; get: (m: MunicipalMetric) => string; score: (m: MunicipalMetric) => number; higherBetter: boolean };
const ROWS: Row[] = [
  { label: "Unemployment", national: `${NB.unemployment}%`, get: (m) => `${m.localUnemployment}%`, score: (m) => m.localUnemployment, higherBetter: false },
  { label: "Water access", national: `${NB.waterAccess}%`, get: (m) => `${m.waterAccessRate}%`, score: (m) => m.waterAccessRate, higherBetter: true },
  { label: "Electricity access", national: `${NB.electricityAccess}%`, get: (m) => `${m.electricityAccessRate}%`, score: (m) => m.electricityAccessRate, higherBetter: true },
  { label: "Operating budget", national: `${NB.totalMunicipalBudget} (all municipalities)`, get: (m) => m.operatingBudget, score: (m) => budgetNum(m.operatingBudget), higherBetter: true },
  { label: "Cash coverage", national: "1–3 mo (norm)", get: (m) => `${m.cashCoverageMonths} mo`, score: (m) => m.cashCoverageMonths, higherBetter: true },
  { label: "Audit outcome", national: "—", get: (m) => m.auditRating, score: (m) => auditScore(m.auditRating), higherBetter: true },
];

const Select = ({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) => (
  <label className="flex-1 text-sm text-muted-foreground">
    {label}
    <select value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring">
      {municipalMetrics.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
    </select>
  </label>
);

const MunicipalComparison = () => {
  const [aId, setA] = useState("cape-town");
  const [bId, setB] = useState("johannesburg");
  const a = municipalMetrics.find((m) => m.id === aId)!;
  const b = municipalMetrics.find((m) => m.id === bId)!;

  const cls = (row: Row, self: MunicipalMetric, other: MunicipalMetric) => {
    const s = row.score(self), o = row.score(other);
    if (s === o) return "";
    return (row.higherBetter ? s > o : s < o) ? "font-semibold text-primary" : "text-muted-foreground";
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Select label="Municipality A" value={aId} onChange={setA} />
        <Select label="Municipality B" value={bId} onChange={setB} />
      </div>
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow><TableHead>Indicator</TableHead><TableHead>{a.name}</TableHead><TableHead>{b.name}</TableHead><TableHead>National</TableHead></TableRow>
          </TableHeader>
          <TableBody>
            {ROWS.map((r) => (
              <TableRow key={r.label}>
                <TableCell className="font-medium">{r.label}</TableCell>
                <TableCell className={cn(cls(r, a, b))}>{r.get(a)}</TableCell>
                <TableCell className={cn(cls(r, b, a))}>{r.get(b)}</TableCell>
                <TableCell className="text-muted-foreground">{r.national}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <p className="text-xs text-muted-foreground">Better performance is highlighted in green. National benchmarks: National Treasury 2025/26 MTREF aggregates. Cape Town and Ekurhuleni audit outcomes are confirmed from the Auditor-General's 2023-24 report; other metro figures are reference estimates pending official verification.</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {[["Total municipal budget 2025/26", NB.totalMunicipalBudget], ["Capital expenditure", `${NB.capitalExpenditure} · ${NB.tradingInfrastructureShare}% trading infrastructure`], ["Operating spend", `Bulk purchases ${NB.bulkPurchasesShare}% · Employees ${NB.employeeCostsShare}%`]].map(([l, v]) => (
          <div key={l} className="rounded-lg border border-border bg-card p-3"><p className="text-xs text-muted-foreground">{l}</p><p className="font-display font-semibold text-foreground">{v}</p></div>
        ))}
      </div>
    </div>
  );
};

export default MunicipalComparison;
