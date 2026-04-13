import { Mail, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 bg-vote-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-vote-gold font-medium uppercase tracking-widest text-sm mb-3">Contact</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Reach Out to V.O.T.E.
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Have questions about the movement, partnerships, or media inquiries? Get in touch.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.open("mailto:eugene.motsotsa@gmail.com", "_blank")}
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-medium"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </Button>
            <Button
              onClick={() => window.open("https://wa.me/27670628019", "_blank")}
              size="lg"
              className="bg-primary text-primary-foreground font-medium"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
