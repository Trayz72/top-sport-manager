import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useState } from "react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatusBadge } from "@/components/manager/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { bookings, coaches, type Coach } from "@/lib/demo-data";

export const Route = createFileRoute("/_shell/coaches")({
  head: () => ({
    meta: [
      { title: "Coaches — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Monitor coaches assigned to your TOP SPORTS facility: sports, services, today's sessions, shifts and utilisation.",
      },
      { property: "og:title", content: "Coaches — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "View-only coach roster and session activity for facility operations.",
      },
    ],
  }),
  component: CoachesPage,
});

function CoachesPage() {
  const [active, setActive] = useState<Coach | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Coaches"
        description="Coaches operating at your assigned facility, their services and session load."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {coaches.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c)}
            className="rounded-lg border border-border bg-card p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-raised"
          >
            <div className="flex items-start justify-between">
              <Avatar className="size-11">
                <AvatarFallback className="bg-primary text-sm font-semibold text-primary-foreground">
                  {c.initials}
                </AvatarFallback>
              </Avatar>
              <StatusBadge status={c.availability} />
            </div>
            <p className="mt-3 font-display text-base font-bold">{c.name}</p>
            <p className="text-xs text-muted-foreground">{c.sport}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="label-caps">Today</p>
                <p className="numeric mt-0.5 text-lg font-bold">{c.todaySessions}</p>
              </div>
              <div>
                <p className="label-caps">Upcoming</p>
                <p className="numeric mt-0.5 text-lg font-bold">{c.upcomingSessions}</p>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Utilisation</span>
                <span className="numeric font-semibold text-foreground">{c.utilization}%</span>
              </div>
              <Progress value={c.utilization} className="mt-1.5 h-1.5" />
            </div>
            <p className="mt-3 flex items-center gap-1 text-[11px] text-muted-foreground">
              <Star className="size-3 fill-warning text-warning" /> {c.rating} · {c.experience} experience
            </p>
          </button>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <AdminNote>
            Coach profiles, rates and availability are managed by Admin. This view is
            monitoring-only.
          </AdminNote>
        </CardContent>
      </Card>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.name}</SheetTitle>
                <SheetDescription>
                  {active.sport} · {active.shift}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.availability} />
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Today's sessions", String(active.todaySessions)],
                    ["Upcoming sessions", String(active.upcomingSessions)],
                    ["Shift", active.shift],
                    ["Experience", active.experience],
                    ["Member rating", `${active.rating} / 5`],
                    ["Utilisation", `${active.utilization}%`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div>
                  <p className="label-caps mb-2">Services delivered</p>
                  <div className="flex flex-wrap gap-2">
                    {active.services.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="label-caps mb-2">Sessions at this facility</p>
                  <ul className="space-y-2">
                    {bookings
                      .filter((b) => b.coach === active.name)
                      .map((b) => (
                        <li
                          key={b.id}
                          className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2 text-xs"
                        >
                          <span className="numeric font-medium">
                            {b.date} · {b.time}
                          </span>
                          <span className="flex-1 truncate text-muted-foreground">
                            {b.member} · {b.facility}
                          </span>
                          <StatusBadge status={b.status} dot={false} />
                        </li>
                      ))}
                  </ul>
                </div>

                <AdminNote>Coach details are updated by Admin only.</AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
