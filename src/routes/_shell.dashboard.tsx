import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  CalendarCheck,
  ChevronRight,
  IndianRupee,
  MapPin,
  TimerReset,
  UserCheck,
} from "lucide-react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatCard } from "@/components/manager/stat-card";
import { StatusBadge } from "@/components/manager/status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FACILITY,
  MANAGER,
  bookingsByHour,
  courts,
  inr,
  revenueToday,
  todaysBookings,
} from "@/lib/demo-data";
import { OperationsChart } from "@/components/manager/charts";

export const Route = createFileRoute("/_shell/dashboard")({
  head: () => ({
    meta: [
      { title: "Facility Dashboard — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Today's operational snapshot for your assigned TOP SPORTS centre: bookings, sessions, court occupancy, active coaches and revenue.",
      },
      { property: "og:title", content: "Facility Dashboard — TOP SPORTS Manager" },
      {
        property: "og:description",
        content:
          "Monitor today's bookings, court status, coach activity and payment snapshot in one operational view.",
      },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const occupied = courts.filter((c) => c.status === "Occupied").length;
  const upcoming = todaysBookings.filter(
    (b) => b.status === "Confirmed" || b.status === "In progress",
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Good morning, Manager"
        description={`${FACILITY.name} · ${MANAGER.name} · Operational snapshot for Sunday, 23 August 2026`}
      >
        <span className="rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
          Facility hours {FACILITY.hours}
        </span>
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
        <StatCard label="Today's bookings" value="42" hint="12 completed · 5 in progress" icon={CalendarCheck} />
        <StatCard label="Today's sessions" value="18" hint="Across 5 courts" icon={Activity} tone="brand" />
        <StatCard label="Facilities occupied" value={`${occupied} / ${courts.length}`} hint="1 court under maintenance" icon={MapPin} />
        <StatCard label="Coaches active today" value="8" hint="3 on duty right now" icon={UserCheck} tone="success" />
        <StatCard label="Today's revenue" value={inr(revenueToday.total)} hint="Operational snapshot only" icon={IndianRupee} tone="success" />
        <StatCard label="Pending payments" value={inr(revenueToday.pending)} hint="7 bookings awaiting settlement" icon={TimerReset} tone="warning" />
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>Today&apos;s facility status</CardTitle>
              <CardDescription>Live court occupancy at your centre</CardDescription>
            </div>
            <Link
              to="/facilities"
              className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
            >
              All facilities <ChevronRight className="size-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            {courts.map((court) => (
              <Link
                key={court.id}
                to="/facilities"
                search={{ court: court.id }}
                className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-brand/40 hover:bg-accent/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-sm font-bold">{court.name}</p>
                    <p className="text-xs text-muted-foreground">{court.sport}</p>
                  </div>
                  <StatusBadge status={court.status} />
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {court.status === "Occupied" && `${court.current} · ${court.currentSlot}`}
                  {court.status === "Available" && `Next: ${court.next} · ${court.nextSlot}`}
                  {court.status === "Maintenance" && court.note}
                </p>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bookings by hour</CardTitle>
            <CardDescription>Load distribution across today</CardDescription>
          </CardHeader>
          <CardContent>
            <OperationsChart
              type="bar"
              data={bookingsByHour}
              xKey="hour"
              series={[{ key: "bookings", label: "Bookings", color: "var(--color-chart-1)" }]}
              height={240}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Today&apos;s bookings</CardTitle>
            <CardDescription>Who is booked, with which coach and where</CardDescription>
          </div>
          <Link
            to="/bookings"
            className="flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
          >
            View all bookings <ChevronRight className="size-3.5" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Coach</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {todaysBookings.map((b) => (
                  <TableRow key={b.id} className="cursor-pointer">
                    <TableCell className="numeric font-medium">{b.time}</TableCell>
                    <TableCell className="font-medium">{b.member}</TableCell>
                    <TableCell className="text-muted-foreground">{b.service}</TableCell>
                    <TableCell className="text-muted-foreground">{b.coach}</TableCell>
                    <TableCell className="text-muted-foreground">{b.facility}</TableCell>
                    <TableCell>
                      <StatusBadge status={b.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        to="/bookings"
                        search={{ booking: b.id }}
                        className="text-xs font-semibold text-brand hover:underline"
                      >
                        Details
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <AdminNote />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming sessions</CardTitle>
          <CardDescription>Next sessions scheduled at this facility</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {upcoming.map((b) => (
            <Link
              key={b.id}
              to="/bookings"
              search={{ booking: b.id }}
              className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-brand/40 hover:bg-accent/40"
            >
              <div className="flex items-center justify-between">
                <span className="numeric font-display text-sm font-bold">{b.time}</span>
                <StatusBadge status={b.status} />
              </div>
              <p className="mt-2 text-sm font-semibold">{b.member}</p>
              <p className="text-xs text-muted-foreground">
                {b.sport} · {b.service}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Coach: {b.coach}</span>
                <span>{b.facility}</span>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
