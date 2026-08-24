import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, Search, UserX } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatCard } from "@/components/manager/stat-card";
import { StatusBadge } from "@/components/manager/status-badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CONTACT_ADMIN } from "@/lib/permissions";
import { attendance, type AttendanceRecord } from "@/lib/ops-data";

export const Route = createFileRoute("/_shell/attendance")({
  head: () => ({
    meta: [
      { title: "Attendance & Check-in — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Monitor today's check-ins, no-shows and attended sessions across courts, coaches and sports at your assigned TOP SPORTS centre.",
      },
      { property: "og:title", content: "Attendance & Check-in — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Operational check-in monitoring for facility managers.",
      },
    ],
  }),
  component: AttendancePage,
});

function AttendancePage() {
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("Today");
  const [facility, setFacility] = useState("all");
  const [sport, setSport] = useState("all");
  const [coach, setCoach] = useState("all");
  const [status, setStatus] = useState("all");
  const [active, setActive] = useState<AttendanceRecord | null>(null);

  const facilities = Array.from(new Set(attendance.map((a) => a.facility)));
  const sports = Array.from(new Set(attendance.map((a) => a.sport)));
  const coaches = Array.from(new Set(attendance.map((a) => a.coach)));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return attendance.filter(
      (a) =>
        (!q || a.member.toLowerCase().includes(q) || a.booking.toLowerCase().includes(q)) &&
        (date === "all" || a.date === date) &&
        (facility === "all" || a.facility === facility) &&
        (sport === "all" || a.sport === sport) &&
        (coach === "all" || a.coach === coach) &&
        (status === "all" || a.status === status),
    );
  }, [query, date, facility, sport, coach, status]);

  const today = attendance.filter((a) => a.date === "Today");
  const checkedIn = today.filter((a) => a.status === "Checked in" || a.status === "Attended").length;
  const pending = today.filter((a) => a.status === "Not checked in").length;
  const noShow = today.filter((a) => a.status === "No-show").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="Check-in status for sessions at your assigned facility. Attendance is captured at the entry desk and cannot be edited here."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's sessions" value={String(today.length)} icon={Clock} />
        <StatCard label="Checked in / attended" value={String(checkedIn)} tone="success" icon={CheckCircle2} />
        <StatCard label="Awaiting check-in" value={String(pending)} tone="warning" />
        <StatCard label="No-shows" value={String(noShow)} tone="brand" icon={UserX} />
      </section>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
            <div className="relative xl:col-span-2">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search member or booking…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select value={date} onValueChange={setDate}>
              <SelectTrigger><SelectValue placeholder="Date" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="Yesterday">Yesterday</SelectItem>
                <SelectItem value="all">All dates</SelectItem>
              </SelectContent>
            </Select>
            <Select value={facility} onValueChange={setFacility}>
              <SelectTrigger><SelectValue placeholder="Facility" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All facilities</SelectItem>
                {facilities.map((f) => (<SelectItem key={f} value={f}>{f}</SelectItem>))}
              </SelectContent>
            </Select>
            <Select value={sport} onValueChange={setSport}>
              <SelectTrigger><SelectValue placeholder="Sport" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sports</SelectItem>
                {sports.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
              </SelectContent>
            </Select>
            <Select value={coach} onValueChange={setCoach}>
              <SelectTrigger><SelectValue placeholder="Coach" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All coaches</SelectItem>
                {coaches.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {["Checked in", "Attended", "Not checked in", "No-show", "Cancelled"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead>Sport</TableHead>
                  <TableHead>Facility</TableHead>
                  <TableHead>Coach</TableHead>
                  <TableHead>Session</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((a) => (
                  <TableRow key={a.id} className="cursor-pointer" onClick={() => setActive(a)}>
                    <TableCell>
                      <span className="flex items-center gap-2.5">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-secondary text-[11px] font-semibold">
                            {a.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{a.member}</span>
                      </span>
                    </TableCell>
                    <TableCell className="numeric text-muted-foreground">{a.booking}</TableCell>
                    <TableCell className="text-muted-foreground">{a.sport}</TableCell>
                    <TableCell className="text-muted-foreground">{a.facility}</TableCell>
                    <TableCell className="text-muted-foreground">{a.coach}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{a.session}</TableCell>
                    <TableCell className="numeric">{a.checkIn ?? "—"}</TableCell>
                    <TableCell><StatusBadge status={a.status} /></TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="py-12 text-center text-sm text-muted-foreground">
                      No attendance records match these filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AdminNote>
        Attendance is recorded at check-in and cannot be edited by the Manager. {CONTACT_ADMIN}
      </AdminNote>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.member}</SheetTitle>
                <SheetDescription>{active.booking} · {active.sport}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.status} />
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Date", active.date],
                    ["Session", active.session],
                    ["Facility", active.facility],
                    ["Coach", active.coach],
                    ["Check-in time", active.checkIn ?? "Not checked in"],
                    ["Booking", active.booking],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                {active.note && (
                  <p className="rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted-foreground">
                    {active.note}
                  </p>
                )}
                <AdminNote>
                  To correct an attendance record, raise it with the Admin desk. {CONTACT_ADMIN}
                </AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
