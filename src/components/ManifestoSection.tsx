import { Shield, Eye, Database, FileCheck } from "lucide-react";

const pillars = [
  {
    icon: Eye,
    title: "Transparency as Infrastructure",
    description: "It's not just policy; it's an Engine built on verifiable cryptographic proofs. Every action, every decision — auditable by design.",
  },
  {
    icon: Shield,
    title: "Accountability via Technology",
    description: "Removing human bias and negligence from the electoral chain through automated, secure digital systems.",
  },
  {
    icon: Database,
    title: "Data Integrity",
    description: "A commitment to absolute, verifiable vote immutability. Your voice, preserved forever, tamper-proof.",
  },
  {
    icon: FileCheck,
    title: "Compliance-as-a-Service",
    description: "Running the party and its governance with the rigorous audit standards of a regulated digital service.",
  },
];

const ManifestoSection = () => {
  return (
    <section id="manifesto" className="py-20 md:py-28 bg-vote-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-vote-gold font-medium uppercase tracking-widest text-sm mb-3">The V.O.T.E. Manifesto</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            The Vanguard of Digital Democracy
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our mission: to make secure e-voting and mobile voting <strong>probable</strong> in South Africa first,
            ensuring every citizen becomes an audited node in the democracy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group bg-card rounded-lg border border-border p-8 hover:border-vote-green/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <pillar.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
