import { PageHeader } from "@/components/shell/PageHeader";
import { DataSlot } from "@/components/shell/DataSlot";
import { Reveal } from "@/components/shell/Reveal";
import { Countdown } from "@/components/planner/Countdown";
import { getNavItem } from "@/lib/nav";

export default function PlannerPage() {
  const item = getNavItem("planner")!;
  return (
    <main className="pb-28">
      <PageHeader item={item} />
      <section className="mx-auto max-w-6xl px-5 pt-12">
        <Reveal>
          <Countdown hue={item.hue} />
        </Reveal>

        <Reveal className="mt-8" delay={0.05}>
          <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Your strategy to prepare
          </h2>
        </Reveal>
        <div className="grid gap-5 lg:grid-cols-3">
          {["Foundation", "Build-up", "Final sprint"].map((phase, i) => (
            <Reveal key={phase} delay={0.1 + i * 0.06} className="h-full">
              <div className="flex h-full flex-col rounded-2xl p-6 glass">
                <span className="font-mono text-xs text-muted-foreground">
                  Phase 0{i + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{phase}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A tailored plan for this phase — daily targets across QA, LRDI
                  and VARC — is generated here once your date is set.
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8">
          <DataSlot
            title="Day-by-day strategy"
            note="Your adaptive schedule and daily checklist will be generated here from your exam date and progress."
            hue={item.hue}
          />
        </div>
      </section>
    </main>
  );
}
