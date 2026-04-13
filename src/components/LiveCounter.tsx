import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const TARGET = 1_000_000;

const LiveCounter = () => {
  const [count, setCount] = useState(0);
  const [dbCount, setDbCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { count, error } = await supabase
        .from("pledges")
        .select("*", { count: "exact", head: true });
      if (!error && count !== null) setDbCount(count);
    };
    fetchCount();

    // Subscribe to real-time inserts
    const channel = supabase
      .channel("pledges-count")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "pledges" }, () => {
        setDbCount((prev) => prev + 1);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
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
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <Users className="h-8 w-8 text-vote-gold" />
          <div className="text-center md:text-left">
            <p className="text-primary-foreground/60 text-sm font-medium uppercase tracking-widest">
              Total V.O.T.E. Pledges Nationwide
            </p>
            <div className="flex items-baseline gap-3 justify-center md:justify-start">
              <span className="font-display text-4xl md:text-5xl font-bold text-vote-gold tabular-nums">
                {count.toLocaleString()}
              </span>
              <span className="text-primary-foreground/40 text-lg">/ 1,000,000</span>
            </div>
          </div>
          <div className="w-full md:w-64 h-3 rounded-full bg-primary-foreground/10 overflow-hidden">
            <div
              className="h-full bg-gradient-gold rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(percentage, 0.1)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveCounter;
