"use client";

import Link from "next/link";
import { Tilt } from "@/components/motion-primitives/tilt";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Icon } from "./Icon";
import type { NavItem } from "@/lib/nav";

export function OptionCard({ item }: { item: NavItem }) {
  return (
    <Tilt
      rotationFactor={8}
      springOptions={{ stiffness: 260, damping: 26 }}
      className="h-full"
      style={{ transformOrigin: "center" }}
    >
      <Link
        href={`/${item.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 glass transition-shadow duration-300 hover:depth-shadow"
        style={
          {
            // per-section accent used in gradients/glows below
            ["--h" as string]: item.hue,
          } as React.CSSProperties
        }
      >
        {/* accent wash */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-40 blur-3xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ background: "var(--h)" }}
        />

        <div className="relative flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
            <Icon
              name={item.icon}
              className="h-6 w-6"
            />
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            0{item.index}
          </span>
        </div>

        <h3 className="relative mt-5 text-xl font-semibold tracking-tight">
          {item.title}
        </h3>
        <p
          className="relative mt-0.5 text-sm font-medium"
          style={{ color: "var(--h)" }}
        >
          {item.tagline}
        </p>
        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
          {item.desc}
        </p>

        {item.sub && (
          <div className="relative mt-4 flex flex-wrap gap-1.5">
            {item.sub.map((s) => (
              <span
                key={s.slug}
                className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground ring-1 ring-white/10"
              >
                {s.title}
              </span>
            ))}
          </div>
        )}

        <div className="relative mt-auto flex items-center gap-1.5 pt-5 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
          <span>Open</span>
          <Icon
            name="ArrowRight"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </div>

        <BorderBeam
          size={90}
          duration={9}
          delay={item.index}
          colorFrom="var(--h)"
          colorTo="transparent"
          className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </Link>
    </Tilt>
  );
}
