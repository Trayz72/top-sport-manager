import { createFileRoute } from "@tanstack/react-router";
import { Dumbbell, Search } from "lucide-react";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CONTACT_ADMIN } from "@/lib/permissions";
import { equipment } from "@/lib/ops-data";

export const Route = createFileRoute("/_shell/equipment")({
  head: () => ({
    meta: [
      { title: "Equipment — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Sports equipment inventory, condition and availability at your assigned TOP SPORTS centre.",
      },
      { property: "og:title", content: "Equipment — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Read-only equipment visibility for facility managers.",
      },
    ],
  }),
  component: EquipmentPage,
});

function EquipmentPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = Array.from(new Set(equipment.map((e) => e.category)));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return equipment.filter(
      (e) =>
        (!q || e.name.toLowerCase().includes(q) || e.location.toLowerCase().includes(q)) &&
        (category === "all" || e.category === category),
    );
  }, [query, category]);

  const inUse = equipment.reduce((s, e) => s + e.inUse, 0);
  const total = equipment.reduce((s, e) => s + e.total, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Equipment"
        description="Equipment held at your assigned facility, its condition and where it is currently deployed."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Equipment lines" value={String(equipment.length)} icon={Dumbbell} />
        <StatCard label="Units in use" value={`${inUse} / ${total}`} tone="brand" />
        <StatCard
          label="Needs attention"
          value={String(equipment.filter((e) => e.condition !== "Good").length)}
          tone="warning"
        />
        <StatCard
          label="Under maintenance"
          value={String(equipment.filter((e) => e.status === "Maintenance").length)}
          tone="success"
        />
      </section>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search equipment or location…"
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
                  <TableHead>Equipment</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>In use</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell className="text-muted-foreground">{e.category}</TableCell>
                    <TableCell className="numeric text-muted-foreground">
                      {e.inUse} / {e.total}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{e.condition}</TableCell>
                    <TableCell className="text-muted-foreground">{e.location}</TableCell>
                    <TableCell><StatusBadge status={e.status} /></TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                      No equipment matches this search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AdminNote>
        Equipment records and maintenance are managed by Admin. {CONTACT_ADMIN}
      </AdminNote>
    </div>
  );
}
