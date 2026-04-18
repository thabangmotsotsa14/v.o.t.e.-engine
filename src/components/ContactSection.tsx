import { useState } from "react";
import { Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  full_name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(5, "Message is too short").max(1000),
});

const ContactSection = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const payload = {
      full_name: (form.elements.namedItem("full_name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: parsed.data.full_name,
      email: parsed.data.email,
      subject: parsed.data.subject ?? null,
      message: parsed.data.message,
      source: "contact_form",
    });
    setLoading(false);
    if (error) {
      toast.error("Could not send message. Please try again.");
      return;
    }
    toast.success("Message sent! We'll be in touch.");
    form.reset();
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-vote-surface">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto items-start">
          <div>
            <p className="text-vote-gold font-medium uppercase tracking-widest text-sm mb-3">Contact</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Reach Out to V.O.T.E.
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Questions, partnerships, media inquiries, or interview & podcast bookings — we read every message.
            </p>
            <div className="space-y-3">
              <a href="mailto:eugene.motsotsa@gmail.com" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <div className="bg-primary/10 rounded-lg p-2"><Mail className="h-4 w-4 text-primary" /></div>
                <span className="text-sm font-medium">eugene.motsotsa@gmail.com</span>
              </a>
              <a href="https://wa.me/27670628019" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                <div className="bg-primary/10 rounded-lg p-2"><MessageCircle className="h-4 w-4 text-primary" /></div>
                <span className="text-sm font-medium">+27 67 062 8019</span>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="c-name">Name *</Label>
                <Input id="c-name" name="full_name" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-email">Email *</Label>
                <Input id="c-email" name="email" type="email" required maxLength={255} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-subject">Subject</Label>
              <Input id="c-subject" name="subject" maxLength={200} placeholder="Booking, partnership, media…" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c-message">Message *</Label>
              <Textarea id="c-message" name="message" required maxLength={1000} rows={4} />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground font-bold">
              <Send className="mr-2 h-4 w-4" />
              {loading ? "Sending…" : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
