import Link from "next/link";
import { Icon } from "./Icon";
import type { SubItem } from "@/lib/nav";

export function SubOptionCard({
  sub,
  href,
  hue,
  index,
}: {
  sub: SubItem;
  href: string;
  hue: string;
  index: number;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl p-6 glass transition-all duration-300 hover:-translate-y-1 hover:depth-shadow"
      style={{ ["--h" as string]: hue } as React.CSSProperties}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: "var(--h)" }}
      />
      <div className="relative flex items-center justify-between">
        <span
          className="rounded-lg px-2.5 py-1 text-xs font-medium ring-1 ring-white/10"
          style={{ background: "color-mix(in oklch, var(--h) 22%, transparent)" }}
        >
          {sub.slug.toUpperCase()}
        </span>
        <span className="font-mono text-xs text-muted-foreground">
          0{index}
        </span>
      </div>
      <h3 className="relative mt-4 text-lg font-semibold tracking-tight">
        {sub.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
        {sub.desc}
      </p>
      <div className="relative mt-5 flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground">
        <span>Open</span>
        <Icon
          name="ArrowRight"
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
