import { createFileRoute } from "@tanstack/react-router";
import { CalendarRange, IndianRupee, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

import { OperationsChart, SharePie } from "@/components/manager/charts";
import { AdminNote, PageHeader } from "@/components/manager/page-header";
import { StatCard } from "@/components/manager/stat-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  bookingsByHour,
  coaches,
  courts,
  hourlyRevenue,
  inr,
  members,
  popularServices,
  revenueToday,
  utilizationByCourt,
  weeklyBookings,
} from "@/lib/demo-data";

export const Route = createFileRoute("/_shell/reports")({
  head: () => ({
    meta: [
      { title: "Operational Reports — TOP SPORTS Manager" },
      {
        name: "description",
        content:
          "Booking, facility, coach and member insights for your assigned TOP SPORTS centre, with a high-level operational revenue snapshot.",
      },
      { property: "og:title", content: "Operational Reports — TOP SPORTS Manager" },
      {
        property: "og:description",
        content: "View-only operational insight reports for facility managers.",
      },
    ],
  }),
  component: ReportsPage,
});

function ReportsPage() {
  const [range, setRange] = useState("7d");

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports & insights"
        description="Operational reporting for your assigned facility. Detailed financial analytics are not part of Manager access."
      >
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-[170px]">
            <CalendarRange className="mr-1.5 size-3.5" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
          </SelectContent>
        </Select>
      </PageHeader>

      <Tabs defaultValue="bookings">
        <TabsList className="flex w-full flex-wrap justify-start">
          <TabsTrigger value="bookings">Booking insights</TabsTrigger>
          <TabsTrigger value="facility">Facility insights</TabsTrigger>
          <TabsTrigger value="coach">Coach insights</TabsTrigger>
          <TabsTrigger value="member">Member activity</TabsTrigger>
          <TabsTrigger value="revenue">Revenue snapshot</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-6 pt-5">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard label="Total bookings" value="288" hint="Last 7 days" icon={TrendingUp} />
            <StatCard label="Completed" value="263" tone="success" />
            <StatCard label="Cancelled" value="17" tone="warning" />
            <StatCard label="No-shows" value="8" tone="danger" />
            <StatCard label="Peak hour" value="6–7 PM" hint="11 bookings today" tone="brand" />
          </section>
          <div className="grid gap-6 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Weekly booking trend</CardTitle>
                <CardDescription>Booked vs completed sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <OperationsChart
                  type="bar"
                  data={weeklyBookings}
                  xKey="day"
                  series={[
                    { key: "bookings", label: "Booked", color: "var(--color-chart-2)" },
                    { key: "completed", label: "Completed", color: "var(--color-chart-3)" },
                  ]}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Popular services</CardTitle>
                <CardDescription>Share of bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <SharePie data={popularServices} />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Peak hours</CardTitle>
              <CardDescription>Booking density across the operating day</CardDescription>
            </CardHeader>
            <CardContent>
              <OperationsChart
                type="area"
                data={bookingsByHour}
                xKey="hour"
                series={[{ key: "bookings", label: "Bookings", color: "var(--color-chart-1)" }]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facility" className="space-y-6 pt-5">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Average utilisation" value="61%" hint="Across 5 courts" />
            <StatCard label="Peak facility" value="Court 4" hint="91% utilised today" tone="brand" />
            <StatCard label="Available capacity" value="39%" tone="success" />
            <StatCard label="Maintenance hours" value="4 hrs" hint="Court 3 today" tone="warning" />
          </section>
          <Card>
            <CardHeader>
              <CardTitle>Court utilisation</CardTitle>
              <CardDescription>Share of operating hours used</CardDescription>
            </CardHeader>
            <CardContent>
              <OperationsChart
                type="bar"
                layout="horizontal"
                data={utilizationByCourt}
                xKey="court"
                series={[{ key: "utilization", label: "Utilisation %", color: "var(--color-chart-2)" }]}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Usage trend by court</CardTitle>
              <CardDescription>Current operating status and load</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courts.map((c) => (
                <div key={c.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">
                      {c.name} <span className="text-muted-foreground">· {c.sport}</span>
                    </span>
                    <span className="numeric font-semibold">{c.utilization}%</span>
                  </div>
                  <Progress value={c.utilization} className="h-1.5" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="coach" className="space-y-6 pt-5">
          <Card>
            <CardHeader>
              <CardTitle>Coach activity</CardTitle>
              <CardDescription>Sessions and utilisation at this facility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-md border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Coach</TableHead>
                      <TableHead>Primary sport</TableHead>
                      <TableHead>Today&apos;s sessions</TableHead>
                      <TableHead>Upcoming</TableHead>
                      <TableHead>Utilisation</TableHead>
                      <TableHead>Top service</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coaches.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="text-muted-foreground">{c.sport}</TableCell>
                        <TableCell className="numeric">{c.todaySessions}</TableCell>
                        <TableCell className="numeric">{c.upcomingSessions}</TableCell>
                        <TableCell className="numeric">{c.utilization}%</TableCell>
                        <TableCell className="text-muted-foreground">{c.services[0]}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Coach utilisation</CardTitle>
              <CardDescription>Booked hours against available shift hours</CardDescription>
            </CardHeader>
            <CardContent>
              <OperationsChart
                type="bar"
                layout="horizontal"
                data={coaches.map((c) => ({ coach: c.name, utilization: c.utilization }))}
                xKey="coach"
                series={[{ key: "utilization", label: "Utilisation %", color: "var(--color-chart-4)" }]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="member" className="space-y-6 pt-5">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Active members" value={String(members.filter((m) => m.status === "Active").length)} icon={Users} tone="success" />
            <StatCard label="Repeat bookings" value="74%" hint="Members with 2+ bookings" />
            <StatCard label="Most popular sport" value="Badminton" tone="brand" />
            <StatCard label="New members this week" value="6" />
          </section>
          <Card>
            <CardHeader>
              <CardTitle>Member activity</CardTitle>
              <CardDescription>Booking volume by member at this facility</CardDescription>
            </CardHeader>
            <CardContent>
              <OperationsChart
                type="bar"
                data={members.map((m) => ({ member: m.name.split(" ")[0], bookings: m.totalBookings }))}
                xKey="member"
                series={[{ key: "bookings", label: "Bookings", color: "var(--color-chart-5)" }]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6 pt-5">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Today's revenue" value={inr(revenueToday.total)} icon={IndianRupee} tone="success" />
            <StatCard label="Cash" value={inr(revenueToday.cash)} />
            <StatCard label="Online" value={inr(revenueToday.online)} tone="brand" />
            <StatCard label="Pending" value={inr(revenueToday.pending)} tone="warning" />
          </section>
          <Card>
            <CardHeader>
              <CardTitle>Operational revenue flow</CardTitle>
              <CardDescription>High-level snapshot only — no accounting detail</CardDescription>
            </CardHeader>
            <CardContent>
              <OperationsChart
                type="area"
                data={hourlyRevenue}
                xKey="hour"
                series={[{ key: "revenue", label: "Revenue (₹)", color: "var(--color-chart-3)" }]}
              />
            </CardContent>
          </Card>
          <AdminNote>
            Profit &amp; loss, payroll and financial statements are not available to Managers.
          </AdminNote>
        </TabsContent>
      </Tabs>

      <AdminNote>Reports are view-only. Contact Admin for data corrections or exports.</AdminNote>
    </div>
  );
}
