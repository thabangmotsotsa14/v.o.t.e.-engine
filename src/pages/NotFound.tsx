import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex min-h-screen items-center justify-center px-4 pt-16">
        <div className="text-center">
          <h1 className="mb-4 font-display text-5xl font-bold text-foreground">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">That page doesn't exist.</p>
          <Button asChild className="bg-gradient-gold font-bold text-accent-foreground">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
