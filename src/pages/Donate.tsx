import { useState } from "react";
import { Heart, ShieldCheck, Lock } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const TIERS = [
  { amount: 50, label: "Supporter", desc: "Keeps the public data feeds online for a day." },
  { amount: 150, label: "Advocate", desc: "Funds municipal data checks and updates." },
  { amount: 500, label: "Champion", desc: "Backs new open civic-tech tools." },
];

const Donate = () => {
  const [selected, setSelected] = useState<number | "custom">(150);
  const [custom, setCustom] = useState("");
  const amount = selected === "custom" ? Number(custom) : selected;
  const valid = Number.isFinite(amount) && amount >= 10 && amount <= 100000;

  const proceed = () => {
    if (!valid) {
      toast({ title: "Enter an amount between R10 and R100,000", variant: "destructive" });
      return;
    }
    toast({ title: "Secure payments launching soon", description: `Thank you for choosing to give R${amount}. Online checkout is being set up.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container mx-auto max-w-4xl px-4 lg:px-8">
          <header className="text-center">
            <Heart className="mx-auto h-10 w-10 text-primary" />
            <h1 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl">Support Open Civic Technology</h1>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Your donation keeps V.O.T.E.'s transparency tools free for every South African.</p>
          </header>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="radiogroup" aria-label="Donation amount">
            {TIERS.map((t) => (
              <button key={t.amount} role="radio" aria-checked={selected === t.amount} onClick={() => setSelected(t.amount)}
                className={cn("rounded-xl border bg-card/60 p-5 text-left backdrop-blur-md transition-colors", selected === t.amount ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-primary/50")}>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{t.label}</p>
                <p className="mt-1 font-display text-3xl font-bold text-foreground">R{t.amount}</p>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              </button>
            ))}
            <div role="radio" aria-checked={selected === "custom"} tabIndex={0} onClick={() => setSelected("custom")} onKeyDown={(e) => e.key === "Enter" && setSelected("custom")}
              className={cn("cursor-pointer rounded-xl border bg-card/60 p-5 backdrop-blur-md transition-colors", selected === "custom" ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-primary/50")}>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Custom</p>
              <label className="mt-2 block text-sm text-muted-foreground">Amount (R)
                <Input type="number" min={10} max={100000} inputMode="numeric" value={custom} placeholder="e.g. 250"
                  onFocus={() => setSelected("custom")} onChange={(e) => setCustom(e.target.value)} className="mt-1" />
              </label>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-border bg-card/60 p-6 text-center backdrop-blur-md">
            <p className="text-muted-foreground">You're giving <span className="font-display text-2xl font-bold text-foreground">{valid ? `R${amount}` : "—"}</span></p>
            <Button size="lg" onClick={proceed} className="mt-4 bg-gradient-gold font-bold text-accent-foreground">
              <Lock className="mr-2 h-4 w-4" />Proceed to Secure Payment
            </Button>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" />Payments are processed by a secure, certified payment provider.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
