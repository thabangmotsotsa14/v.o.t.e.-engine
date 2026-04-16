import CountdownBar from "@/components/CountdownBar";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import OurWorkSection from "@/components/OurWorkSection";
import LiveCounter from "@/components/LiveCounter";
import ManifestoSection from "@/components/ManifestoSection";
import LegalFrameworkSection from "@/components/LegalFrameworkSection";
import SouthAfricaSection from "@/components/SouthAfricaSection";
import PledgeForm from "@/components/PledgeForm";
import JoinFightSection from "@/components/JoinFightSection";
import GetInvolvedSection from "@/components/GetInvolvedSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <CountdownBar />
      <Navigation />
      <HeroSection />
      <OurWorkSection />
      <LiveCounter />
      <ManifestoSection />
      <LegalFrameworkSection />
      <SouthAfricaSection />
      <PledgeForm />
      <JoinFightSection />
      <GetInvolvedSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
