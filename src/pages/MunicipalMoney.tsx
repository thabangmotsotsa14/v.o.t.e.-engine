import { Landmark } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import MunicipalVsNationalDashboard from "@/components/MunicipalVsNationalDashboard";

const MunicipalMoney = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <main className="pt-24 pb-20">
      <div className="container mx-auto px-4 lg:px-8">
        <header className="mb-8 max-w-3xl">
          <Badge variant="outline" className="mb-4 border-primary/40 text-primary"><Landmark className="mr-1.5 h-3.5 w-3.5" />Municipal Money</Badge>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Municipal Financial Insights</h1>
          <p className="mt-3 text-muted-foreground">Track metro finances against national Stats SA benchmarks, compare municipalities, follow live releases and rate your local services.</p>
        </header>
        <MunicipalVsNationalDashboard />
        <p className="mt-10 text-xs text-muted-foreground">
          Sources: <a href="https://municipalmoney.gov.za/" target="_blank" rel="noopener noreferrer" className="underline">National Treasury Municipal Money</a> · <a href="https://www.statssa.gov.za/" target="_blank" rel="noopener noreferrer" className="underline">Statistics South Africa</a>
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default MunicipalMoney;
