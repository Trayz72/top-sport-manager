// Manager permission model.
//
// The Manager role is VIEW + MONITOR + INFORM ADMIN. Every mutating capability
// is OFF by default. The shape below is intentionally granular so that an
// Admin/Owner permission system can later flip individual flags per manager
// without any UI rewrite — components should read `can()` instead of assuming
// what a manager may do.

export type PermissionKey =
  // read scopes
  | "bookings.view"
  | "schedule.view"
  | "attendance.view"
  | "facilities.view"
  | "resources.view"
  | "coaches.view"
  | "services.view"
  | "members.view"
  | "members.viewMobile"
  | "members.viewEmail"
  | "memberships.view"
  | "equipment.view"
  | "merchandise.view"
  | "cafe.view"
  | "events.view"
  | "announcements.view"
  | "lostfound.view"
  | "payments.view"
  | "reports.view"
  | "notifications.view"
  | "activity.view"
  // write scopes (reserved for future Admin grants)
  | "bookings.create"
  | "bookings.edit"
  | "bookings.reschedule"
  | "bookings.cancel"
  | "attendance.edit"
  | "facilities.block"
  | "facilities.changeStatus"
  | "facilities.scheduleMaintenance"
  | "memberships.manage"
  | "events.manage"
  | "announcements.manage"
  | "lostfound.manage"
  | "merchandise.manage"
  | "services.changePrice";

export const MANAGER_PERMISSIONS: Record<PermissionKey, boolean> = {
  "bookings.view": true,
  "schedule.view": true,
  "attendance.view": true,
  "facilities.view": true,
  "resources.view": true,
  "coaches.view": true,
  "services.view": true,
  "members.view": true, // limited view — operational fields only
  "members.viewMobile": false,
  "members.viewEmail": false,
  "memberships.view": true,
  "equipment.view": true,
  "merchandise.view": true,
  "cafe.view": true,
  "events.view": true,
  "announcements.view": true,
  "lostfound.view": true,
  "payments.view": true, // operational view
  "reports.view": true,
  "notifications.view": true,
  "activity.view": true, // limited to the assigned facility

  "bookings.create": false,
  "bookings.edit": false,
  "bookings.reschedule": false,
  "bookings.cancel": false,
  "attendance.edit": false,
  "facilities.block": false,
  "facilities.changeStatus": false,
  "facilities.scheduleMaintenance": false,
  "memberships.manage": false,
  "events.manage": false,
  "announcements.manage": false,
  "lostfound.manage": false,
  "merchandise.manage": false,
  "services.changePrice": false,
};

/** Returns whether the signed-in manager holds a capability. */
export function can(key: PermissionKey): boolean {
  return MANAGER_PERMISSIONS[key] === true;
}

/** Standard message shown wherever a manager cannot act. */
export const CONTACT_ADMIN = "Contact Admin for changes.";
