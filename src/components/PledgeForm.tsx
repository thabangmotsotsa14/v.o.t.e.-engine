import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const provinces = [
  "Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal",
  "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape",
];

const PledgeForm = () => {
  const [agreed, setAgreed] = useState(false);
  const [contactMethod, setContactMethod] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please accept the pledge to continue.");
      return;
    }
    // Placeholder — will connect to backend
    setSubmitted(true);
    toast.success("Welcome to V.O.T.E.! Your pledge has been recorded.");
  };

  if (submitted) {
    return (
      <section id="pledge" className="py-20 md:py-28 bg-vote-surface">
        <div className="container mx-auto px-4 text-center max-w-xl">
          <CheckCircle2 className="h-20 w-20 text-primary mx-auto mb-6" />
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Welcome, Node.</h2>
          <p className="text-muted-foreground mb-6">
            Your pledge has been recorded. A unique Transaction ID will be generated upon full verification.
            Share V.O.T.E. to help us reach 1 million members.
          </p>
          <Button
            onClick={() => {
              const text = encodeURIComponent("I just pledged to V.O.T.E. — the Virtual Organized Transparency Engine. Join me: ");
              window.open(`https://wa.me/?text=${text}`, "_blank");
            }}
            className="bg-gradient-gold text-accent-foreground font-bold"
          >
            Share on WhatsApp
          </Button>
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
              <Select onValueChange={setContactMethod} required>
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
              <Label htmlFor="nationalId">National ID Number *</Label>
              <Input
                id="nationalId"
                placeholder="13-digit SA ID number"
                maxLength={13}
                pattern="\d{13}"
                title="Please enter a valid 13-digit South African ID number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Province / Jurisdiction *</Label>
              <Select required>
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
              className="w-full bg-gradient-gold text-accent-foreground font-display font-bold text-lg py-6 hover:opacity-90 transition-opacity"
            >
              SIGN THE PLEDGE & JOIN V.O.T.E.
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PledgeForm;
