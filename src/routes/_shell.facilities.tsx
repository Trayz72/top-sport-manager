import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { OperationsChart } from "@/components/manager/charts";
import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatCard } from "@/components/manager/stat-card";
import { StatusBadge } from "@/components/manager/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { courts, scheduleDay, utilizationByCourt } from "@/lib/demo-data";
import { resources } from "@/lib/ops-data";
import { MapPin, ShieldAlert, Wrench } from "lucide-react";

export const Route = createFileRoute("/_shell/facilities")({
  validateSearch: (search: Record<string, unknown>): { court?: string } =>
    typeof search["court"] === "string" ? { court: search["court"] } : {},
  head: () => ({
    meta: [
      { title: "Facilities & Resources — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Court-by-court availability, current and next bookings, maintenance windows and utilisation for your assigned TOP SPORTS centre.",
      },
      { property: "og:title", content: "Facilities & Resources — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Live court occupancy and maintenance monitoring for facility managers.",
      },
    ],
  }),
  component: FacilitiesPage,
});

function FacilitiesPage() {
  const navigate = useNavigate();
  const { court: openId } = Route.useSearch();
  const active = courts.find((c) => c.id === openId);

  const available = courts.filter((c) => c.status === "Available").length;
  const occupied = courts.filter((c) => c.status === "Occupied").length;
  const maintenance = courts.filter((c) => c.status === "Maintenance").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Facilities & Resources"
        description="Current status of every court and shared resource at your assigned centre, including maintenance windows and upcoming bookings."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total courts" value={String(courts.length)} icon={MapPin} />
        <StatCard label="Available now" value={String(available)} tone="success" />
        <StatCard label="Occupied now" value={String(occupied)} tone="brand" />
        <StatCard label="Under maintenance" value={String(maintenance)} tone="warning" icon={Wrench} />
      </section>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {courts.map((court) => (
          <button
            key={court.id}
            type="button"
            onClick={() => navigate({ to: "/facilities", search: { court: court.id } })}
            className="rounded-lg border border-border bg-card p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-raised"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-base font-bold">{court.name}</p>
                <p className="text-xs text-muted-foreground">
                  {court.sport} · {court.surface}
                </p>
              </div>
              <StatusBadge status={court.status} />
            </div>

            <dl className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Current</dt>
                <dd className="text-right font-medium">
                  {court.current ? `${court.current} · ${court.currentSlot}` : "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Next</dt>
                <dd className="text-right font-medium">
                  {court.next ? `${court.next} · ${court.nextSlot}` : "No booking"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Operating hours</dt>
                <dd className="numeric text-right font-medium">{court.openHours}</dd>
              </div>
            </dl>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                <span>Today&apos;s utilisation</span>
                <span className="numeric font-semibold text-foreground">
                  {court.utilization}%
                </span>
              </div>
              <Progress value={court.utilization} className="mt-1.5 h-1.5" />
            </div>

            {court.note && (
              <p className="mt-3 flex items-start gap-1.5 text-[11px] text-warning-foreground">
                <ShieldAlert className="mt-px size-3.5 shrink-0" />
                {court.note}
              </p>
            )}
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Utilisation by court</CardTitle>
          <CardDescription>Share of operating hours used today</CardDescription>
        </CardHeader>
        <CardContent>
          <OperationsChart
            type="bar"
            layout="horizontal"
            data={utilizationByCourt}
            xKey="court"
            series={[{ key: "utilization", label: "Utilisation %", color: "var(--color-chart-2)" }]}
            height={240}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
          <CardDescription>
            Lockers, parking and other shared club resources at this centre
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {resources.map((r) => (
              <div
                key={r.id}
                className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-brand/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.type}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <dl className="mt-3 space-y-1.5 text-xs">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Availability</dt>
                    <dd className="text-right font-medium">{r.availability}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Current</dt>
                    <dd className="text-right font-medium">{r.current ?? "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Next</dt>
                    <dd className="text-right font-medium">{r.next ?? "—"}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Maintenance</dt>
                    <dd className="text-right font-medium">{r.maintenance}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AdminNote>
        Facility and resource records, availability and maintenance windows are configured by Admin.
        Report any discrepancy to the Admin desk.
      </AdminNote>

      <Sheet open={!!active} onOpenChange={(o) => !o && navigate({ to: "/facilities", search: {} })}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.name}</SheetTitle>
                <SheetDescription>
                  {active.sport} · {active.surface}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.status} />
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Current booking", active.current ?? "—"],
                    ["Current slot", active.currentSlot ?? "—"],
                    ["Next booking", active.next ?? "No booking"],
                    ["Next slot", active.nextSlot ?? "—"],
                    ["Operating hours", active.openHours],
                    ["Utilisation", `${active.utilization}%`],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div>
                  <p className="label-caps mb-2">Today&apos;s slots on this court</p>
                  <ul className="space-y-2">
                    {scheduleDay
                      .filter((e) => e.court === active.name)
                      .map((e) => (
                        <li
                          key={e.id}
                          className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2 text-xs"
                        >
                          <span className="numeric font-medium">
                            {e.start}:00 – {e.start + e.duration}:00
                          </span>
                          <span className="flex-1 px-3 text-muted-foreground">{e.title}</span>
                          <StatusBadge status={e.status} dot={false} />
                        </li>
                      ))}
                    {scheduleDay.filter((e) => e.court === active.name).length === 0 && (
                      <li className="rounded-md border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                        No slots scheduled today.
                      </li>
                    )}
                  </ul>
                </div>

                <AdminNote>
                  Facility availability and maintenance are managed by Admin.
                </AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
