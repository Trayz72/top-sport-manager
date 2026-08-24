import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BadgeCheck,
  Bell,
  CalendarCheck,
  CalendarDays,
  Dumbbell,
  ChefHat,
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  LogOut,
  MapPin,
  Megaphone,
  Menu,
  PackageSearch,
  PartyPopper,
  PieChart,
  Search,
  Shield,
  ShoppingBag,
  UserRound,
  Users,
  Volleyball,
  Wallet,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { TopSportsWordmark } from "@/components/manager/brand";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FACILITY, MANAGER, notifications } from "@/lib/demo-data";
import { getSession, signOut } from "@/lib/manager-auth";
import { cn } from "@/lib/utils";

const nav = [
  {
    section: "Overview",
    items: [{ to: "/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    section: "Operations",
    items: [
      { to: "/bookings", label: "Bookings", icon: ClipboardList },
      { to: "/schedule", label: "Schedule", icon: CalendarDays },
      { to: "/attendance", label: "Attendance", icon: CalendarCheck },
      { to: "/facilities", label: "Facilities & Resources", icon: MapPin },
      { to: "/coaches", label: "Coaches", icon: Volleyball },
      { to: "/services", label: "Services", icon: Wallet },
    ],
  },
  {
    section: "People",
    items: [{ to: "/members", label: "Members", icon: Users }],
  },
  {
    section: "Business",
    items: [
      { to: "/memberships", label: "Memberships / Club Pass", icon: BadgeCheck },
      { to: "/equipment", label: "Equipment", icon: Dumbbell },
      { to: "/merchandise", label: "Merchandise", icon: ShoppingBag },
    ],
  },
  {
    section: "Food / Café",
    items: [{ to: "/cafe", label: "Orders", icon: ChefHat }],
  },
  {
    section: "Community",
    items: [
      { to: "/events", label: "Events", icon: PartyPopper },
      { to: "/announcements", label: "Announcements", icon: Megaphone },
      { to: "/lost-found", label: "Lost & Found", icon: PackageSearch },
    ],
  },
  {
    section: "Finance view",
    items: [{ to: "/payments", label: "Payments & Revenue", icon: CreditCard }],
  },
  {
    section: "Insights",
    items: [{ to: "/reports", label: "Reports", icon: PieChart }],
  },
  {
    section: "System",
    items: [
      { to: "/notifications", label: "Notifications", icon: Bell },
      { to: "/activity", label: "Activity", icon: Activity },
    ],
  },
  {
    section: "Account",
    items: [{ to: "/profile", label: "Profile", icon: UserRound }],
  },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center border-b border-sidebar-border px-5">
        <TopSportsWordmark />
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-5">
        {nav.map((group) => (
          <div key={group.section}>
            <p className="px-2 pb-2 text-[10px] font-semibold tracking-[0.16em] text-sidebar-foreground/45 uppercase">
              {group.section}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={onNavigate}
                    className="flex items-center gap-3 rounded-md px-2.5 py-2 text-sm font-medium text-sidebar-foreground/85 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    activeProps={{
                      className:
                        "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0_0_var(--color-sidebar-primary)]",
                    }}
                  >
                    <item.icon className="size-4 shrink-0 opacity-80" />
                    <span className="flex-1">{item.label}</span>
                    {item.to === "/notifications" && unread > 0 && (
                      <span className="rounded-full bg-sidebar-primary px-1.5 py-0.5 text-[10px] font-bold text-sidebar-primary-foreground">
                        {unread}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-start gap-2 rounded-md bg-sidebar-accent/60 p-3 text-[11px] leading-relaxed text-sidebar-foreground/75">
          <Shield className="mt-px size-3.5 shrink-0 text-sidebar-primary" />
          <span>
            Monitoring access for {FACILITY.shortName}. Changes are handled by Admin.
          </span>
        </div>
      </div>
    </div>
  );
}

export function ManagerShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!getSession()) {
      navigate({ to: "/" });
      return;
    }
    setReady(true);
  }, [navigate]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="size-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
          Loading facility workspace…
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-sidebar-border lg:block">
        <SidebarContent />
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-surface/95 px-4 backdrop-blur md:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="size-5" />
                <span className="sr-only">Open navigation</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 border-sidebar-border p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <SidebarContent onNavigate={() => setOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-sm font-bold text-foreground">
              {FACILITY.name}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              Operations monitoring · {FACILITY.hours}
            </p>
          </div>

          <div className="hidden items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground md:flex">
            <Search className="size-4" />
            <span className="text-xs">Search bookings, members, coaches</span>
          </div>

          <Link
            to="/notifications"
            className="relative rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Bell className="size-5" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 size-2 rounded-full bg-brand" />
            )}
            <span className="sr-only">Notifications</span>
          </Link>

          <Link
            to="/profile"
            className="flex items-center gap-2 rounded-md px-1.5 py-1 transition-colors hover:bg-accent"
          >
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                {MANAGER.initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-xs font-semibold text-foreground">
                {MANAGER.name}
              </span>
              <span className="block text-[11px] text-muted-foreground">
                {MANAGER.role}
              </span>
            </span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              signOut();
              navigate({ to: "/" });
            }}
            title="Sign out"
          >
            <LogOut className="size-4" />
            <span className="sr-only">Sign out</span>
          </Button>
        </header>

        <main className={cn("mx-auto w-full max-w-[1500px] space-y-6 p-4 md:p-6")}>
          {children}
        </main>
      </div>
    </div>
  );
}
