import { createFileRoute } from "@tanstack/react-router";
import { Megaphone, Search } from "lucide-react";
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
import { CONTACT_ADMIN } from "@/lib/permissions";
import { announcements, type Announcement } from "@/lib/ops-data";

export const Route = createFileRoute("/_shell/announcements")({
  head: () => ({
    meta: [
      { title: "Announcements — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Published club notices for your assigned TOP SPORTS centre — court closures, holiday timings, maintenance notices and coaching updates.",
      },
      { property: "og:title", content: "Announcements — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "Read-only club announcements for facility managers.",
      },
    ],
  }),
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [active, setActive] = useState<Announcement | null>(null);

  const categories = Array.from(new Set(announcements.map((a) => a.category)));

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return announcements.filter(
      (a) =>
        (!q || a.title.toLowerCase().includes(q) || a.preview.toLowerCase().includes(q)) &&
        (category === "all" || a.category === category) &&
        (status === "all" || a.status === status),
    );
  }, [query, category, status]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Announcements"
        description="Notices published by Admin for your assigned facility. This is a read-only information area."
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total notices" value={String(announcements.length)} icon={Megaphone} />
        <StatCard
          label="Published"
          value={String(announcements.filter((a) => a.status === "Published").length)}
          tone="success"
        />
        <StatCard
          label="Expired"
          value={String(announcements.filter((a) => a.status === "Expired").length)}
          tone="warning"
        />
      </section>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-3 md:grid-cols-[1fr_200px_180px]">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Search announcements…"
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
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Expired">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <ul className="space-y-3">
            {rows.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => setActive(a)}
                  className="w-full rounded-lg border border-border bg-card p-4 text-left shadow-card transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-raised"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-display text-base font-bold">{a.title}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {a.category} · {a.date} · {a.author}
                      </p>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{a.preview}</p>
                </button>
              </li>
            ))}
            {rows.length === 0 && (
              <li className="rounded-md border border-dashed border-border px-3 py-12 text-center text-sm text-muted-foreground">
                No announcements match these filters.
              </li>
            )}
          </ul>
        </CardContent>
      </Card>

      <AdminNote>
        Announcements are published by Admin only. {CONTACT_ADMIN}
      </AdminNote>

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="font-display">{active.title}</SheetTitle>
                <SheetDescription>
                  {active.category} · {active.date}
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-5 px-4 pb-6">
                <StatusBadge status={active.status} />
                <p className="text-sm leading-relaxed text-foreground">{active.body}</p>
                <dl className="grid grid-cols-2 gap-4 rounded-lg border border-border bg-surface p-4 text-sm">
                  <div>
                    <dt className="label-caps">Published by</dt>
                    <dd className="mt-0.5 font-medium">{active.author}</dd>
                  </div>
                  <div>
                    <dt className="label-caps">Date</dt>
                    <dd className="mt-0.5 font-medium">{active.date}</dd>
                  </div>
                </dl>
                <AdminNote>This notice is read-only for Managers. {CONTACT_ADMIN}</AdminNote>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
