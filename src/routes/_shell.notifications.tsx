import { createFileRoute } from "@tanstack/react-router";
import {
  Bell,
  CalendarClock,
  ChefHat,
  CreditCard,
  MapPin,
  Settings2,
  UserRound,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatusBadge } from "@/components/manager/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notifications, type Notification } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Operational alerts for your assigned TOP SPORTS facility: booking conflicts, maintenance, coach availability, payment and café issues.",
      },
      { property: "og:title", content: "Notifications — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Informational, view-only operational alerts for facility managers.",
      },
    ],
  }),
  component: NotificationsPage,
});

const FILTERS = ["All", "Booking", "Facility", "Coach", "Payment", "Café", "System"] as const;

const icons = {
  Booking: CalendarClock,
  Facility: MapPin,
  Coach: UserRound,
  Payment: CreditCard,
  Café: ChefHat,
  System: Settings2,
} as const;

function NotificationsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<Notification | null>(null);

  const rows = useMemo(
    () => notifications.filter((n) => filter === "All" || n.category === filter),
    [filter],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        description="Operational alerts for your facility. These are informational — Admin performs any required action."
      />

      <Card>
        <CardContent className="space-y-4 pt-6">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as (typeof FILTERS)[number])}>
            <TabsList className="flex w-full flex-wrap justify-start">
              {FILTERS.map((f) => (
                <TabsTrigger key={f} value={f}>{f}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <ul className="divide-y divide-border rounded-md border border-border">
            {rows.map((n) => {
              const Icon = icons[n.category];
              return (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => setActive(n)}
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-accent/50",
                      !n.read && "bg-brand/4",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 rounded-md p-2",
                        n.severity === "Critical"
                          ? "bg-destructive/10 text-destructive"
                          : n.severity === "Important"
                            ? "bg-warning/20 text-warning-foreground"
                            : "bg-info/10 text-info",
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold">{n.title}</span>
                        <StatusBadge status={n.severity} dot={false} />
                        {!n.read && <span className="size-1.5 rounded-full bg-brand" />}
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted-foreground">
                        {n.detail}
                      </span>
                    </span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">{n.time}</span>
                  </button>
                </li>
              );
            })}
            {rows.length === 0 && (
              <li className="flex flex-col items-center gap-2 px-4 py-14 text-center">
                <Bell className="size-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No notifications in this category.</p>
              </li>
            )}
          </ul>

          <AdminNote>
            Notifications are informational only. Please contact Admin for changes.
          </AdminNote>
        </CardContent>
      </Card>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.title}</SheetTitle>
                <SheetDescription>
                  {active.category} · {active.time}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.severity} />
                <p className="rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed">
                  {active.detail}
                </p>
                <AdminNote>
                  Please contact Admin for changes. Managers cannot resolve, reschedule or
                  approve from this screen.
                </AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
