import { Outlet, createFileRoute } from "@tanstack/react-router";

import { ManagerShell } from "@/components/manager/manager-shell";

export const Route = createFileRoute("/_shell")({
  component: ShellLayout,
});

function ShellLayout() {
  return (
    <ManagerShell>
      <Outlet />
    </ManagerShell>
  );
}
