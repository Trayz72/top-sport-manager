import { createFileRoute } from "@tanstack/react-router";
import { History, Search, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatCard } from "@/components/manager/stat-card";
import { StatusBadge } from "@/components/manager/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FACILITY } from "@/lib/demo-data";
import { CONTACT_ADMIN } from "@/lib/permissions";
import { activityLog, type ActivityEntry } from "@/lib/ops-data";

export const Route = createFileRoute("/_shell/activity")({
  head: () => ({
    meta: [
      { title: "Activity — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Lightweight operational history for your assigned TOP SPORTS facility — cancellations, reschedules, maintenance and payment updates.",
      },
      { property: "og:title", content: "Activity — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Facility-scoped operational history for managers.",
      },
    ],
  }),
  component: ActivityPage,
});

function ActivityPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [facility, setFacility] = useState("all");
  const [active, setActive] = useState<ActivityEntry | null>(null);

  const facilities = Array.from(new Set(activityLog.map((a) => a.facility)));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activityLog.filter(
      (a) =>
        (!q || a.activity.toLowerCase().includes(q) || a.reference.toLowerCase().includes(q)) &&
        (status === "all" || a.status === status) &&
        (facility === "all" || a.facility === facility),
    );
  }, [query, status, facility]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity"
        description={`Operational updates affecting ${FACILITY.shortName}. Admin-only and system-level activity is not shown here.`}
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Updates logged" value={String(activityLog.length)} icon={History} />
        <StatCard
          label="Today"
          value={String(activityLog.filter((a) => a.time.startsWith("Today")).length)}
          tone="brand"
        />
        <StatCard
          label="Maintenance events"
          value={String(activityLog.filter((a) => a.status === "Maintenance").length)}
          tone="warning"
          icon={ShieldCheck}
        />
      </section>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-3 md:grid-cols-[1fr_190px_190px]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search activity or reference…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {["Cancelled", "Rescheduled", "Maintenance", "Updated", "Info"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={facility} onValueChange={setFacility}>
              <SelectTrigger><SelectValue placeholder="Facility" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All areas</SelectItem>
                {facilities.map((f) => (<SelectItem key={f} value={f}>{f}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <ol className="space-y-3">
            {rows.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => setActive(a)}
                  className="w-full rounded-lg border border-border bg-card p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-raised"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{a.activity}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        <span className="numeric">{a.time}</span> · {a.facility} · {a.reference}
                      </p>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{a.detail}</p>
                </button>
              </li>
            ))}
            {rows.length === 0 && (
              <li className="rounded-md border border-dashed border-border px-3 py-12 text-center text-sm text-muted-foreground">
                No activity matches these filters.
              </li>
            )}
          </ol>
        </CardContent>
      </Card>

      <AdminNote>
        This is a facility-level history only. Permission changes and platform-wide audit
        records stay with Admin. {CONTACT_ADMIN}
      </AdminNote>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.activity}</SheetTitle>
                <SheetDescription>{active.facility} · {active.reference}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.status} />
                <p className="text-sm text-muted-foreground">{active.detail}</p>
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Date & time", active.time],
                    ["Facility", active.facility],
                    ["Reference", active.reference],
                    ["Recorded by", active.actor],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <AdminNote>Activity records are read-only. {CONTACT_ADMIN}</AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
