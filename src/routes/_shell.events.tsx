import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatCard } from "@/components/manager/stat-card";
import { StatusBadge } from "@/components/manager/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CONTACT_ADMIN } from "@/lib/permissions";
import { events, type ClubEvent } from "@/lib/ops-data";

export const Route = createFileRoute("/_shell/events")({
  head: () => ({
    meta: [
      { title: "Events — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Upcoming tournaments, camps and club events at your assigned TOP SPORTS centre with capacity, registrations and location.",
      },
      { property: "og:title", content: "Events — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Read-only event visibility for facility managers.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("all");
  const [active, setActive] = useState<ClubEvent | null>(null);

  const sports = Array.from(new Set(events.map((e) => e.sport)));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter(
      (e) =>
        (!q || e.name.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)) &&
        (sport === "all" || e.sport === sport),
    );
  }, [query, sport]);

  const upcoming = rows.filter((e) => e.status !== "Completed" && e.status !== "Cancelled");
  const past = rows.filter((e) => e.status === "Completed" || e.status === "Cancelled");
  const totalRegistrations = events.reduce((s, e) => s + e.registrations, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Events"
        description="Club events scheduled at your assigned facility. Event setup and registrations are managed by Admin."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total events" value={String(events.length)} icon={CalendarDays} />
        <StatCard
          label="Upcoming"
          value={String(events.filter((e) => e.status !== "Completed" && e.status !== "Cancelled").length)}
          tone="brand"
        />
        <StatCard label="Registrations" value={String(totalRegistrations)} tone="success" icon={Users} />
        <StatCard
          label="Fully booked"
          value={String(events.filter((e) => e.status === "Fully booked").length)}
          tone="warning"
        />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Event calendar</CardTitle>
          <CardDescription>Search and browse events by sport</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search event or location…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select value={sport} onValueChange={setSport}>
              <SelectTrigger><SelectValue placeholder="Sport" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sports</SelectItem>
                {sports.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="upcoming">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
              <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
              <EventGrid list={upcoming} onOpen={setActive} />
            </TabsContent>
            <TabsContent value="past" className="mt-4">
              <EventGrid list={past} onOpen={setActive} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AdminNote>
        Events are created, edited and cancelled by Admin. {CONTACT_ADMIN}
      </AdminNote>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.name}</SheetTitle>
                <SheetDescription>{active.sport} · {active.location}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.status} />
                <p className="text-sm text-muted-foreground">{active.description}</p>
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Date", active.date],
                    ["Time", active.time],
                    ["Location", active.location],
                    ["Capacity", String(active.capacity)],
                    ["Registrations", String(active.registrations)],
                    ["Organiser", active.organiser],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Capacity filled</span>
                    <span className="numeric font-semibold text-foreground">
                      {Math.round((active.registrations / active.capacity) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(active.registrations / active.capacity) * 100}
                    className="mt-1.5 h-1.5"
                  />
                </div>
                <AdminNote>Event changes are handled by Admin. {CONTACT_ADMIN}</AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function EventGrid({ list, onOpen }: { list: ClubEvent[]; onOpen: (e: ClubEvent) => void }) {
  if (list.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border px-3 py-12 text-center text-sm text-muted-foreground">
        No events to show here.
      </div>
    );
  }
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {list.map((e) => (
        <button
          key={e.id}
          type="button"
          onClick={() => onOpen(e)}
          className="rounded-lg border border-border bg-card p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-raised"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-base font-bold">{e.name}</p>
              <p className="text-xs text-muted-foreground">{e.sport}</p>
            </div>
            <StatusBadge status={e.status} />
          </div>
          <dl className="mt-4 space-y-2 text-xs">
            <div className="flex justify-between gap-3">
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <CalendarDays className="size-3.5" /> Date
              </dt>
              <dd className="numeric text-right font-medium">{e.date}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">Time</dt>
              <dd className="numeric text-right font-medium">{e.time}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="size-3.5" /> Location
              </dt>
              <dd className="text-right font-medium">{e.location}</dd>
            </div>
          </dl>
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span>Registrations</span>
              <span className="numeric font-semibold text-foreground">
                {e.registrations} / {e.capacity}
              </span>
            </div>
            <Progress value={(e.registrations / e.capacity) * 100} className="mt-1.5 h-1.5" />
          </div>
        </button>
      ))}
    </div>
  );
}
