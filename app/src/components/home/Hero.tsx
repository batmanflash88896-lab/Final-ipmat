"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Icon } from "@/components/shell/Icon";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // depth parallax as you scroll away from the hero
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col items-center justify-center px-5 pt-28 text-center"
    >
      <motion.div style={{ y, scale, opacity }} className="flex flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          Built for IPMAT 2026 aspirants
        </div>

        <h1 className="mt-7 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
          <span className="text-gradient text-glow">Crack the IPMAT</span>
          <br />
          <span className="text-foreground/90">in one immersive place</span>
        </h1>

        <div className="mt-6 max-w-2xl text-lg text-muted-foreground">
          <TextEffect per="word" preset="fade-in-blur" as="p">
            Plan your days, learn every section, practice relentlessly, take
            real mocks, and clear doubts — all inside one cinematic workspace.
          </TextEffect>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/planner"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-primary to-primary/80 px-6 py-3 font-medium text-primary-foreground shadow-[0_16px_40px_-12px_var(--color-primary)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            Build my plan
            <Icon
              name="ArrowRight"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="#explore"
            className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3 font-medium text-foreground/90 transition-colors hover:text-foreground"
          >
            Explore sections
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-8 sm:gap-14">
          {[
            { n: 6, label: "Prep pillars", suffix: "" },
            { n: 3, label: "Core sections", suffix: "" },
            { n: 100, label: "Focused on you", suffix: "%" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-semibold tabular-nums sm:text-4xl">
                <NumberTicker value={s.n} />
                {s.suffix}
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 animate-bounce rounded-full bg-white/60" />
        </div>
      </div>
    </section>
  );
}
