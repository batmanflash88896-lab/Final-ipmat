"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3">
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-300",
          scrolled ? "glass-strong depth-shadow" : "glass"
        )}
      >
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-primary/20 ring-1 ring-white/10">
            <span className="h-3.5 w-3.5 rotate-45 rounded-[3px] bg-gradient-to-br from-primary to-accent shadow-[0_0_16px_var(--color-primary)]" />
          </span>
          <span className="text-lg font-semibold tracking-tight">
            IPMAT<span className="text-primary">.</span>
            <span className="text-muted-foreground font-normal"> prep</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname?.startsWith(`/${item.slug}`);
            return (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "bg-white/10 text-foreground"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </div>

        <Link
          href="/planner"
          className="rounded-lg bg-gradient-to-br from-primary to-primary/80 px-3.5 py-1.5 text-sm font-medium text-primary-foreground shadow-[0_8px_24px_-8px_var(--color-primary)] transition-transform hover:scale-[1.03] active:scale-95"
        >
          Start prep
        </Link>
      </nav>
    </header>
  );
}
