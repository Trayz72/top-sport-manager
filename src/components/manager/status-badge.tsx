import { cn } from "@/lib/utils";

type Tone = "success" | "warning" | "danger" | "info" | "neutral" | "brand";

const toneMap: Record<string, Tone> = {
  // booking / session
  Confirmed: "info",
  "In progress": "brand",
  Completed: "success",
  Pending: "warning",
  Cancelled: "neutral",
  "No-show": "danger",
  // facility
  Available: "success",
  Occupied: "brand",
  Maintenance: "warning",
  // payments
  Paid: "success",
  Failed: "danger",
  Refunded: "neutral",
  Online: "info",
  Cash: "neutral",
  // café
  Preparing: "brand",
  // coach
  "On duty": "success",
  "Off duty": "neutral",
  "On leave": "warning",
  // services / members
  Active: "success",
  Inactive: "neutral",
  Paused: "warning",
  "Fully booked": "danger",
  Limited: "warning",
  // attendance
  "Checked in": "brand",
  Attended: "success",
  "Not checked in": "warning",
  // memberships
  "Expiring soon": "warning",
  Expired: "neutral",
  // resources
  Reserved: "info",
  Unavailable: "danger",
  // events
  Upcoming: "info",
  "Registrations open": "success",
  // announcements / activity
  Published: "success",
  Rescheduled: "info",
  Updated: "info",
  Reported: "warning",
  Found: "info",
  Claimed: "success",
  Resolved: "success",
  // merchandise
  "In stock": "success",
  "Low stock": "warning",
  "Out of stock": "danger",
  // notifications
  Critical: "danger",
  Important: "warning",
  Info: "info",
};

const toneClass: Record<Tone, string> = {
  success: "bg-success/10 text-success border-success/25",
  warning: "bg-warning/15 text-warning-foreground border-warning/40",
  danger: "bg-destructive/10 text-destructive border-destructive/25",
  info: "bg-info/10 text-info border-info/25",
  brand: "bg-brand/12 text-brand border-brand/30",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({
  status,
  dot = true,
  className,
}: {
  status: string;
  dot?: boolean;
  className?: string;
}) {
  const tone = toneMap[status] ?? "neutral";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap",
        toneClass[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {status}
    </span>
  );
}
