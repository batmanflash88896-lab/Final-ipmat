import { Hero } from "@/components/home/Hero";
import { OptionCard } from "@/components/shell/OptionCard";
import { Reveal } from "@/components/shell/Reveal";
import { NAV } from "@/lib/nav";

export default function Home() {
  return (
    <main className="pb-28">
      <Hero />

      {/* Explore — the 6 pillars as 3D tilt cards */}
      <section id="explore" className="mx-auto max-w-6xl px-5 pt-6">
        <Reveal className="mb-10 text-center">
          <span className="text-sm font-medium text-primary">
            Everything you need
          </span>
          <h2 className="mt-2 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Six pillars of your preparation
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Pick where to begin. Each space is built to go deep — content gets
            filled in section by section.
          </p>
        </Reveal>

        <div className="grid gap-5 [perspective:1600px] sm:grid-cols-2 lg:grid-cols-3">
          {NAV.map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.06} className="h-full">
              <OptionCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing band */}
      <section className="mx-auto mt-28 max-w-6xl px-5">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass-strong p-10 text-center depth-shadow sm:p-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-40 blur-3xl"
              style={{
                background:
                  "radial-gradient(50% 60% at 50% 0%, var(--color-primary), transparent 70%)",
              }}
            />
            <h2 className="relative text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Your countdown has already started.
            </h2>
            <p className="relative mx-auto mt-3 max-w-lg text-muted-foreground">
              Set your exam date, and we&apos;ll shape a day-by-day strategy
              around it.
            </p>
            <a
              href="/planner"
              className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-accent to-accent/80 px-6 py-3 font-medium text-accent-foreground shadow-[0_16px_40px_-12px_var(--color-accent)] transition-transform hover:scale-[1.03] active:scale-95"
            >
              Open the planner
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
