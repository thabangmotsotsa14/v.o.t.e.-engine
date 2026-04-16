import { Scale, Smartphone, Shield, Users } from "lucide-react";

const frameworks = [
  {
    icon: Smartphone,
    title: "The Digital Mobile Voting Station",
    description:
      "We categorize the V.O.T.E. app as a 'mobile station' under existing Electoral Act provisions. This legal pathway transforms any smartphone into a constitutionally recognized voting booth — no new legislation required.",
    highlight: "Electoral Act Provision",
  },
  {
    icon: Shield,
    title: "Section 19 Rights: Universal Access",
    description:
      "Section 19 of the South African Constitution guarantees every citizen the right to free, fair, and regular elections. We leverage this mandate to justify mobile voting for the youth, disabled, diaspora, and disenfranchised communities.",
    highlight: "Constitutional Mandate",
  },
  {
    icon: Scale,
    title: "Compliance-as-a-Service (CaaS)",
    description:
      "V.O.T.E. operates with the audit rigor of a regulated digital service. Every vote is cryptographically sealed, every process is auditable, and every outcome is verifiable — governance by mathematical certainty.",
    highlight: "Audit Framework",
  },
  {
    icon: Users,
    title: "Consensus-as-a-Service",
    description:
      "Our distributed consensus model ensures that no single entity controls the electoral outcome. Decisions emerge from verified, transparent, collective participation — not political gatekeeping.",
    highlight: "Governance Model",
  },
];

const LegalFrameworkSection = () => {
  return (
    <section id="legal" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-vote-gold font-medium uppercase tracking-widest text-sm mb-3">
            Legal Framework
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Strategic Legal Authority
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            V.O.T.E. doesn't wait for permission — we build on the rights already enshrined in law.
            Our legal strategy turns existing legislation into the foundation for digital democracy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {frameworks.map((item) => (
            <div
              key={item.title}
              className="group bg-card rounded-xl border border-border p-8 hover:border-vote-green/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <item.icon className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-vote-gold/80 border border-vote-gold/20 rounded-full px-3 py-1">
                  {item.highlight}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LegalFrameworkSection;
