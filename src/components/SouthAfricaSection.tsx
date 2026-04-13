import { Smartphone, Globe, Target, Users } from "lucide-react";

const SouthAfricaSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-vote-gold font-medium uppercase tracking-widest text-sm mb-3">The Future is Digital</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
              The South Africa Commitment
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Globe className="h-6 w-6 text-primary" />
                The Challenge
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                South Africa's electoral process must be modernized for the youth demographic — mobile-first citizens —
                and under-represented voters: people in unstable areas, disabled individuals, and the diaspora.
                The current system leaves millions voiceless.
              </p>

              <h3 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <Smartphone className="h-6 w-6 text-primary" />
                Mobile-First Democracy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                With over 90% smartphone penetration among South Africa's youth, mobile voting isn't just possible —
                it's inevitable. V.O.T.E. is building the infrastructure to make it secure, transparent, and compliant.
              </p>
            </div>

            <div className="bg-vote-navy rounded-xl p-8 text-center">
              <Target className="h-12 w-12 text-vote-gold mx-auto mb-4" />
              <p className="text-primary-foreground/60 text-sm uppercase tracking-widest mb-2">Our Target</p>
              <p className="font-display text-5xl md:text-6xl font-bold text-vote-gold mb-2">1M</p>
              <p className="text-primary-foreground/80 text-lg font-medium mb-1">Members by November 2026</p>
              <p className="text-primary-foreground/50 text-sm">For the local government bi-elections</p>
              <div className="mt-6 flex items-center justify-center gap-2 text-primary-foreground/40 text-sm">
                <Users className="h-4 w-4" />
                <span>Every member is a verified node</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SouthAfricaSection;
