import { createFileRoute } from "@tanstack/react-router";
import { PackageSearch, Search, ShoppingBag } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatCard } from "@/components/manager/stat-card";
import { StatusBadge } from "@/components/manager/status-badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { inr } from "@/lib/demo-data";
import { CONTACT_ADMIN } from "@/lib/permissions";
import { merchOrders, products } from "@/lib/ops-data";

export const Route = createFileRoute("/_shell/merchandise")({
  head: () => ({
    meta: [
      { title: "Merchandise — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Operational visibility of club merchandise stock, pricing and today's counter orders at your assigned TOP SPORTS centre.",
      },
      { property: "og:title", content: "Merchandise — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Read-only merchandise and stock monitoring for facility managers.",
      },
    ],
  }),
  component: MerchandisePage,
});

function MerchandisePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) => (!q || p.name.toLowerCase().includes(q)) && (category === "all" || p.category === category),
    );
  }, [query, category]);

  const salesToday = merchOrders
    .filter((o) => o.status === "Paid")
    .reduce((s, o) => s + o.amount, 0);
  const unitsToday = products.reduce((s, p) => s + p.soldToday, 0);
  const lowStock = products.filter((p) => p.status !== "In stock").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Merchandise"
        description="Club merchandise stock and counter sales at your assigned facility. Products, pricing and inventory are maintained by Admin."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Products listed" value={String(products.length)} icon={ShoppingBag} />
        <StatCard label="Sales today" value={inr(salesToday)} tone="success" />
        <StatCard label="Units sold today" value={String(unitsToday)} tone="brand" />
        <StatCard label="Low / out of stock" value={String(lowStock)} tone="warning" icon={PackageSearch} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Products</CardTitle>
          <CardDescription>Availability and stock status</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search product…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Sold today</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell className="text-muted-foreground">{p.category}</TableCell>
                    <TableCell className="numeric">{inr(p.price)}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{p.stock}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{p.soldToday}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                      No products match this search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s merchandise orders</CardTitle>
          <CardDescription>Counter and online orders at your facility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {merchOrders.map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="numeric font-medium">{o.id}</TableCell>
                    <TableCell>{o.member}</TableCell>
                    <TableCell className="text-muted-foreground">{o.items}</TableCell>
                    <TableCell className="numeric">{inr(o.amount)}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{o.time}</TableCell>
                    <TableCell><StatusBadge status={o.mode} dot={false} /></TableCell>
                    <TableCell><StatusBadge status={o.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AdminNote>
        Products, prices, inventory and orders are managed by Admin. {CONTACT_ADMIN}
      </AdminNote>
    </div>
  );
}
