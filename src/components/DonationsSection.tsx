import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Heart, FileText, Newspaper, GraduationCap, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const donationSchema = z.object({
  full_name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  amount: z.number().positive("Amount must be positive").max(1_000_000),
  purpose: z.enum(["registration_fee", "gazette", "startavotingparty", "general"]),
  message: z.string().trim().max(500).optional(),
});

const PURPOSES = [
  { id: "registration_fee", label: "R5,000 IEC Registration Fee", icon: FileText, desc: "Annexure 1 mandatory fee" },
  { id: "gazette", label: "Government Gazette Notice", icon: Newspaper, desc: "Statutory publication cost" },
  { id: "startavotingparty", label: "Startavotingparty in Schools", icon: GraduationCap, desc: "Digital voter education" },
  { id: "general", label: "General Movement Support", icon: Sparkles, desc: "Wherever needed most" },
] as const;

const DonationsSection = () => {
  const [purpose, setPurpose] = useState<string>("registration_fee");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [totals, setTotals] = useState({ count: 0, amount: 0 });

  useEffect(() => {
    supabase.rpc("get_donation_totals").then(({ data }) => {
      const row = Array.isArray(data) ? data[0] : data;
      if (row) {
        setTotals({
          count: Number(row.total_count ?? 0),
          amount: Number(row.total_amount ?? 0),
        });
      }
    });
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      full_name: (form.elements.namedItem("full_name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      amount: Number((form.elements.namedItem("amount") as HTMLInputElement).value),
      purpose: purpose as "registration_fee" | "gazette" | "startavotingparty" | "general",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim() || undefined,
    };

    const parsed = donationSchema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.rpc("submit_donation", {
      p_full_name: parsed.data.full_name,
      p_email: parsed.data.email,
      p_amount: parsed.data.amount,
      p_purpose: parsed.data.purpose,
      p_message: parsed.data.message ?? null,
    });
    setLoading(false);

    if (error) {
      toast.error("Could not record pledge. Please try again.");
      return;
    }
    setTxnId((data as string | null) ?? "");
    setSubmitted(true);
    toast.success("Thank you! Your pledge has been recorded.");
  };

  return (
    <section id="donations" className="py-20 md:py-28 bg-vote-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Heart className="h-10 w-10 text-destructive mx-auto mb-4" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Fund the <span className="text-gradient-gold">IEC Legal Drive</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Help us meet the statutory costs of party registration. Every rand brings transparent voting closer to reality.
          </p>
        </div>

        {/* Live counter */}
        <div className="max-w-2xl mx-auto mb-10 grid grid-cols-2 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <p className="text-3xl font-display font-bold text-primary">R {totals.amount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Pledged</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 text-center">
            <p className="text-3xl font-display font-bold text-vote-gold">{totals.count}</p>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">Supporters</p>
          </div>
        </div>

        {submitted ? (
          <div className="max-w-xl mx-auto bg-card border border-border rounded-xl p-8 text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold mb-2">Pledge Recorded</h3>
            <p className="text-muted-foreground mb-4">We'll be in touch with payment instructions shortly.</p>
            <p className="text-sm font-mono bg-muted rounded-lg px-4 py-2 inline-block">
              Transaction ID: <span className="font-bold text-primary">{txnId}</span>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8 space-y-6">
            <div>
              <Label className="mb-3 block">Allocate my contribution to:</Label>
              <RadioGroup value={purpose} onValueChange={setPurpose} className="grid sm:grid-cols-2 gap-3">
                {PURPOSES.map((p) => {
                  const Icon = p.icon;
                  return (
                    <label
                      key={p.id}
                      htmlFor={p.id}
                      className={`flex items-start gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        purpose === p.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted"
                      }`}
                    >
                      <RadioGroupItem value={p.id} id={p.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-primary" />
                          <span className="font-bold text-sm text-foreground">{p.label}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </RadioGroup>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input id="full_name" name="full_name" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" required maxLength={255} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (ZAR) *</Label>
              <Input id="amount" name="amount" type="number" min="1" step="1" required placeholder="e.g. 500" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message <span className="text-muted-foreground text-xs">(optional)</span></Label>
              <Textarea id="message" name="message" maxLength={500} rows={3} />
            </div>
            <Button type="submit" disabled={loading} size="lg" className="w-full bg-gradient-gold text-accent-foreground font-display font-bold">
              {loading ? "Recording…" : "PLEDGE MY CONTRIBUTION"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default DonationsSection;
