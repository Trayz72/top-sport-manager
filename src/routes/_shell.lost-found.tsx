import { createFileRoute } from "@tanstack/react-router";
import { PackageSearch, Search } from "lucide-react";
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
import { lostFound, type LostFoundItem } from "@/lib/ops-data";

export const Route = createFileRoute("/_shell/lost-found")({
  head: () => ({
    meta: [
      { title: "Lost & Found — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Track lost and found items reported at your assigned TOP SPORTS centre, with location, date and claim status.",
      },
      { property: "og:title", content: "Lost & Found — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Simple lost and found tracking for facility managers.",
      },
    ],
  }),
  component: LostFoundPage,
});

function LostFoundPage() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("all");
  const [status, setStatus] = useState("all");
  const [active, setActive] = useState<LostFoundItem | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lostFound.filter(
      (i) =>
        (!q || i.item.toLowerCase().includes(q) || i.location.toLowerCase().includes(q)) &&
        (kind === "all" || i.kind === kind) &&
        (status === "all" || i.status === status),
    );
  }, [query, kind, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Lost & Found"
        description="Items reported lost or found at your assigned facility. Records are maintained by the front desk and Admin."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total records" value={String(lostFound.length)} icon={PackageSearch} />
        <StatCard label="Open reports" value={String(lostFound.filter((i) => i.status === "Reported").length)} tone="warning" />
        <StatCard label="Awaiting claim" value={String(lostFound.filter((i) => i.status === "Found").length)} tone="brand" />
        <StatCard
          label="Claimed / resolved"
          value={String(lostFound.filter((i) => i.status === "Claimed" || i.status === "Resolved").length)}
          tone="success"
        />
      </section>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-3 md:grid-cols-[1fr_180px_180px]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search item or location…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select value={kind} onValueChange={setKind}>
              <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Lost & found</SelectItem>
                <SelectItem value="Lost">Lost</SelectItem>
                <SelectItem value="Found">Found</SelectItem>
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {["Reported", "Found", "Claimed", "Resolved"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Reported by</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((i) => (
                  <TableRow key={i.id} className="cursor-pointer" onClick={() => setActive(i)}>
                    <TableCell className="font-medium">{i.item}</TableCell>
                    <TableCell className="text-muted-foreground">{i.kind}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{i.date}</TableCell>
                    <TableCell className="text-muted-foreground">{i.location}</TableCell>
                    <TableCell className="text-muted-foreground">{i.reportedBy}</TableCell>
                    <TableCell><StatusBadge status={i.status} /></TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                      No lost & found records match these filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AdminNote>
        Lost & found records cannot be edited or deleted by the Manager. {CONTACT_ADMIN}
      </AdminNote>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.item}</SheetTitle>
                <SheetDescription>{active.kind} · {active.location}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.status} />
                <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-border bg-surface text-xs text-muted-foreground">
                  {active.photo ? (
                    <img src={active.photo} alt={active.item} className="h-full rounded-lg object-cover" />
                  ) : (
                    "No photo available"
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{active.description}</p>
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Date", active.date],
                    ["Location", active.location],
                    ["Type", active.kind],
                    ["Reported by", active.reportedBy],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>
                <AdminNote>Handovers and claims are confirmed by Admin. {CONTACT_ADMIN}</AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
