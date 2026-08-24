// Simulated Manager authentication for the prototype.
// Designed so a real backend (mobile + OTP / email + OTP / password) can
// replace these helpers without touching UI code.

const KEY = "topsports.manager.session";

export type ManagerSession = {
  identifier: string;
  method: "mobile" | "email";
  facilityId: string;
  loggedInAt: number;
};

export function getSession(): ManagerSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ManagerSession) : null;
  } catch {
    return null;
  }
}

export function signIn(identifier: string, method: "mobile" | "email") {
  const session: ManagerSession = {
    identifier,
    method,
    facilityId: "fac-ahm-01",
    loggedInAt: Date.now(),
  };
  window.localStorage.setItem(KEY, JSON.stringify(session));
  return session;
}

export function signOut() {
  window.localStorage.removeItem(KEY);
}
