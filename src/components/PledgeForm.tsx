import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const provinces = [
  "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
  "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape",
];

const PledgeForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [contactMethod, setContactMethod] = useState<string>("");
  const [province, setProvince] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please accept the pledge to continue.");
      return;
    }
    if (!contactMethod) {
      toast.error("Please select a contact method.");
      return;
    }
    if (!province) {
      toast.error("Please select your province.");
      return;
    }

    setLoading(true);

    const form = e.currentTarget;
    const fullName = (form.elements.namedItem("fullName") as HTMLInputElement).value.trim();
    const email = contactMethod === "email" ? (form.elements.namedItem("email") as HTMLInputElement)?.value.trim() : null;
    const mobile = contactMethod === "mobile" ? (form.elements.namedItem("mobile") as HTMLInputElement)?.value.trim() : null;
    const nationalId = (form.elements.namedItem("nationalId") as HTMLInputElement)?.value.trim() || null;

    const { data, error } = await supabase
      .from("pledges")
      .insert({
        full_name: fullName,
        contact_method: contactMethod,
        email,
        mobile,
        national_id: nationalId,
        province,
      })
      .select("transaction_id")
      .single();

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        if (error.message.includes("unique_full_name")) {
          toast.error("This name has already been registered.");
        } else if (error.message.includes("unique_mobile")) {
          toast.error("This mobile number has already been registered.");
        } else if (error.message.includes("unique_email")) {
          toast.error("This email has already been registered.");
        } else {
          toast.error("You have already registered. Duplicate entry detected.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
        console.error("Pledge error:", error);
      }
      return;
    }

    setTransactionId(data?.transaction_id || "");
    setSubmitted(true);
    toast.success("Welcome to V.O.T.E.! Your pledge has been recorded.");
  };

  if (submitted) {
    return (
      <section id="pledge" className="py-20 md:py-28 bg-vote-surface">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <CheckCircle2 className="h-20 w-20 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Welcome, Node.</h2>
          <p className="text-muted-foreground mb-2">
            Your pledge has been recorded.
          </p>
          {transactionId && (
            <p className="text-sm font-mono bg-muted rounded-lg px-4 py-2 inline-block mb-6">
              Transaction ID: <span className="font-bold text-primary">{transactionId}</span>
            </p>
          )}
          <p className="text-muted-foreground mb-6">
            Share V.O.T.E. to help us reach 1 million members.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                const text = encodeURIComponent("I just pledged to V.O.T.E. — the Virtual Organized Transparency Engine. Join me: ");
                window.open(`https://wa.me/?text=${text}`, "_blank");
              }}
              className="bg-gradient-gold text-accent-foreground font-bold"
            >
              Share on WhatsApp
            </Button>
            <Button
              variant="outline"
              onClick={() => window.open("https://voteparty.vercel.app", "_blank")}
              className="font-bold"
            >
              Start a Voting Session →
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pledge" className="py-20 md:py-28 bg-vote-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Secure Your Place in the Digital Future
            </h2>
            <p className="text-muted-foreground text-lg">Join the V.O.T.E. Movement.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 md:p-10 shadow-sm space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input id="fullName" placeholder="e.g. Thabo Mokoena" required />
            </div>

            <div className="space-y-2">
              <Label>Contact Method *</Label>
              <Select onValueChange={setContactMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose contact method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="mobile">South African Mobile Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {contactMethod === "email" && (
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
            )}

            {contactMethod === "mobile" && (
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number *</Label>
                <Input id="mobile" type="tel" placeholder="+27 XX XXX XXXX" required />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="nationalId">National ID Number <span className="text-muted-foreground text-sm">(optional)</span></Label>
              <Input
                id="nationalId"
                placeholder="13-digit SA ID number (optional)"
                maxLength={13}
                pattern="\d{13}"
                title="Please enter a valid 13-digit South African ID number"
              />
            </div>

            <div className="space-y-2">
              <Label>Province / Jurisdiction *</Label>
              <Select onValueChange={setProvince}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your province" />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-3 pt-2 border-t border-border">
              <Checkbox
                id="pledge"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
              />
              <Label htmlFor="pledge" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                By signing and pledging, I declare my commitment to the V.O.T.E. Party Manifesto.
                I understand that my identity will be verified and my pledge will be cryptographically recorded.
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full bg-gradient-gold text-accent-foreground font-display font-bold text-lg py-6 hover:opacity-90 transition-opacity"
            >
              {loading ? "Submitting..." : "SIGN THE PLEDGE & JOIN V.O.T.E."}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PledgeForm;
