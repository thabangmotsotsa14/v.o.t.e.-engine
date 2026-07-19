import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const TARGET = 1_000_000;
const DEADLINE = new Date("2026-11-01T00:00:00Z");

const CountdownBar = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const { data, error } = await supabase.rpc("get_pledge_count");
      if (!error && data !== null) setCount(Number(data));
    };
    fetchCount();

    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  const now = new Date();
  const totalMs = DEADLINE.getTime() - new Date("2025-01-01").getTime();
  const elapsedMs = now.getTime() - new Date("2025-01-01").getTime();
  const daysLeft = Math.max(0, Math.ceil((DEADLINE.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const percentage = Math.min((count / TARGET) * 100, 100);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-vote-navy/95 backdrop-blur-sm border-b border-vote-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-8 text-xs">
          <span className="text-primary-foreground/60 font-medium hidden sm:block">
            🎯 Goal: <span className="text-vote-gold font-bold">1,000,000</span> members by Nov 2026
          </span>
          <div className="flex items-center gap-3 flex-1 sm:flex-none sm:w-auto justify-center sm:justify-end">
            <div className="w-32 h-1.5 rounded-full bg-primary-foreground/10 overflow-hidden">
              <div
                className="h-full bg-gradient-gold rounded-full transition-all duration-1000"
                style={{ width: `${Math.max(percentage, 0.5)}%` }}
              />
            </div>
            <span className="text-vote-gold font-bold tabular-nums">{count.toLocaleString()}</span>
            <span className="text-primary-foreground/40">|</span>
            <span className="text-primary-foreground/60">
              <span className="text-vote-gold font-bold">{daysLeft}</span> days left
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownBar;
