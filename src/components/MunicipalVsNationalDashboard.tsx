import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { municipalMetrics } from "@/data/municipalities";
import MunicipalMoneyWidget from "./MunicipalMoneyWidget";
import MunicipalComparison from "./MunicipalComparison";
import MunicipalServiceRating from "./MunicipalServiceRating";
import StatsBizExplorer from "./StatsBizExplorer";
import LiveStatsFeed from "./LiveStatsFeed";

const MunicipalVsNationalDashboard = () => {
  const [id, setId] = useState(municipalMetrics[0].id);
  const m = municipalMetrics.find((x) => x.id === id)!;
  const gap = +(m.localUnemployment - m.nationalUnemploymentBenchmark).toFixed(1);

  return (
    <Tabs defaultValue="health" className="space-y-6">
      <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
        <TabsTrigger value="health">🏛️ Municipal Financial Health</TabsTrigger>
        <TabsTrigger value="compare">⚖️ Compare Municipalities</TabsTrigger>
        <TabsTrigger value="feed">📡 Live Stats SA Feed</TabsTrigger>
        <TabsTrigger value="rate">⭐ Rate Civic Services</TabsTrigger>
      </TabsList>

      <TabsContent value="health" className="space-y-6">
        <label className="block max-w-md text-sm text-muted-foreground">
          Municipality
          <select value={id} onChange={(e) => setId(e.target.value)} className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground">
            {municipalMetrics.map((x) => <option key={x.id} value={x.id}>{x.name} ({x.code})</option>)}
          </select>
        </label>
        <MunicipalMoneyWidget metric={m} />
        <Card>
          <CardHeader><CardTitle className="text-base">Stats SA benchmarks</CardTitle></CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-3">
            <div>
              <p className="text-sm text-muted-foreground">Local vs national unemployment</p>
              <p className="font-display text-2xl font-bold text-foreground">{m.localUnemployment}% <span className="text-sm font-normal text-muted-foreground">vs {m.nationalUnemploymentBenchmark}%</span></p>
              <p className={gap > 0 ? "text-sm text-destructive" : "text-sm text-primary"}>{gap > 0 ? `+${gap}` : gap} pts vs national</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Water access {m.waterAccessRate}%</p><Progress value={m.waterAccessRate} />
              <p className="text-sm text-muted-foreground">Electricity access {m.electricityAccessRate}%</p><Progress value={m.electricityAccessRate} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">National economic impact</p>
              <p className="text-sm text-foreground">{m.nationalGdpImpactNote}</p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="compare"><MunicipalComparison /></TabsContent>
      <TabsContent value="feed"><LiveStatsFeed /></TabsContent>
      <TabsContent value="rate"><MunicipalServiceRating /></TabsContent>
    </Tabs>
  );
};

export default MunicipalVsNationalDashboard;
