import { createFileRoute } from "@tanstack/react-router";
import { Building2, Clock, Shield } from "lucide-react";

import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FACILITY, MANAGER, courts } from "@/lib/demo-data";

export const Route = createFileRoute("/_shell/profile")({
  head: () => ({
    meta: [
      { title: "Manager Profile — TOP SPORTS" },
      {
        name: "description",
        content:
          "Manager profile with assigned TOP SPORTS facility, role scope and access permissions.",
      },
      { property: "og:title", content: "Manager Profile — TOP SPORTS" },
      {
        property: "og:description",
        content: "Profile and access scope for the assigned facility manager.",
      },
    ],
  }),
  component: ProfilePage,
});

const permissions = [
  { label: "View facility bookings, sessions and schedules", allowed: true },
  { label: "View court status and maintenance windows", allowed: true },
  { label: "View coaches, services and member activity", allowed: true },
  { label: "View today's operational revenue and payment status", allowed: true },
  { label: "View café orders and daily sales snapshot", allowed: true },
  { label: "Create, edit, cancel or reschedule bookings", allowed: false },
  { label: "Manage users, coaches or facilities", allowed: false },
  { label: "Access member contact details or full accounting", allowed: false },
];

function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Your manager account and the scope of access assigned by Admin."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="flex flex-col items-center pt-8 pb-8 text-center">
            <Avatar className="size-20">
              <AvatarFallback className="bg-primary font-display text-xl font-bold text-primary-foreground">
                {MANAGER.initials}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 font-display text-xl font-bold">{MANAGER.name}</h2>
            <p className="text-sm text-muted-foreground">{MANAGER.role}</p>
            <span className="mt-3 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-semibold text-brand">
              {FACILITY.shortName}
            </span>
            <dl className="mt-6 w-full space-y-3 text-left text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Employee ID</dt>
                <dd className="numeric font-medium">{MANAGER.employeeId}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">With TOP SPORTS</dt>
                <dd className="font-medium">Since {MANAGER.since}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Contact (masked)</dt>
                <dd className="numeric font-medium">{MANAGER.maskedPhone}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Reports to</dt>
                <dd className="font-medium">{MANAGER.reportsTo}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="size-4 text-brand" /> Assigned facility
              </CardTitle>
              <CardDescription>{FACILITY.name}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="label-caps">Location</p>
                <p className="mt-1 text-sm font-medium">{FACILITY.city}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="label-caps">Operating hours</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                  <Clock className="size-3.5 text-muted-foreground" /> {FACILITY.hours}
                </p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-4">
                <p className="label-caps">Courts monitored</p>
                <p className="numeric mt-1 text-sm font-medium">{courts.length} courts</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="size-4 text-brand" /> Access scope
              </CardTitle>
              <CardDescription>
                Manager access is monitoring-only and limited to this facility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {permissions.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center justify-between gap-3 rounded-md border border-border bg-surface px-4 py-2.5 text-sm"
                >
                  <span>{p.label}</span>
                  <span
                    className={
                      p.allowed
                        ? "rounded-full border border-success/25 bg-success/10 px-2.5 py-0.5 text-xs font-semibold text-success"
                        : "rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground"
                    }
                  >
                    {p.allowed ? "Allowed" : "Not permitted"}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <AdminNote>
            Profile details and permissions are maintained by Admin.
          </AdminNote>
        </div>
      </div>
    </div>
  );
}
