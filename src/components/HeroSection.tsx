import { Button } from "@/components/ui/button";
import { ArrowDown, Shield } from "lucide-react";
import voteLogo from "@/assets/vote-logo.png";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const scrollToPledge = () => {
    document.getElementById("pledge")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-85" />

      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <div className="animate-fade-in-up">
          <img
            src={voteLogo}
            alt="V.O.T.E. Party Logo"
            className="mx-auto h-28 w-28 md:h-36 md:w-36 animate-float mb-8"
            width={512}
            height={512}
          />
        </div>

        <h1 className="animate-fade-in-up-delay-1 font-display text-4xl md:text-6xl lg:text-7xl font-bold max-w-5xl mx-auto leading-tight">
          <span className="text-primary-foreground">V.O.T.E. Party: </span>
          <span className="text-gradient-gold">Shielding Your Voice</span>
          <span className="text-primary-foreground"> with Data Integrity.</span>
        </h1>

        <p className="animate-fade-in-up-delay-2 mt-6 text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/70 leading-relaxed">
          We aren't just a political party; we are the{" "}
          <strong className="text-primary-foreground">Virtual Organized Transparency Engine</strong>,
          pioneering e-voting and mobile voting as a fundamental, probable reality — step by step.
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
