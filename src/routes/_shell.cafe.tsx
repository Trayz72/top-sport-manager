import { createFileRoute } from "@tanstack/react-router";
import { ChefHat, CircleSlash, ReceiptText, TimerReset } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatCard } from "@/components/manager/stat-card";
import { StatusBadge } from "@/components/manager/status-badge";
import { Card, CardContent } from "@/components/ui/card";
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
import { cafeOrders, cafeSnapshot, inr, type CafeOrder } from "@/lib/demo-data";

export const Route = createFileRoute("/_shell/cafe")({
  head: () => ({
    meta: [
      { title: "Café Orders — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Today's café orders at your assigned TOP SPORTS facility: pending, preparing, completed and cancelled orders with a sales snapshot.",
      },
      { property: "og:title", content: "Café Orders — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Food and café operations visibility for facility managers.",
      },
    ],
  }),
  component: CafePage,
});

const FILTERS = ["All", "Pending", "Preparing", "Completed", "Cancelled"] as const;

function CafePage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [active, setActive] = useState<CafeOrder | null>(null);

  const rows = useMemo(
    () => cafeOrders.filter((o) => filter === "All" || o.status === filter),
    [filter],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Food / Café orders"
        description="Today's café activity at your assigned facility. Menu and order changes are handled by Admin."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today's orders" value={String(cafeSnapshot.orders)} icon={ReceiptText} />
        <StatCard label="Café sales" value={inr(cafeSnapshot.sales)} hint="Excludes cancelled orders" icon={ChefHat} tone="success" />
        <StatCard label="Pending orders" value={String(cafeSnapshot.pending)} icon={TimerReset} tone="warning" />
        <StatCard label="Cancelled" value={String(cafeSnapshot.cancelled)} icon={CircleSlash} tone="danger" />
      </section>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as (typeof FILTERS)[number])}>
            <TabsList className="flex w-full flex-wrap justify-start">
              {FILTERS.map((f) => (
                <TabsTrigger key={f} value={f}>{f}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order no.</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((o) => (
                  <TableRow key={o.id} className="cursor-pointer" onClick={() => setActive(o)}>
                    <TableCell className="numeric font-medium">{o.id}</TableCell>
                    <TableCell className="font-medium">{o.customer}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
                    </TableCell>
                    <TableCell className="numeric font-medium">{inr(o.amount)}</TableCell>
                    <TableCell><StatusBadge status={o.mode} dot={false} /></TableCell>
                    <TableCell className="numeric text-muted-foreground">{o.time}</TableCell>
                    <TableCell><StatusBadge status={o.status} /></TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                      No orders in this state today.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <AdminNote>
            Menu, pricing and order status are managed by Admin. Report café issues to the
            Admin desk.
          </AdminNote>
        </CardContent>
      </Card>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-md">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">Order {active.id}</SheetTitle>
                <SheetDescription>
                  {active.time} · {active.customer}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <div className="flex gap-2">
                  <StatusBadge status={active.status} />
                  <StatusBadge status={active.mode} dot={false} />
                </div>
                <ul className="divide-y divide-border rounded-lg border border-border bg-surface">
                  {active.items.map((i) => (
                    <li key={i.name} className="flex items-center justify-between px-4 py-3 text-sm">
                      <span>
                        {i.name}
                        <span className="ml-2 text-xs text-muted-foreground">×{i.qty}</span>
                      </span>
                      <span className="numeric font-medium">{inr(i.price * i.qty)}</span>
                    </li>
                  ))}
                  <li className="flex items-center justify-between px-4 py-3 text-sm font-semibold">
                    <span>Total</span>
                    <span className="numeric">{inr(active.amount)}</span>
                  </li>
                </ul>
                <AdminNote>Order changes and cancellations are handled by Admin.</AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
