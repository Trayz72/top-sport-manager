import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bookings, coaches, courts, inr, services } from "@/lib/demo-data";

export const Route = createFileRoute("/_shell/bookings")({
  validateSearch: (search: Record<string, unknown>): { booking?: string } =>
    typeof search["booking"] === "string" ? { booking: search["booking"] } : {},
  head: () => ({
    meta: [
      { title: "Booking Monitoring — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Monitor every booking at your assigned TOP SPORTS facility with filters for date, coach, sport, facility and status.",
      },
      { property: "og:title", content: "Booking Monitoring — TOP SPORTS Manager" },
      {
        property: "og:description",
        content:
          "View-only booking register for facility managers with member, coach, court and payment status.",
      },
    ],
  }),
  component: BookingsPage,
});

const RANGES = ["Today", "Tomorrow", "This Week", "Upcoming", "Completed", "Cancelled"] as const;

function BookingsPage() {
  const navigate = useNavigate();
  const { booking: openId } = Route.useSearch();
  const [range, setRange] = useState<(typeof RANGES)[number]>("Today");
  const [query, setQuery] = useState("");
  const [coach, setCoach] = useState("all");
  const [facility, setFacility] = useState("all");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    return bookings.filter((b) => {
      const inRange =
        range === "Today"
          ? b.day === "Today"
          : range === "Tomorrow"
            ? b.day === "Tomorrow"
            : range === "This Week"
              ? b.day !== "Past"
              : range === "Upcoming"
                ? (b.day === "Tomorrow" || b.day === "This Week") && b.status === "Confirmed"
                : range === "Completed"
                  ? b.status === "Completed"
                  : b.status === "Cancelled";
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        [b.member, b.coach, b.sport, b.service, b.facility, b.id].some((v) =>
          v.toLowerCase().includes(q),
        );
      return (
        inRange &&
        matchQuery &&
        (coach === "all" || b.coach === coach) &&
        (facility === "all" || b.facility === facility) &&
        (status === "all" || b.status === status)
      );
    });
  }, [range, query, coach, facility, status]);

  const active = bookings.find((b) => b.id === openId);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bookings"
        description="Complete booking register for your assigned facility. Inspect any booking for full operational detail."
      />

      <Card>
        <CardContent className="space-y-4 pt-6">
          <Tabs value={range} onValueChange={(v) => setRange(v as (typeof RANGES)[number])}>
            <TabsList className="flex w-full flex-wrap justify-start">
              {RANGES.map((r) => (
                <TabsTrigger key={r} value={r}>
                  {r}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="grid gap-3 md:grid-cols-4">
            <div className="relative md:col-span-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Member, coach, sport, service…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select value={coach} onValueChange={setCoach}>
              <SelectTrigger><SelectValue placeholder="Coach" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All coaches</SelectItem>
                {coaches.map((c) => (
                  <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={facility} onValueChange={setFacility}>
              <SelectTrigger><SelectValue placeholder="Facility" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All facilities</SelectItem>
                {courts.map((c) => (
                  <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {["Confirmed", "In progress", "Completed", "Cancelled", "No-show"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Coach</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((b) => (
                  <TableRow
                    key={b.id}
                    className="cursor-pointer"
                    onClick={() =>
                      navigate({ to: "/bookings", search: { booking: b.id } })
                    }
                  >
                    <TableCell className="numeric font-medium">{b.id}</TableCell>
                    <TableCell className="font-medium">{b.member}</TableCell>
                    <TableCell className="text-muted-foreground">{b.service}</TableCell>
                    <TableCell className="text-muted-foreground">{b.coach}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{b.date}</TableCell>
                    <TableCell className="numeric">{b.time}</TableCell>
                    <TableCell className="text-muted-foreground">{b.facility}</TableCell>
                    <TableCell><StatusBadge status={b.status} /></TableCell>
                    <TableCell><StatusBadge status={b.payment} dot={false} /></TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={9} className="py-12 text-center text-sm text-muted-foreground">
                      No bookings match these filters for your facility.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <AdminNote>
            Bookings are monitoring-only. Changes must be handled by Admin.
          </AdminNote>
        </CardContent>
      </Card>

      <Sheet
        open={!!active}
        onOpenChange={(o) => !o && navigate({ to: "/bookings", search: {} })}
      >
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">Booking {active.id}</SheetTitle>
                <SheetDescription>
                  {active.date} · {active.time} · {active.facility}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge status={active.status} />
                  <StatusBadge status={active.payment} dot={false} />
                  <StatusBadge status={active.mode} dot={false} />
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Member", active.member],
                    ["Sport", active.sport],
                    ["Service", active.service],
                    ["Coach", active.coach],
                    ["Date", active.date],
                    ["Time", active.time],
                    ["Duration", active.duration],
                    ["Facility", active.facility],
                    ["Booking amount", inr(active.amount)],
                    ["Contact (masked)", active.maskedPhone],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                {active.notes && (
                  <p className="rounded-md border border-border bg-secondary/60 p-3 text-xs text-muted-foreground">
                    {active.notes}
                  </p>
                )}
                <div className="rounded-md border border-border bg-surface p-4">
                  <p className="label-caps">Service reference</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {services.find((s) => s.name === active.service)?.duration ?? "—"} ·
                    standard rate{" "}
                    {inr(services.find((s) => s.name === active.service)?.rate ?? active.amount)}
                  </p>
                </div>
                <AdminNote>
                  This booking is view-only. Please contact Admin for any correction,
                  reschedule, cancellation or refund.
                </AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
