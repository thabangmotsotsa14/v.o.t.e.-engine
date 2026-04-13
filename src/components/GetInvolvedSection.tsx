import { Share2, Megaphone, HandHeart, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const actions = [
  {
    icon: Share2,
    title: "Spread the Word",
    description: "Share V.O.T.E. with your community. Every share brings us closer to 1 million.",
  },
  {
    icon: Megaphone,
    title: "Amplify on Socials",
    description: "Use our media kits and share with the South African Podcasting Association network.",
  },
  {
    icon: HandHeart,
    title: "Volunteer",
    description: "Become a digital ambassador in your province. Help onboard citizens to the future.",
  },
  {
    icon: BookOpen,
    title: "Educate",
    description: "Host conversations about e-voting, data integrity, and why transparent governance matters.",
  },
];

const GetInvolvedSection = () => {
  return (
    <section id="get-involved" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-vote-gold font-medium uppercase tracking-widest text-sm mb-3">Get Involved</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Be Part of the Movement
          </h2>
          <p className="text-muted-foreground text-lg">
            Democracy is not a spectator sport. Here's how you can help V.O.T.E. reach 1 million members.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {actions.map((action) => (
            <div
              key={action.title}
              className="text-center p-6 rounded-lg border border-border bg-card hover:border-vote-green/30 hover:shadow-md transition-all"
            >
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-4">
                <action.icon className="h-7 w-7" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{action.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{action.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => document.getElementById("pledge")?.scrollIntoView({ behavior: "smooth" })}
            size="lg"
            className="bg-gradient-gold text-accent-foreground font-display font-bold px-8"
          >
            JOIN & PLEDGE NOW
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
