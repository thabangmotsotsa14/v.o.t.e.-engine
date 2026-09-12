import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TARGET = 1_000_000;

const LiveCounter = () => {
  const [count, setCount] = useState(0);
  const [dbCount, setDbCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { data, error } = await supabase.rpc("get_pledge_count");
      if (!error && data !== null) setDbCount(Number(data));
    };
    fetchCount();

    // Poll every 30s (realtime removed to avoid broadcasting personal data)
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (dbCount === 0) return;
    let frame: number;
    const duration = 2000;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * dbCount));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [dbCount]);

  const percentage = (count / TARGET) * 100;

  return (
    <section className="py-12 bg-vote-navy">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 bg-primary-foreground/5 rounded-xl p-5 border border-primary-foreground/10">
            <Users className="h-8 w-8 text-vote-gold shrink-0" />
            <div className="flex-1">
              <p className="text-primary-foreground/60 text-xs font-medium uppercase tracking-widest">
                Total V.O.T.E. Pledges
              </p>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl md:text-4xl font-bold text-vote-gold tabular-nums">
                  {count.toLocaleString()}
                </span>
                <span className="text-primary-foreground/40 text-sm">/ 1,000,000</span>
              </div>
              <div className="w-full h-1.5 mt-2 rounded-full bg-primary-foreground/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-gold rounded-full transition-all duration-1000"
                  style={{ width: `${Math.max(percentage, 0.1)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveCounter;
