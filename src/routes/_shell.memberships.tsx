import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, CalendarClock, Search, Users } from "lucide-react";
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
import { memberships, type Membership } from "@/lib/ops-data";

export const Route = createFileRoute("/_shell/memberships")({
  head: () => ({
    meta: [
      { title: "Memberships & Club Pass — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "View active, expiring and expired club passes at your assigned TOP SPORTS centre with plan, validity and usage details.",
      },
      { property: "og:title", content: "Memberships & Club Pass — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Read-only membership monitoring for facility managers.",
      },
    ],
  }),
  component: MembershipsPage,
});

type SortKey = "expiry" | "member" | "plan";

function MembershipsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [plan, setPlan] = useState("all");
  const [sort, setSort] = useState<SortKey>("expiry");
  const [active, setActive] = useState<Membership | null>(null);

  const plans = Array.from(new Set(memberships.map((m) => m.plan)));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = memberships.filter(
      (m) =>
        (!q || m.member.toLowerCase().includes(q) || m.plan.toLowerCase().includes(q) || m.sport.toLowerCase().includes(q)) &&
        (status === "all" || m.status === status) &&
        (plan === "all" || m.plan === plan),
    );
    return [...list].sort((a, b) => {
      if (sort === "member") return a.member.localeCompare(b.member);
      if (sort === "plan") return a.plan.localeCompare(b.plan);
      return new Date(a.expiry).getTime() - new Date(b.expiry).getTime();
    });
  }, [query, status, plan, sort]);

  const activeCount = memberships.filter((m) => m.status === "Active").length;
  const expiring = memberships.filter((m) => m.status === "Expiring soon").length;
  const expired = memberships.filter((m) => m.status === "Expired").length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Memberships / Club Pass"
        description="Club passes held by members of your assigned facility. Plans, pricing and durations are configured by Admin."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total passes" value={String(memberships.length)} icon={Users} />
        <StatCard label="Active" value={String(activeCount)} tone="success" icon={BadgeCheck} />
        <StatCard label="Expiring soon" value={String(expiring)} tone="warning" icon={CalendarClock} />
        <StatCard label="Expired" value={String(expired)} tone="brand" />
      </section>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-3 md:grid-cols-[1fr_180px_190px_170px]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search member, plan or sport…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                {["Active", "Expiring soon", "Expired", "Paused"].map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={plan} onValueChange={setPlan}>
              <SelectTrigger><SelectValue placeholder="Plan" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All plans</SelectItem>
                {plans.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
              <SelectTrigger><SelectValue placeholder="Sort" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="expiry">Sort: Expiry date</SelectItem>
                <SelectItem value="member">Sort: Member name</SelectItem>
                <SelectItem value="plan">Sort: Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto rounded-md border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Sport</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead>Usage</TableHead>
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
                        <span className="font-medium">{m.member}</span>
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{m.plan}</TableCell>
                    <TableCell className="text-muted-foreground">{m.sport}</TableCell>
                    <TableCell className="numeric text-muted-foreground">{m.start}</TableCell>
                    <TableCell className="numeric">{m.expiry}</TableCell>
                    <TableCell className="numeric text-muted-foreground">
                      {m.visitsUsed} / {m.visitsIncluded}
                    </TableCell>
                    <TableCell><StatusBadge status={m.status} /></TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                      No memberships match these filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AdminNote>
        Memberships are created, renewed, priced and cancelled by Admin. {CONTACT_ADMIN}
      </AdminNote>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.member}</SheetTitle>
                <SheetDescription>{active.plan} · {active.sport}</SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.status} />
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  {[
                    ["Plan", active.plan],
                    ["Sport", active.sport],
                    ["Start date", active.start],
                    ["Expiry date", active.expiry],
                    ["Visits used", `${active.visitsUsed} / ${active.visitsIncluded}`],
                    ["Last visit", active.lastVisit],
                    ["Contact", active.maskedPhone],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="label-caps">{k}</dt>
                      <dd className="mt-0.5 font-medium">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div>
                  <p className="label-caps mb-2">Plan benefits</p>
                  <ul className="space-y-2">
                    {active.benefits.map((b) => (
                      <li
                        key={b}
                        className="rounded-md border border-border bg-surface px-3 py-2 text-xs text-muted-foreground"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <AdminNote>
                  Plan price, duration and benefits cannot be changed by the Manager. {CONTACT_ADMIN}
                </AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
