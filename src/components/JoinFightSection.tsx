import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const JoinFightSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're in! Welcome to the V.O.T.E. movement.");
    setEmail("");
  };

  return (
    <section className="py-16 md:py-20 bg-vote-green">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
            Join the Fight for Digital Democracy
          </h2>
          <p className="text-primary-foreground/70 mb-8">
            Let's demand a South Africa where every vote is secure, every voice is heard — and governance is transparent by design.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-vote-gold"
            />
            <Button
              type="submit"
              className="bg-vote-gold text-vote-navy font-bold uppercase tracking-wide hover:bg-vote-gold/90 whitespace-nowrap"
            >
              Sign Me Up
            </Button>
          </form>
          <p className="text-primary-foreground/40 text-xs mt-4">
            We'll send you updates on petitions, collective actions, and our progress toward 1 million members.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JoinFightSection;
