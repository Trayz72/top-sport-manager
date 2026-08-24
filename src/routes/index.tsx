import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Building2, Loader2, Lock, Mail, Shield, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

import { TopSportsMark } from "@/components/manager/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FACILITY } from "@/lib/demo-data";
import { getSession, signIn } from "@/lib/manager-auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manager Login — TOP SPORTS Facility Operations" },
      {
        name: "description",
        content:
          "Secure TOP SPORTS Manager login for facility operations monitoring: bookings, schedules, courts, coaches and daily revenue snapshots.",
      },
      { property: "og:title", content: "Manager Login — TOP SPORTS Facility Operations" },
      {
        property: "og:description",
        content:
          "Sign in to the TOP SPORTS Manager app to monitor your assigned sports facility in real time.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [method, setMethod] = useState<"mobile" | "email">("mobile");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"identify" | "otp">("identify");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (getSession()) navigate({ to: "/dashboard" });
  }, [navigate]);

  const sendOtp = () => {
    const digits = identifier.replace(/\D/g, "");
    if (method === "mobile" && digits.length !== 10) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }
    if (method === "email" && identifier.trim().length < 5) {
      setError("Enter a valid registered email address.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 700);
  };

  const verify = () => {
    if (otp.length !== 6) {
      setError("Enter the 6-digit verification code.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      signIn(identifier, method);
      navigate({ to: "/dashboard" });
    }, 700);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <section className="relative hidden flex-col justify-between bg-sidebar p-12 lg:flex">
        <div className="flex items-center gap-3">
          <TopSportsMark />
          <div className="leading-tight">
            <p className="font-display text-base font-extrabold tracking-[0.14em] text-sidebar-accent-foreground">
              TOP SPORTS
            </p>
            <p className="text-[11px] font-semibold tracking-[0.22em] text-sidebar-foreground/60 uppercase">
              Manager
            </p>
          </div>
        </div>

        <div className="max-w-md space-y-6">
          <h2 className="font-display text-4xl leading-tight font-bold text-sidebar-accent-foreground">
            Facility operations,
            <span className="block text-brand">clearly monitored.</span>
          </h2>
          <p className="text-sm leading-relaxed text-sidebar-foreground/70">
            A dedicated monitoring workspace for facility managers — live court status,
            bookings, coach schedules, café operations and today&apos;s payment snapshot
            for your assigned centre.
          </p>
          <ul className="space-y-3 text-sm text-sidebar-foreground/80">
            {[
              "Real-time court and session visibility",
              "Booking, coach and member operational overview",
              "Today's cash and online collection snapshot",
              "View-only access — Admin handles all changes",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="flex items-center gap-2 text-xs text-sidebar-foreground/55">
          <Building2 className="size-3.5" /> {FACILITY.name}
        </p>
      </section>

      <section className="flex items-center justify-center bg-background px-5 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <TopSportsMark />
            <div className="leading-tight">
              <p className="font-display text-sm font-extrabold tracking-[0.14em]">
                TOP SPORTS
              </p>
              <p className="text-[10px] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                Manager
              </p>
            </div>
          </div>

          <h1 className="font-display text-2xl font-bold">Manager login</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Sign in with your registered manager credentials.
          </p>

          <div className="mt-7 rounded-xl border border-border bg-card p-6 shadow-card">
            {step === "identify" ? (
              <div className="space-y-5">
                <Tabs
                  value={method}
                  onValueChange={(v) => {
                    setMethod(v as "mobile" | "email");
                    setIdentifier("");
                    setError("");
                  }}
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="mobile">
                      <Smartphone className="mr-1.5 size-3.5" /> Mobile
                    </TabsTrigger>
                    <TabsTrigger value="email">
                      <Mail className="mr-1.5 size-3.5" /> Email
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="space-y-2">
                  <Label htmlFor="identifier">
                    {method === "mobile" ? "Registered mobile number" : "Work email"}
                  </Label>
                  <Input
                    id="identifier"
                    type="tel"
                    inputMode={method === "mobile" ? "tel" : "email"}
                    maxLength={method === "mobile" ? 10 : undefined}
                    placeholder={
                      method === "mobile" ? "98765 43210" : "manager@topsports.in"
                    }
                    value={identifier}
                    onChange={(e) => {
                      const value = e.target.value;
                      setIdentifier(method === "mobile" ? value.replace(/\D/g, "").slice(0, 10) : value);
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password (optional)</Label>
                  <div className="relative">
                    <Lock className="absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-9"
                      placeholder="Enter password if enabled"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {error && <p className="text-xs font-medium text-destructive">{error}</p>}

                <Button className="w-full" onClick={sendOtp} disabled={loading}>
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      Send verification code <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold">Verify it&apos;s you</p>
                  <p className="text-xs text-muted-foreground">
                    A 6-digit code was sent to{" "}
                    <span className="font-medium text-foreground">{identifier}</span>.
                    Demo code: any 6 digits.
                  </p>
                </div>

                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                {error && <p className="text-xs font-medium text-destructive">{error}</p>}

                <Button className="w-full" onClick={verify} disabled={loading}>
                  {loading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <>
                      Verify &amp; continue <ArrowRight className="size-4" />
                    </>
                  )}
                </Button>
                <button
                  type="button"
                  className="w-full text-xs text-muted-foreground underline-offset-4 hover:underline"
                  onClick={() => {
                    setStep("identify");
                    setOtp("");
                    setError("");
                  }}
                >
                  Use a different {method === "mobile" ? "number" : "email"}
                </button>
              </div>
            )}
          </div>

          <p className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
            <Shield className="mt-px size-3.5 shrink-0 text-info" />
            Manager access is scoped to a single assigned facility and is monitoring-only.
            Operational changes are performed by Admin.
          </p>
        </div>
      </section>
    </div>
  );
}
