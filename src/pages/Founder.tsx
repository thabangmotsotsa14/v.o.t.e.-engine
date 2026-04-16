import { ArrowLeft, Youtube, Linkedin, Globe, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import voteLogo from "@/assets/vote-logo-new.png";
import founderPhoto from "@/assets/founder-photo.png";

const experiences = [
  { role: "AMASA Council Member", org: "Membership Portfolio", period: "Feb 2025 – Present" },
  { role: "Club of Rome Researcher", org: "Communications Network", period: "Sep – Nov 2025" },
  { role: "Strategist → Data QA Analyst", org: "Clockwork", period: "2021 – 2024 (3 years)" },
  { role: "UX Designer & Consultant", org: "JCSE (Wits / Accenture)", period: "2017" },
];

const education = [
  "Vega School — Media Management & Brand Building",
  "Red & Yellow — Digital Communication & Media",
  "UNISA — Entrepreneurship & Business Development",
  "ICM UK — Diploma in International Trade",
  "Diploma in Applied Psychology — Consumer Behavior",
  "JSE Registered Trader",
];

const Founder = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <img src={voteLogo} alt="V.O.T.E." className="h-10 w-10" />
            <span className="font-display font-bold text-lg text-foreground">V.O.T.E.</span>
          </Link>
          <Link to="/">
            <Button variant="ghost" size="sm"><ArrowLeft className="mr-2 h-4 w-4" />Back to Home</Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-16">
        <div className="bg-gradient-hero min-h-[60vh] flex items-end">
          <div className="container mx-auto px-4 lg:px-8 pb-12 pt-20 flex flex-col md:flex-row items-end gap-8">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-accent shadow-2xl flex-shrink-0">
              <img src={founderPhoto} alt="Thabang Motsotsa" className="w-full h-full object-cover object-top" />
            </div>
            <div className="text-primary-foreground pb-2">
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Founder & Visionary</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Thabang Motsotsa
              </h1>
              <p className="text-primary-foreground/70 text-lg mt-2 max-w-xl">
                AMASA Council Member · Club of Rome Contributor · Strategist in Digital Communications & AI
              </p>
              <div className="flex gap-3 mt-4">
                <a href="https://www.youtube.com/@leorizen99" target="_blank" rel="noopener noreferrer"
                  className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full p-2 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
                <a href="https://www.linkedin.com/in/thabang-motsotsa-544a6514a" target="_blank" rel="noopener noreferrer"
                  className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full p-2 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="mailto:eugene.motsotsa@gmail.com"
                  className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full p-2 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <a href="https://vote.org.za/thabangmotsotsa" target="_blank" rel="noopener noreferrer"
                  className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full p-2 transition-colors">
                  <Globe className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            A New Vision for <span className="text-gradient-gold">Auditable Democracy</span>
          </h2>
          <div className="prose prose-lg text-muted-foreground space-y-4">
            <p>
              Thabang Eugene Motsotsa is a professional with a diverse background in finance, advertising, and marketing. 
              As the founder of the V.O.T.E. Party, he brings his strategic acumen to the most important challenge of our time: 
              making democracy transparent, auditable, and accessible to every South African.
            </p>
            <p>
              From a career spanning Clockwork, Standard Bank, Vodacom, and Sasol, he has built a reputation for 
              translating complex research into practical, impactful strategies. Now, he's applying those same 
              principles to governance — building a Virtual Organized Transparency Engine that replaces trust in 
              individuals with verification through systems.
            </p>
            <p>
              Selected for the <strong>Club of Rome Communications Network</strong>, Thabang applies insights to 
              global challenges including sustainable action and scientific research. As a published author of 
              <em>"There's Privilege In Underprivileged: Perception Is Everything"</em> and 
              <em>"The Development Of South Africa's Education Decorum"</em>, he brings a deep understanding 
              of societal dynamics to his vision for V.O.T.E.
            </p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-24 bg-vote-surface">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Experience & Qualifications</h2>
          <div className="grid gap-4">
            {experiences.map((exp, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="font-display font-bold text-foreground">{exp.role}</h3>
                  <p className="text-muted-foreground text-sm">{exp.org}</p>
                </div>
                <span className="text-sm text-accent font-mono font-bold whitespace-nowrap">{exp.period}</span>
              </div>
            ))}
          </div>

          <h3 className="font-display text-xl font-bold text-foreground mt-12 mb-4">Education & Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {education.map((edu, i) => (
              <span key={i} className="bg-card border border-border rounded-full px-4 py-2 text-sm text-muted-foreground">
                {edu}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Breakdown */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            The V.O.T.E. Engine: <span className="text-gradient-green">Our Vision for Secure E-Voting</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Cryptographic Voter Verification", desc: "Voter introduces voter verification cryptographic where verified for prior authentication information." },
              { title: "Immutable Ledger of Votes", desc: "Immutable ledger of stamped to recall immutability of voter cast an auditable vote." },
              { title: "Mobile-First Accessibility", desc: "Mobile-first compact accessibility, airwave/4G access and digital marketing commitments." },
              { title: "Public Open-Source Auditability", desc: "Every South African with a registered mobile device can cast an auditable vote." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-6">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <span className="text-primary font-bold">{i + 1}</span>
                </div>
                <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Secure, Transparent, Auditable Voting for South Africa
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Join the movement. Pledge to the manifesto. Start a voting session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-gold text-accent-foreground font-display font-bold text-lg px-8">
                PLEDGE TO THE MANIFESTO
              </Button>
            </Link>
            <a href="https://voteparty.vercel.app" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground font-bold">
                <ExternalLink className="mr-2 h-4 w-4" />START VOTING SESSION
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} V.O.T.E. Party — Virtual Organized Transparency Engine · Consensus-as-a-Service
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Founder;
