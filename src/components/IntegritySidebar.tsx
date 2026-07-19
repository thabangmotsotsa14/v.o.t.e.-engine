import { useState } from "react";
import { Shield, AlertTriangle, Flag, X } from "lucide-react";
import { cn } from "@/lib/utils";

const IntegritySidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating trigger - always visible bottom-right */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open integrity reporting tools"
        className={cn(
          "fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full px-4 py-3 shadow-2xl transition-all",
          "bg-destructive text-destructive-foreground hover:scale-105",
          open && "rotate-90"
        )}
      >
        {open ? <X className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
        {!open && <span className="hidden sm:inline font-bold text-sm">Report</span>}
      </button>

      {/* Drawer */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-40 w-[calc(100vw-3rem)] sm:w-80 bg-card border border-border rounded-xl shadow-2xl transition-all origin-bottom-right",
          open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
        )}
      >
        <div className="p-4 border-b border-border">
          <h3 className="font-display font-bold text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-destructive" />
            Civic Integrity Tools
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Report electoral fraud or digital harms instantly.</p>
        </div>
        <div className="p-3 space-y-2">
          <a
            href="https://www.elections.org.za/pw/About-Us/Electoral-Offences"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
          >
            <div className="bg-destructive/10 rounded-lg p-2 flex-shrink-0">
              <Flag className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-destructive">Report Electoral Fraud</p>
              <p className="text-xs text-muted-foreground">IEC Directorate for Electoral Offences</p>
            </div>
          </a>
          <a
            href="https://www.real411.org/complaints/add"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
          >
            <div className="bg-accent/20 rounded-lg p-2 flex-shrink-0">
              <AlertTriangle className="h-4 w-4 text-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-accent-foreground">Real411 Digital Harms</p>
              <p className="text-xs text-muted-foreground">Disinformation, hate speech, harassment</p>
            </div>
          </a>
          <a
            href="https://www.elections.org.za/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors group"
          >
            <div className="bg-primary/10 rounded-lg p-2 flex-shrink-0">
              <Shield className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground group-hover:text-primary">IEC Official Portal</p>
              <p className="text-xs text-muted-foreground">Voter registration & official resources</p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default IntegritySidebar;
