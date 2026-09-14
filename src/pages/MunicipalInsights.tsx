import { useMemo, useState } from "react";
import { BarChart3, Building2, CheckCircle2, ExternalLink, Gauge, MapPin, Search, TrendingDown, TrendingUp, Users, Waves, Zap, Trash2, Droplets } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { municipalities, type Municipality } from "@/data/municipalities";
import logoAsset from "@/assets/vote-party-logo.png.asset.json";

const personas = ["Existing Resident", "Relocator / Moving", "Civic Auditor"] as const;
const serviceLabels = [
  { key: "water", label: "Water", icon: Droplets },
  { key: "electricity", label: "Electricity", icon: Zap },
  { key: "sanitation", label: "Sanitation", icon: Waves },
  { key: "waste", label: "Waste Removal", icon: Trash2 },
] as const;

const formatPopulation = (value: number) => new Intl.NumberFormat("en-ZA").format(value);

function MetricOverview({ municipality }: { municipality: Municipality }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <article className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between"><span className="text-sm font-semibold text-muted-foreground">Unemployment Rate</span><BarChart3 className="h-5 w-5 text-primary" /></div>
        <p className="font-display text-3xl font-bold text-foreground">{municipality.unemploymentRate}%</p>
        <p className={cn("mt-2 flex items-center gap-1 text-sm font-medium", municipality.unemploymentTrend <= 0 ? "text-primary" : "text-destructive")}>
          {municipality.unemploymentTrend <= 0 ? <TrendingDown className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
          {Math.abs(municipality.unemploymentTrend)} pts year-on-year
        </p>
      </article>
      <article className="rounded-lg border border-border bg-card p-5 md:col-span-1 xl:col-span-2">
        <div className="mb-4 flex items-center justify-between"><span className="text-sm font-semibold text-muted-foreground">Service Delivery Scorecard</span><Gauge className="h-5 w-5 text-primary" /></div>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceLabels.map(({ key, label, icon: Icon }) => <div key={key}><div className="mb-1 flex justify-between text-xs"><span className="flex items-center gap-1 text-muted-foreground"><Icon className="h-3.5 w-3.5" />{label}</span><strong>{municipality.services[key]}%</strong></div><Progress value={municipality.services[key]} className="h-2 bg-muted" /></div>)}
        </div>
      </article>
      <article className="rounded-lg border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between"><span className="text-sm font-semibold text-muted-foreground">Governance & Rates</span><CheckCircle2 className="h-5 w-5 text-primary" /></div>
        <p className="font-display text-lg font-bold text-foreground">{municipality.auditRating}</p>
        <p className="mt-1 text-sm text-muted-foreground">Governance rank #{municipality.governanceRank} of 6 metros</p>
        <div className="mt-3 border-t border-border pt-3 text-sm"><strong>Rates index {municipality.ratesIndex}</strong><p className="text-muted-foreground">Utilities {municipality.monthlyUtilities}/month</p></div>
      </article>
    </div>
  );
}

