import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { bookings, inr, services, type Service } from "@/lib/demo-data";

export const Route = createFileRoute("/_shell/services")({
  head: () => ({
    meta: [
      { title: "Services — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Services offered at your assigned TOP SPORTS facility with duration, rate, provider and availability — monitoring only.",
      },
      { property: "og:title", content: "Services — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Service catalogue visibility for facility managers.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Services"
        description="Services currently offered at your assigned facility, including provider and availability."
      />

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Sport</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Rate</TableHead>
                  <TableHead>Coach / provider</TableHead>
                  <TableHead>Booked today</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((s) => (
                  <TableRow key={s.id} className="cursor-pointer" onClick={() => setActive(s)}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground">{s.sport}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{s.duration}</TableCell>
                    <TableCell className="numeric font-medium">{inr(s.rate)}</TableCell>
                    <TableCell className="text-muted-foreground">{s.provider}</TableCell>
                    <TableCell className="numeric">{s.bookedToday}</TableCell>
                    <TableCell><StatusBadge status={s.availability} /></TableCell>
                    <TableCell><StatusBadge status={s.status} dot={false} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <AdminNote>
            Pricing, duration and availability of services are configured by Admin.
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
                  {active.sport} · {active.duration}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <div className="flex gap-2">
                  <StatusBadge status={active.availability} />
                  <StatusBadge status={active.status} dot={false} />
                </div>
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Rate", inr(active.rate)],
                    ["Duration", active.duration],
                    ["Provider", active.provider],
                    ["Booked today", String(active.bookedToday)],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <div>
                  <p className="label-caps mb-2">Recent bookings for this service</p>
                  <ul className="space-y-2">
                    {bookings
                      .filter((b) => b.service === active.name)
                      .map((b) => (
                        <li
                          key={b.id}
                          className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-3 py-2 text-xs"
                        >
                          <span className="numeric font-medium">{b.time}</span>
                          <span className="flex-1 truncate text-muted-foreground">
                            {b.member} · {b.facility}
                          </span>
                          <StatusBadge status={b.status} dot={false} />
                        </li>
                      ))}
                  </ul>
                </div>
                <AdminNote>Service changes are handled by Admin.</AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
