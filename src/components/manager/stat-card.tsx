import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  tone = "default",
  className,
}: {
  label: string;
  value: string;
  hint?: string;
  icon?: LucideIcon;
  tone?: "default" | "brand" | "success" | "warning" | "danger";
  className?: string;
}) {
  const accent = {
    default: "text-primary bg-primary/8",
    brand: "text-brand bg-brand/10",
    success: "text-success bg-success/10",
    warning: "text-warning-foreground bg-warning/20",
    danger: "text-destructive bg-destructive/10",
  }[tone];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card p-4 shadow-card transition-shadow hover:shadow-raised",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="label-caps">{label}</span>
        {Icon && (
          <span className={cn("rounded-md p-1.5", accent)}>
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <div className="mt-3 font-display text-[26px] leading-none font-bold numeric text-foreground">
        {value}
      </div>
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
