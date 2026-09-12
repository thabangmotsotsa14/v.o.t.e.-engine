import { ArrowLeft, Youtube, Linkedin, Instagram, Mail, ExternalLink, Award, Play, Mic, Building2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import voteLogo from "@/assets/vote-logo-new.png";
import founderPhoto from "@/assets/founder-photo.png";
import ContactSection from "@/components/ContactSection";
import { openExternal } from "@/lib/openExternal";

const experiences = [
  { role: "AMASA Council Member", org: "Membership Portfolio", period: "Feb 2025 – Present" },
  { role: "Strategist → Data QA Analyst", org: "Clockwork", period: "2021 – 2024" },
  { role: "UX Designer & Consultant", org: "JCSE (Wits / Accenture)", period: "2017" },
];

const credentials = [
  "User Experience Design — Johannesburg Centre for Software Engineering (JCSE)",
  "Regulations & Ethics of Financial Markets — South Africa Institute of Financial Markets (SAIFM)",
  "Vega School — Media Management & Brand Building",
  "Red & Yellow — Digital Communication & Media",
  "UNISA — Entrepreneurship & Business Development",
  "ICM UK — Diploma in International Trade",
  "Diploma in Applied Psychology — Consumer Behaviour",
  "JSE Registered Trader",
  "University of Johannesburg — AI in 4IR Certificate",
  "SAUSAC & YALI Alumni",
];

const recognition = [
  {
    label: "Recognized by US Embassy SA",
    icon: Award,
    href: "https://www.instagram.com/p/C6oMQoex0TH/",
  },
  {
    label: "AMASA Council Member (Membership Portfolio)",
    icon: Building2,
    href: "https://www.amasa.org/team/thabang-motsotsa/",
  },
];

const speakingEngagements = [
  {
    org: "Apolitical Academy",
    topic: "Civic technology & participatory governance",
    icon: GraduationCap,
    accent: "bg-primary/10 text-primary",
  },
  {
    org: "Johannesburg Stock Exchange (JSE)",
    topic: "Independent Trading Platforms",
    icon: Building2,
    accent: "bg-vote-gold/10 text-vote-gold",
  },
  {
    org: "AMASA",
    topic: "Media, advertising & data integrity",
    icon: Mic,
    accent: "bg-vote-green-light/10 text-vote-green-light",
  },
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
              <img src={founderPhoto} alt="Thabang Eugene Motsotsa" className="w-full h-full object-cover object-top" />
            </div>
            <div className="text-primary-foreground pb-2">
              <p className="text-accent font-bold text-sm uppercase tracking-widest mb-2">Founder & Visionary</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Thabang Eugene Motsotsa
              </h1>
              <p className="text-primary-foreground/70 text-sm font-medium mt-1">a.k.a. Leo Rizen</p>
              <p className="text-primary-foreground/70 text-base mt-3 max-w-xl">
                Join me in building first ever online political party, V.O.T.E Party a Consensus-as-a-Service (CaaS) transparency engine pioneering mobile voting in South Africa. Help us reach 1 million members by November 2026 by pledging with your name or donation.
              </p>
              <div className="flex flex-wrap gap-3 mt-5 items-center">
                <button type="button" onClick={() => openExternal("https://www.youtube.com/@leorizen99", "YouTube")}
                  aria-label="YouTube"
                  className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full p-2 transition-colors">
                  <Youtube className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => openExternal("https://www.linkedin.com/in/thabang-motsotsa-544a6514a", "LinkedIn")}
                  aria-label="LinkedIn"
                  className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full p-2 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </button>
                <a href="mailto:eugene.motsotsa@gmail.com" aria-label="Email"
                  className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full p-2 transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
                <button type="button" onClick={() => openExternal("https://www.instagram.com/who_is_scotfree", "Instagram")}
                  aria-label="Instagram"
                  className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full p-2 transition-colors">
                  <Instagram className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => openExternal("https://x.com/leorizenlive", "X (Twitter)")}
                  aria-label="X (Twitter)"
                  className="bg-accent/20 hover:bg-accent/30 text-accent rounded-full p-2 transition-colors">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/>
                  </svg>
                </button>
                <button type="button" onClick={() => openExternal("https://www.amasa.org/team/thabang-motsotsa/", "AMASA profile")}
                  aria-label="AMASA profile"
                  className="flex items-center gap-2 bg-accent/20 hover:bg-accent/30 text-accent rounded-full px-3 py-2 transition-colors text-xs font-bold">
                  <Building2 className="h-4 w-4" />
                  AMASA
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recognition strip */}
      <section className="py-8 bg-vote-surface border-y border-border">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl flex flex-wrap items-center justify-center gap-4">
          {recognition.map((r) => {
            const Icon = r.icon;
            return (
              <button
                type="button"
                key={r.label}
                onClick={() => openExternal(r.href, r.label)}
                className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 hover:border-vote-gold hover:bg-vote-gold/5 transition-colors"
              >
                <Icon className="h-4 w-4 text-vote-gold" />
                <span className="text-sm font-bold text-foreground">{r.label}</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </button>
            );
          })}
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
              As the founder of the V.O.T.E. Party, he brings strategic acumen to the most important challenge of our time:
              making democracy transparent, auditable, and accessible to every South African.
            </p>
            <p>
              From a career spanning Clockwork, Standard Bank, Vodacom, and Sasol, he has built a reputation for
              translating complex research into practical, impactful strategies. Now, he's applying those same
              principles to governance — building a Virtual Organized Transparency Engine that replaces trust in
              individuals with verification through systems.
            </p>
            <p>
              As a published author of <em>"There's Privilege In Underprivileged: Perception Is Everything"</em> and
              <em> "The Development Of South Africa's Education Decorum"</em>, Thabang brings deep understanding
              of societal dynamics to his vision for V.O.T.E.
            </p>
          </div>
        </div>
      </section>

      {/* Speaking engagements / video placeholders */}
      <section className="py-16 md:py-24 bg-vote-surface">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="text-center mb-10">
            <Play className="h-8 w-8 text-vote-gold mx-auto mb-3" />
            <h2 className="font-display text-3xl font-bold text-foreground">Speaking & Media</h2>
            <p className="text-muted-foreground mt-2">Selected engagements on civic tech, finance, and media integrity.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                src: "/videos/founder-speaking-1.mp4",
                org: "Speaking Engagement",
                topic: "On civic technology, transparency, and participatory governance.",
                accent: "bg-primary/10 text-primary",
                Icon: Mic,
              },
              {
                src: "/videos/clockwork-values.mp4",
                org: "Clockwork — Values in Practice",
                topic: "Strategy, data integrity, and culture from years at Clockwork.",
                accent: "bg-vote-gold/10 text-vote-gold",
                Icon: Building2,
              },
            ].map((v) => {
              const Icon = v.Icon;
              return (
                <div key={v.src} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="aspect-video bg-vote-navy">
                    <video
                      src={v.src}
                      controls
                      preload="metadata"
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold mb-2 ${v.accent}`}>
                      <Icon className="h-3 w-3" />
                      {v.org}
                    </div>
                    <p className="text-sm text-muted-foreground">{v.topic}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {speakingEngagements.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.org} className="bg-card border border-border rounded-xl p-5">
                  <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold mb-2 ${s.accent}`}>
                    <Icon className="h-3 w-3" />
                    {s.org}
                  </div>
                  <p className="text-sm text-muted-foreground">{s.topic}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => openExternal("https://www.youtube.com/@leorizen99", "YouTube channel")}
            >
              <Youtube className="mr-2 h-4 w-4" /> Watch full library on YouTube
            </Button>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">Experience</h2>
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

          <h3 className="font-display text-xl font-bold text-foreground mt-12 mb-4">Credentials & Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {credentials.map((edu, i) => (
              <span key={i} className="bg-card border border-border rounded-full px-4 py-2 text-sm text-muted-foreground">
                {edu}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Bookings, partnerships & media — moved from home */}
      <ContactSection />

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Secure, Transparent, Auditable Voting for South Africa
          </h2>
          <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
            Join the movement. Pledge your support. Start a voting session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/#pledge">
              <Button size="lg" className="bg-gradient-gold text-accent-foreground font-display font-bold text-lg px-8">
                PLEDGE YOUR SUPPORT
              </Button>
            </Link>
            <a href="https://voteparty.vercel.app" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground font-bold">
                <ExternalLink className="mr-2 h-4 w-4" />START A VOTING PARTY
              </Button>
            </a>
          </div>
        </div>
      </section>

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