const MunicipalInsights = () => {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("ekurhuleni");
  const [compareId, setCompareId] = useState("");
  const [persona, setPersona] = useState<(typeof personas)[number]>("Existing Resident");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const selected = municipalities.find((item) => item.id === selectedId) ?? municipalities[0];
  const compared = municipalities.find((item) => item.id === compareId);
  const suggestions = useMemo(() => municipalities.filter((item) => `${item.name} ${item.province}`.toLowerCase().includes(query.toLowerCase())).slice(0, 6), [query]);

  const chooseMunicipality = (item: Municipality) => { setSelectedId(item.id); setQuery(item.name); setShowSuggestions(false); setCompareId(""); };
  const submitSearch = (event: React.FormEvent) => { event.preventDefault(); const first = suggestions[0]; if (first) chooseMunicipality(first); };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-16">
        <section className="border-b border-border bg-vote-navy py-14 md:py-20">
          <div className="container px-4 lg:px-8">
            <div className="max-w-3xl">
              <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase text-vote-gold"><Building2 className="h-4 w-4" />South African Local Intelligence</span>
              <h1 className="font-display text-4xl font-bold text-primary-foreground md:text-6xl">Municipal Insights &amp; Compare</h1>
              <p className="mt-4 max-w-2xl text-lg text-primary-foreground/70">Explore service access, governance indicators, rates and local updates across South Africa's major metros.</p>
            </div>
            <form onSubmit={submitSearch} className="mt-8 flex max-w-4xl flex-col gap-3 sm:flex-row" role="search">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input value={query} onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }} onFocus={() => setShowSuggestions(true)} aria-label="Search municipality" aria-autocomplete="list" placeholder="Search Municipality (e.g., Ekurhuleni, City of Cape Town, eThekwini)..." className="h-12 bg-background pl-12" />
                {showSuggestions && query && <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-md border border-border bg-popover shadow-lg" role="listbox">{suggestions.length ? suggestions.map((item) => <button type="button" key={item.id} onClick={() => chooseMunicipality(item)} className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted" role="option"><MapPin className="h-4 w-4 text-primary" /><span><strong className="block text-sm">{item.name}</strong><span className="text-xs text-muted-foreground">{item.province}</span></span></button>) : <p className="px-4 py-3 text-sm text-muted-foreground">No matching municipality in the sample dataset.</p>}</div>}
              </div>
              <Button type="submit" size="lg" className="h-12 bg-gradient-gold font-bold text-accent-foreground">Find Updates &amp; Stats</Button>
            </form>
          </div>
        </section>

        <section className="container px-4 py-10 lg:px-8 md:py-14">
          <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-center md:justify-between">
            <div><p className="text-sm text-muted-foreground">Viewing as</p><div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Choose profile">{personas.map((item) => <Button key={item} type="button" size="sm" variant={persona === item ? "default" : "outline"} onClick={() => setPersona(item)}>{item}</Button>)}</div></div>
            <div className="md:text-right"><p className="text-sm text-muted-foreground">Selected municipality</p><h2 className="font-display text-2xl font-bold text-foreground">{selected.name}</h2><p className="text-sm text-muted-foreground">{selected.province} · Population {formatPopulation(selected.population)}</p></div>
          </div>

          <MetricOverview municipality={selected} />

          <Tabs defaultValue="updates" className="mt-8">
            <TabsList className="grid h-auto w-full grid-cols-2 md:w-auto"><TabsTrigger value="updates">Updates &amp; Notices</TabsTrigger><TabsTrigger value="compare">Compare Metros</TabsTrigger></TabsList>
            <TabsContent value="updates" className="mt-5">
              <div className="divide-y divide-border rounded-lg border border-border bg-card">{selected.updates.map((update) => <article key={`${update.date}-${update.title}`} className="grid gap-2 p-5 md:grid-cols-[140px_1fr]"><div><span className="text-xs font-bold uppercase text-primary">{update.type}</span><p className="text-xs text-muted-foreground">{update.date}</p></div><div><h3 className="font-display font-bold text-foreground">{update.title}</h3><p className="mt-1 text-sm text-muted-foreground">{update.detail}</p></div></article>)}</div>
            </TabsContent>
            <TabsContent value="compare" className="mt-5">
              <div className="rounded-lg border border-border bg-card p-5">
                <label htmlFor="compare" className="text-sm font-bold text-foreground">Compare with another Municipality</label>
                <select id="compare" value={compareId} onChange={(e) => setCompareId(e.target.value)} className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring md:max-w-md"><option value="">Select a municipality</option>{municipalities.filter((item) => item.id !== selected.id).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
                {compared ? <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[560px] border-collapse text-left text-sm"><caption className="sr-only">Municipality comparison</caption><thead><tr className="border-b border-border"><th className="p-3 text-muted-foreground">Measure</th><th className="p-3 font-display text-base">{selected.name}</th><th className="p-3 font-display text-base">{compared.name}</th></tr></thead><tbody>{[
                  ["Population", formatPopulation(selected.population), formatPopulation(compared.population)],
                  ["Average service delivery", `${Math.round(Object.values(selected.services).reduce((a,b) => a+b, 0)/4)}%`, `${Math.round(Object.values(compared.services).reduce((a,b) => a+b, 0)/4)}%`],
                  ["Unemployment", `${selected.unemploymentRate}%`, `${compared.unemploymentRate}%`],
                  ["Audit performance", selected.auditRating, compared.auditRating],
                  ["Rates index", selected.ratesIndex, compared.ratesIndex],
                ].map(([label, a, b]) => <tr key={label} className="border-b border-border last:border-0"><th className="p-3 font-medium text-muted-foreground">{label}</th><td className="p-3 font-bold text-foreground">{a}</td><td className="p-3 font-bold text-foreground">{b}</td></tr>)}</tbody></table></div> : <div className="mt-6 flex items-center gap-3 rounded-md bg-muted p-4 text-sm text-muted-foreground"><Users className="h-5 w-5 text-primary" />Choose another metro to open a side-by-side comparison.</div>}
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between"><p>Sample indicators for exploration. Confirm current figures with the official source.</p><a href="https://www.statssa.gov.za/?page_id=964" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">Source: Stats SA &amp; Municipal Data API <ExternalLink className="h-3.5 w-3.5" /></a></div>
        </section>
      </main>
    </div>
  );
};

export default MunicipalInsights;
