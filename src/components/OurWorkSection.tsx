import { Megaphone, FileText, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const pillars = [
  {
    icon: Megaphone,
    title: "Activism Campaigns",
    description:
      "Change only happens when we fight for what we believe in. Join V.O.T.E. on the issues that matter to every South African citizen.",
    cta: "Sign the Pledge",
    action: "pledge",
  },
  {
    icon: FileText,
    title: "Policy & Compliance",
    description:
      "We use our expertise to research and craft policies that serve the public interest — pioneering Compliance-as-a-Service governance standards.",
    cta: "Read the Manifesto",
    action: "manifesto",
  },
  {
    icon: Rocket,
    title: "Digital Democracy Projects",
    description:
      "We fill the gaps in the fight for transparent, secure e-voting with special projects — armed with dedicated staff and resources for long-term impact.",
    cta: "Get Involved",
    action: "get-involved",
  },
];

const categories = [
  "E-Voting",
  "Transparency",
  "Data Integrity",
  "Mobile Voting",
  "Youth Engagement",
  "Diaspora Rights",
];

const OurWorkSection = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-28 bg-vote-navy overflow-hidden">
      {/* Decorative swirl lines inspired by Demand Progress */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 1200 600" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,300 Q300,100 600,300 T1200,300" stroke="hsl(var(--vote-gold))" strokeWidth="3" fill="none" />
          <path d="M0,350 Q300,150 600,350 T1200,350" stroke="hsl(var(--vote-green))" strokeWidth="2" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        {/* Category bar */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map((cat) => (
            <span
              key={cat}
              className="text-xs font-bold uppercase tracking-widest text-vote-gold/80 border border-vote-gold/20 rounded-full px-4 py-1.5 hover:bg-vote-gold/10 transition-colors cursor-default"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Hero statement */}
        <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-4xl mx-auto mb-20 leading-tight">
          <span className="text-vote-gold">We amplify the voice of the people</span>
          <span className="text-primary-foreground"> — and wield it to make government accountable and contest electoral corruption.</span>
        </h2>

        {/* Three pillars */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="relative group p-8 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 hover:border-vote-gold/30 transition-all"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-vote-gold/10 text-vote-gold mb-5">
                <pillar.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-primary-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
                {pillar.description}
              </p>
              <Button
                onClick={() => scrollTo(pillar.action)}
                size="sm"
                className="bg-vote-gold text-vote-navy font-bold uppercase tracking-wide text-xs hover:bg-vote-gold/90"
              >
                {pillar.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWorkSection;
