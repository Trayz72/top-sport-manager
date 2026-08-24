import { cn } from "@/lib/utils";

export function TopSportsMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-brand font-display text-[15px] font-extrabold tracking-tight text-brand-foreground",
        className,
      )}
      aria-hidden
    >
      TS
    </span>
  );
}

export function TopSportsWordmark({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <TopSportsMark />
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-sm font-extrabold tracking-[0.14em]",
            tone === "light" ? "text-sidebar-accent-foreground" : "text-foreground",
          )}
        >
          TOP SPORTS
        </span>
        <span
          className={cn(
            "block text-[10px] font-semibold tracking-[0.22em] uppercase",
            tone === "light" ? "text-sidebar-foreground/60" : "text-muted-foreground",
          )}
        >
          Manager
        </span>
      </span>
    </span>
  );
}
