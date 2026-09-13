import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shell/PageHeader";
import { DataSlot } from "@/components/shell/DataSlot";
import { Reveal } from "@/components/shell/Reveal";
import { Icon } from "@/components/shell/Icon";
import { getNavItem, IIMS } from "@/lib/nav";

export function generateStaticParams() {
  return getNavItem("mock")!.sub!.map((s) => ({ mode: s.slug }));
}

export default async function MockMode({
  params,
}: {
  params: Promise<{ mode: string }>;
}) {
  const { mode } = await params;
  const item = getNavItem("mock")!;
  const sub = item.sub!.find((s) => s.slug === mode);
  if (!sub) notFound();

  return (
    <main className="pb-28">
      <PageHeader item={item} crumb={sub.title} />
      <section className="mx-auto max-w-6xl px-5 pt-12">
        {mode === "iims" ? (
          <>
            <Reveal className="mb-6">
              <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Pick an institute&apos;s pattern
              </h2>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {IIMS.map((iim, i) => (
                <Reveal key={iim.code} delay={i * 0.05}>
                  <div
                    className="group relative flex items-center gap-4 overflow-hidden rounded-2xl p-5 glass transition-all duration-300 hover:-translate-y-1 hover:depth-shadow"
                    style={
                      { ["--h" as string]: item.hue } as React.CSSProperties
                    }
                  >
                    <div
                      className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60"
                      style={{ background: "var(--h)" }}
                    />
                    <span
                      className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl text-xs font-semibold ring-1 ring-white/10"
                      style={{
                        background:
                          "color-mix(in oklch, var(--h) 22%, transparent)",
                      }}
                    >
                      {iim.code.replace("IIM-", "")}
                    </span>
                    <div className="relative min-w-0">
                      <h3 className="truncate font-semibold">{iim.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {iim.city}
                      </p>
                    </div>
                    <Icon
                      name="ArrowUpRight"
                      className="relative ml-auto h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
            <div className="mt-8">
              <DataSlot
                title="Mock papers"
                note="Full-length, pattern-matched mock papers for each institute will be added here step by step."
                hue={item.hue}
              />
            </div>
          </>
        ) : (
          <DataSlot
            title="Topic-wise mocks"
            note="Compact mocks scoped to a single topic or skill will be added here step by step."
            hue={item.hue}
          />
        )}
      </section>
    </main>
  );
}
