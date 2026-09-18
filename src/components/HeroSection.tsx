import { Button } from "@/components/ui/button";
import { ArrowDown, Shield } from "lucide-react";

const HeroSection = () => {
  const scrollToPledge = () => {
    document.getElementById("pledge")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/logo.png"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-hero opacity-85" />

      <div className="relative z-10 container mx-auto px-4 text-center pt-28">
        <h1 className="animate-fade-in-up font-display text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl mx-auto leading-tight">
          <span className="text-primary-foreground">Power is a </span>
          <span className="text-gradient-gold">Function</span>
          <span className="text-primary-foreground"> of Transparency.</span>
        </h1>

        <p className="animate-fade-in-up-delay-2 mt-6 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/70 leading-relaxed">
          The <strong className="text-primary-foreground">Virtual Organized Transparency Engine</strong> — 
          pioneering <strong className="text-vote-gold">Consensus-as-a-Service</strong> governance. 
          We are moving away from trusting individuals and toward verifying systems.
        </p>

        <div className="animate-fade-in-up-delay-3 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={scrollToPledge}
            size="lg"
            className="bg-gradient-gold text-accent-foreground font-display font-bold text-lg px-8 py-6 hover:opacity-90 transition-opacity shadow-lg"
          >
            <Shield className="mr-2 h-5 w-5" />
            PLEDGE TO THE MANIFESTO
          </Button>
        </div>

        <div className="animate-fade-in-up-delay-3 mt-16">
          <button
            onClick={scrollToPledge}
            className="text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
          >
            <ArrowDown className="h-6 w-6 animate-bounce mx-auto" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
