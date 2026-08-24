import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatusBadge } from "@/components/manager/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courts, scheduleDay, weekLoad, type ScheduleEvent } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_shell/schedule")({
  head: () => ({
    meta: [
      { title: "Facility Schedule — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Day and week schedule grid showing court occupancy, sessions, coaches and maintenance windows at your assigned facility.",
      },
      { property: "og:title", content: "Facility Schedule — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Read-only day and week scheduling view for facility operations monitoring.",
      },
    ],
  }),
  component: SchedulePage,
});

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6:00 – 22:00

const eventTone: Record<string, string> = {
  Confirmed: "bg-info/12 border-info/40 text-info",
  "In progress": "bg-brand/12 border-brand/45 text-brand",
  Completed: "bg-success/10 border-success/35 text-success",
  "No-show": "bg-destructive/10 border-destructive/35 text-destructive",
  Cancelled: "bg-muted border-border text-muted-foreground",
  Maintenance: "bg-warning/18 border-warning/45 text-warning-foreground",
};

function SchedulePage() {
  const [view, setView] = useState<"day" | "week">("day");
  const [active, setActive] = useState<ScheduleEvent | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Schedule"
        description="Central facility schedule — spot busy courts, free slots, coach load and maintenance blocks at a glance."
      >
        <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week")}>
          <TabsList>
            <TabsTrigger value="day">Day view</TabsTrigger>
            <TabsTrigger value="week">Week view</TabsTrigger>
          </TabsList>
        </Tabs>
      </PageHeader>

      {view === "day" ? (
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="size-4 text-brand" /> Sunday, 23 August 2026
              </CardTitle>
              <CardDescription>06:00 – 23:00 · all courts</CardDescription>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="size-4" />
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="grid grid-cols-[110px_repeat(17,minmax(58px,1fr))] border-b border-border pb-2 text-[11px] text-muted-foreground">
                  <span className="label-caps">Court</span>
                  {HOURS.map((h) => (
                    <span key={h} className="numeric text-center">
                      {h % 12 === 0 ? 12 : h % 12}
                      {h < 12 ? "a" : "p"}
                    </span>
                  ))}
                </div>
                {courts.map((court) => (
                  <div
                    key={court.id}
                    className="grid grid-cols-[110px_1fr] border-b border-border last:border-0"
                  >
                    <div className="flex flex-col justify-center py-3 pr-2">
                      <span className="text-sm font-semibold">{court.name}</span>
                      <span className="text-[11px] text-muted-foreground">{court.sport}</span>
                    </div>
                    <div className="relative h-16">
                      <div className="grid h-full grid-cols-17">
                        {HOURS.map((h) => (
                          <div key={h} className="border-l border-border/70" />
                        ))}
                      </div>
                      {scheduleDay
                        .filter((e) => e.court === court.name)
                        .map((e) => {
                          const offset = e.start - 6;
                          return (
                            <button
                              key={e.id}
                              type="button"
                              onClick={() => setActive(e)}
                              style={{
                                left: `${(offset / HOURS.length) * 100}%`,
                                width: `${(e.duration / HOURS.length) * 100}%`,
                              }}
                              className={cn(
                                "absolute top-1/2 z-10 h-12 -translate-y-1/2 overflow-hidden rounded-md border px-2 py-1.5 text-left transition-transform hover:scale-[1.01]",
                                eventTone[e.status] ?? eventTone["Confirmed"],
                              )}
                            >
                            <span className="block truncate text-[11px] font-semibold">
                              {e.title}
                            </span>
                            <span className="block truncate text-[10px] opacity-80">
                              {e.member !== "—" ? e.member : "Blocked"}
                              {e.coach !== "—" ? ` · ${e.coach}` : ""}
                            </span>
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] text-muted-foreground">
              {["Confirmed", "In progress", "Completed", "No-show", "Maintenance"].map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className={cn("size-2.5 rounded-sm border", eventTone[s])} />
                  {s}
                </span>
              ))}
            </div>
            <AdminNote>
              Schedule is view-only — no rescheduling, editing or cancellation. Admin handles
              all changes.
            </AdminNote>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Week of 24 – 30 August 2026</CardTitle>
            <CardDescription>Booked slots against daily capacity across all courts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-3 md:grid-cols-4 xl:grid-cols-7">
              {weekLoad.map((d) => {
                const pct = Math.round((d.slots / d.capacity) * 100);
                return (
                  <div key={d.day} className="rounded-lg border border-border bg-surface p-4">
                    <p className="font-display text-sm font-bold">{d.day}</p>
                    <p className="numeric mt-2 text-2xl font-bold">{d.slots}</p>
                    <p className="text-[11px] text-muted-foreground">
                      of {d.capacity} slots booked
                    </p>
                    <Progress value={pct} className="mt-3 h-1.5" />
                    <p className="numeric mt-1.5 text-[11px] font-semibold text-muted-foreground">
                      {pct}% utilised
                    </p>
                  </div>
                );
              })}
            </div>
            <AdminNote />
          </CardContent>
        </Card>
      )}

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.title}</SheetTitle>
                <SheetDescription>
                  {active.court} · {active.start}:00 – {active.start + active.duration}:00
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.status} />
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Member", active.member],
                    ["Coach", active.coach],
                    ["Court", active.court],
                    ["Duration", `${active.duration} hr`],
                    ["Booking ID", active.bookingId ?? "—"],
                    ["Status", active.status],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <AdminNote>
                  Please contact Admin for any schedule change.
                </AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
