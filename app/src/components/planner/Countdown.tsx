"use client";

import { useEffect, useMemo, useState } from "react";

/** A local, client-side countdown. Exam date is editable and stored locally. */
export function Countdown({ hue }: { hue: string }) {
  const [target, setTarget] = useState<string>("");
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const saved = localStorage.getItem("ipmat:examDate");
    if (saved) setTarget(saved);
    else {
      // sensible default: ~1 May next cycle
      const d = new Date();
      const year = d.getMonth() > 4 ? d.getFullYear() + 1 : d.getFullYear();
      setTarget(`${year}-05-01`);
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const parts = useMemo(() => {
    if (!target) return null;
    const end = new Date(`${target}T09:00:00`).getTime();
    const diff = Math.max(0, end - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return { days, hours, mins, secs };
  }, [target, now]);

  const onChange = (v: string) => {
    setTarget(v);
    localStorage.setItem("ipmat:examDate", v);
  };

  const cells = parts
    ? [
        { label: "Days", value: parts.days },
        { label: "Hours", value: parts.hours },
        { label: "Minutes", value: parts.mins },
        { label: "Seconds", value: parts.secs },
      ]
    : [];

  return (
    <div
      className="relative overflow-hidden rounded-2xl glass-strong p-6 depth-shadow sm:p-8"
      style={{ ["--h" as string]: hue } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--h)" }}
      />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium" style={{ color: "var(--h)" }}>
            Countdown to exam day
          </p>
          <h2 className="mt-1 text-2xl font-semibold">Days left</h2>
        </div>
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          Exam date
          <input
            type="date"
            value={target}
            onChange={(e) => onChange(e.target.value)}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-foreground outline-none transition-colors focus:border-white/25 [color-scheme:dark]"
          />
        </label>
      </div>

      <div className="relative mt-6 grid grid-cols-4 gap-3">
        {cells.map((c) => (
          <div
            key={c.label}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center"
          >
            <div className="text-3xl font-semibold tabular-nums sm:text-4xl">
              {String(c.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
