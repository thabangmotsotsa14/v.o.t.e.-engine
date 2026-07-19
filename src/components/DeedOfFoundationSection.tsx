import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Scroll, CheckCircle2, Share2, Copy } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const provinces = [
  "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
  "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape",
];

const SIGNATURES_GOAL = 1000;

const schema = z.object({
  full_name: z.string().trim().min(3, "Enter your full name").max(100),
  id_number: z.string().regex(/^\d{13}$/, "Enter a valid 13-digit SA ID number"),
  province: z.string().min(1, "Select your province"),
  email: z.string().trim().email("Invalid email").max(255).optional().or(z.literal("")),
  digital_consent: z.literal(true, { errorMap: () => ({ message: "You must consent to sign" }) }),
});

// Simple SHA-256 hash for client-side ID hashing (de-identification before storage)
async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const DeedOfFoundationSection = () => {
  const [province, setProvince] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [signerName, setSignerName] = useState("");

  useEffect(() => {
    supabase.rpc("get_signature_count").then(({ data }) => setCount(Number(data ?? 0)));
  }, [showSuccess]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      full_name: (form.elements.namedItem("full_name") as HTMLInputElement).value.trim(),
      id_number: (form.elements.namedItem("id_number") as HTMLInputElement).value.trim(),
      province,
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      digital_consent: consent,
    };

    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setLoading(true);
    const id_number_hash = await sha256Hex(parsed.data.id_number);

    const { data, error } = await supabase.rpc("submit_deed_signature", {
      p_full_name: parsed.data.full_name,
      p_id_number_hash: id_number_hash,
      p_province: parsed.data.province,
      p_email: parsed.data.email || null,
      p_digital_consent: true,
    });

    if (error) {
      setLoading(false);
      if ((error as { code?: string }).code === "23505" || /duplicate|unique/i.test(error.message)) {
        toast.error("This ID number has already signed the Deed of Foundation.");
      } else {
        toast.error("Could not record signature. Please try again.");
      }
      return;
    }

    const transaction_id = (data as string | null) ?? "";
    setTxnId(transaction_id);
    setSignerName(parsed.data.full_name);

    // Fire-and-forget confirmation email (Lovable Emails). Don't block UX on errors.
    if (parsed.data.email) {
      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "deed-of-foundation-confirmation",
            recipientEmail: parsed.data.email,
            idempotencyKey: `deed-${transaction_id}`,
            templateData: {
              name: parsed.data.full_name,
              transactionId: transaction_id,
              province: parsed.data.province,
            },
          },
        })
        .catch(() => { /* non-blocking */ });
    }

    setLoading(false);
    setShowSuccess(true);
    form.reset();
    setProvince("");
    setConsent(false);
  };

  const shareText = `I just signed the V.O.T.E. Party Deed of Foundation — joining the first 1,000 South Africans founding a transparent, auditable digital voting movement. Add your signature: ${typeof window !== "undefined" ? window.location.origin : ""}#deed`;
  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/#deed` : "";

  return (
    <section id="deed" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Scroll className="h-10 w-10 text-primary mx-auto mb-4" />
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
            Annexure 6 · Legal Founding Document
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Sign the <span className="text-gradient-green">Deed of Foundation</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We need <strong>1,000 registered South African voters</strong> to legally found V.O.T.E. with the IEC.
            Your signature is recorded with cryptographic integrity.
          </p>
        </div>

        {/* Progress */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold text-foreground">{count.toLocaleString()} of {SIGNATURES_GOAL.toLocaleString()} signatures</span>
            <span className="text-sm text-muted-foreground">{Math.round((count / SIGNATURES_GOAL) * 100)}%</span>
          </div>
          <Progress value={(count / SIGNATURES_GOAL) * 100} className="h-3" />
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name (as per ID) *</Label>
            <Input id="full_name" name="full_name" required maxLength={100} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="id_number">SA ID Number *</Label>
              <Input id="id_number" name="id_number" required maxLength={13} pattern="\d{13}" placeholder="13 digits" />
              <p className="text-xs text-muted-foreground">Stored as a one-way hash — your raw ID never leaves your device.</p>
            </div>
            <div className="space-y-2">
              <Label>Province *</Label>
              <Select value={province} onValueChange={setProvince}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {provinces.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-muted-foreground text-xs">(for your signed copy)</span></Label>
            <Input id="email" name="email" type="email" maxLength={255} placeholder="you@example.com" />
          </div>
          <div className="flex items-start gap-3 pt-2 border-t border-border">
            <Checkbox id="consent" checked={consent} onCheckedChange={(c) => setConsent(c === true)} />
            <Label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
              I am a registered South African voter. I consent to my digital signature being collected in accordance with the
              Electoral Commission Act for the purpose of registering the V.O.T.E. Party with the IEC.
            </Label>
          </div>
          <Button type="submit" disabled={loading} size="lg" className="w-full bg-primary text-primary-foreground font-display font-bold">
            {loading ? "Recording your signature…" : "SIGN THE DEED OF FOUNDATION"}
          </Button>
        </form>
      </div>

      {/* Success modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit mb-2">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <DialogTitle className="text-center font-display text-2xl">Signature Recorded</DialogTitle>
            <DialogDescription className="text-center">
              Thank you, {signerName.split(" ")[0]}. Your signature is officially logged on the V.O.T.E. ledger.
            </DialogDescription>
          </DialogHeader>
          <div className="bg-muted rounded-lg p-3 text-center my-2">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Transaction ID</p>
            <div className="flex items-center justify-center gap-2">
              <code className="text-sm font-bold text-primary">{txnId}</code>
              <button
                type="button"
                onClick={() => { navigator.clipboard.writeText(txnId); toast.success("Copied"); }}
                className="text-muted-foreground hover:text-foreground"
              >
                <Copy className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-center text-muted-foreground">Help us reach 1,000 — share with your network:</p>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm" onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank")}>
                WhatsApp
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`, "_blank")}>
                X / Twitter
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")}>
                Facebook
              </Button>
            </div>
            <Button
              className="w-full mt-2"
              variant="ghost"
              size="sm"
              onClick={async () => {
                if (navigator.share) {
                  try { await navigator.share({ title: "V.O.T.E. Party", text: shareText, url: shareUrl }); } catch {}
                } else {
                  navigator.clipboard.writeText(shareText);
                  toast.success("Share link copied");
                }
              }}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share anywhere
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DeedOfFoundationSection;
