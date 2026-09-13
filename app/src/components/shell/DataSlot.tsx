import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

/**
 * Placeholder for content we'll fill in step by step.
 * Keeps the design complete while signalling exactly what lands here later.
 */
export function DataSlot({
  title,
  note,
  hue,
}: {
  title: string;
  note?: string;
  hue?: string;
}) {
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-10 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-20 blur-3xl"
          style={{
            background: hue
              ? `radial-gradient(40% 60% at 50% 0%, ${hue}, transparent 70%)`
              : undefined,
          }}
        />
        <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
          <Icon name="Sparkles" className="h-6 w-6 text-muted-foreground" />
        </span>
        <h3 className="relative mt-4 text-lg font-semibold">{title}</h3>
        <p className="relative mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {note ??
            "Content for this space will be added step by step. The layout and flow are ready — real questions, lessons and data drop straight in here."}
        </p>
        <span className="relative mt-5 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground ring-1 ring-white/10">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Content coming soon
        </span>
      </div>
    </Reveal>
  );
}
