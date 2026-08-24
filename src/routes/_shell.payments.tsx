import { createFileRoute } from "@tanstack/react-router";
import { Banknote, CreditCard, IndianRupee, ShieldAlert, TimerReset } from "lucide-react";
import { useState } from "react";

import { OperationsChart } from "@/components/manager/charts";
import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatCard } from "@/components/manager/stat-card";
import { StatusBadge } from "@/components/manager/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { hourlyRevenue, inr, payments, revenueToday, type Payment } from "@/lib/demo-data";

export const Route = createFileRoute("/_shell/payments")({
  head: () => ({
    meta: [
      { title: "Payments & Revenue — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Today's operational payment snapshot for your assigned TOP SPORTS facility: cash, online, pending and failed collections.",
      },
      { property: "og:title", content: "Payments & Revenue — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Limited, operational-only revenue visibility for facility managers.",
      },
    ],
  }),
  component: PaymentsPage,
});

function PaymentsPage() {
  const [active, setActive] = useState<Payment | null>(null);
  const completed = payments.filter((p) => p.status === "Completed").length;
  const pending = payments.filter((p) => p.status === "Pending").length;
  const failed = payments.filter((p) => p.status === "Failed").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments & Revenue"
        description="Operational snapshot of today's collections at your facility. Full accounting is not available to Managers."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's revenue" value={inr(revenueToday.total)} hint={`${revenueToday.transactions} transactions`} icon={IndianRupee} tone="success" />
        <StatCard label="Cash collection" value={inr(revenueToday.cash)} hint="Collected at counter" icon={Banknote} />
        <StatCard label="Online collection" value={inr(revenueToday.online)} hint="Settled via gateway" icon={CreditCard} tone="brand" />
        <StatCard label="Pending payments" value={inr(revenueToday.pending)} hint={`${pending} awaiting settlement`} icon={TimerReset} tone="warning" />
      </section>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Collection through the day</CardTitle>
            <CardDescription>Operational revenue flow, hour by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <OperationsChart
              type="area"
              data={hourlyRevenue}
              xKey="hour"
              series={[{ key: "revenue", label: "Revenue (₹)", color: "var(--color-chart-1)" }]}
              height={260}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s payment status</CardTitle>
            <CardDescription>Transaction outcomes at this facility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Completed", count: completed, tone: "text-success", amount: revenueToday.total },
              { label: "Pending", count: pending, tone: "text-warning-foreground", amount: revenueToday.pending },
              { label: "Failed", count: failed, tone: "text-destructive", amount: revenueToday.failed },
            ].map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between rounded-md border border-border bg-surface px-4 py-3"
              >
                <div>
                  <p className={`text-sm font-semibold ${r.tone}`}>{r.label}</p>
                  <p className="text-xs text-muted-foreground">{r.count} transactions</p>
                </div>
                <p className="numeric font-display text-lg font-bold">{inr(r.amount)}</p>
              </div>
            ))}
            <p className="flex items-start gap-2 pt-1 text-xs text-muted-foreground">
              <ShieldAlert className="mt-px size-3.5 shrink-0 text-info" />
              Accounting, payroll and financial reporting are not part of Manager access.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s transactions</CardTitle>
          <CardDescription>Basic operational transaction status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Booking</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p.id} className="cursor-pointer" onClick={() => setActive(p)}>
                    <TableCell className="numeric font-medium">{p.id}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{p.bookingId}</TableCell>
                    <TableCell className="font-medium">{p.member}</TableCell>
                    <TableCell className="text-muted-foreground">{p.service}</TableCell>
                    <TableCell><StatusBadge status={p.mode} dot={false} /></TableCell>
                    <TableCell className="numeric font-medium">{inr(p.amount)}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{p.time}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <AdminNote>
            Refunds, settlements and payment corrections are handled by Admin.
          </AdminNote>
        </CardContent>
      </Card>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.id}</SheetTitle>
                <SheetDescription>
                  {active.time} · booking {active.bookingId}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <div className="flex gap-2">
                  <StatusBadge status={active.status} />
                  <StatusBadge status={active.mode} dot={false} />
                </div>
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Member", active.member],
                    ["Service", active.service],
                    ["Amount", inr(active.amount)],
                    ["Mode", active.mode],
                    ["Booking", active.bookingId],
                    ["Recorded at", active.time],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <AdminNote>
                  Payment issues must be escalated to Admin — no refunds or status changes
                  from this view.
                </AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
