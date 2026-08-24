import { createFileRoute } from "@tanstack/react-router";
import { EyeOff, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
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
import { bookings, members, type Member } from "@/lib/demo-data";

export const Route = createFileRoute("/_shell/members")({
  head: () => ({
    meta: [
      { title: "Members — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Operational member visibility for your assigned TOP SPORTS facility — activity, sports and bookings, with personal contact details hidden.",
      },
      { property: "og:title", content: "Members — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Privacy-first member monitoring for facility managers.",
      },
    ],
  }),
  component: MembersPage,
});

function MembersPage() {
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState("all");
  const [active, setActive] = useState<Member | null>(null);

  const sports = Array.from(new Set(members.map((m) => m.sport)));

  const rows = useMemo(
    () =>
      members.filter((m) => {
        const q = query.trim().toLowerCase();
        return (
          (!q || m.name.toLowerCase().includes(q) || m.sport.toLowerCase().includes(q)) &&
          (sport === "all" || m.sport === sport)
        );
      }),
    [query, sport],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Members"
        description="Members active at your assigned facility. Contact details are intentionally hidden."
      />

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search member name or sport…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select value={sport} onValueChange={setSport}>
              <SelectTrigger><SelectValue placeholder="Sport" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All sports</SelectItem>
                {sports.map((s) => (
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
                  <TableHead>Sport</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Last visit</TableHead>
                  <TableHead>Upcoming</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((m) => (
                  <TableRow key={m.id} className="cursor-pointer" onClick={() => setActive(m)}>
                    <TableCell>
                      <span className="flex items-center gap-2.5">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-secondary text-[11px] font-semibold">
                            {m.initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{m.name}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{m.sport}</TableCell>
                    <TableCell className="text-muted-foreground">{m.membership}</TableCell>
                    <TableCell className="numeric">{m.totalBookings}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{m.lastVisit}</TableCell>
                    <TableCell className="text-muted-foreground">{m.upcoming ?? "—"}</TableCell>
                    <TableCell><StatusBadge status={m.status} /></TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                      No members match this search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <AdminNote>
            <span className="flex items-center gap-1.5">
              <EyeOff className="size-3.5" /> Mobile numbers, email addresses and personal
              details are not available to Managers.
            </span>
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
                  {active.sport} · {active.membership} membership
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.status} />
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Total bookings", String(active.totalBookings)],
                    ["Last visit", active.lastVisit],
                    ["Upcoming booking", active.upcoming ?? "None scheduled"],
                    ["Facility usage", active.facilityUsage],
                    ["Services used", active.services.join(", ")],
                    ["Contact details", "Hidden for privacy"],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div>
                  <p className="label-caps mb-2">Booking history at this facility</p>
                  <ul className="space-y-2">
                    {bookings
                      .filter((b) => b.member === active.name)
                      .map((b) => (
                        <li
                          key={b.id}
                          className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2 text-xs"
                        >
                          <span className="numeric font-medium">
                            {b.date} · {b.time}
                          </span>
                          <span className="flex-1 truncate text-muted-foreground">
                            {b.service} · {b.facility}
                          </span>
                          <StatusBadge status={b.status} dot={false} />
                        </li>
                      ))}
                    {bookings.filter((b) => b.member === active.name).length === 0 && (
                      <li className="rounded-md border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                        No bookings recorded at this facility.
                      </li>
                    )}
                  </ul>
                </div>

                <AdminNote>
                  Member records are maintained by Admin. Managers have operational
                  visibility only.
                </AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
