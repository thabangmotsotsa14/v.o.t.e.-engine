import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import LiveCounter from "@/components/LiveCounter";
import ManifestoSection from "@/components/ManifestoSection";
import SouthAfricaSection from "@/components/SouthAfricaSection";
import PledgeForm from "@/components/PledgeForm";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <LiveCounter />
      <ManifestoSection />
      <SouthAfricaSection />
      <PledgeForm />
      <GetInvolvedSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
