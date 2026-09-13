import Link from "next/link";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";
import type { NavItem } from "@/lib/nav";

export function PageHeader({
  item,
  crumb,
}: {
  item: NavItem;
  crumb?: string;
}) {
  return (
    <header className="relative mx-auto max-w-6xl px-5 pt-32">
      <div
        className="pointer-events-none absolute -top-6 right-8 h-56 w-56 rounded-full opacity-30 blur-3xl"
        style={{ background: item.hue }}
      />
      <Reveal>
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground/80">{item.title}</span>
          {crumb && (
            <>
              <span>/</span>
              <span className="text-foreground/80">{crumb}</span>
            </>
          )}
        </nav>

        <div className="mt-5 flex items-start gap-4">
          <span
            className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/5 ring-1 ring-white/10"
            style={{ boxShadow: `0 0 40px -12px ${item.hue}` }}
          >
            <Icon name={item.icon} className="h-7 w-7" />
          </span>
          <div>
            <div
              className="text-sm font-medium"
              style={{ color: item.hue }}
            >
              {item.tagline}
            </div>
            <h1 className="mt-0.5 text-4xl font-semibold tracking-tight sm:text-5xl">
              {item.title}
            </h1>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-muted-foreground">{item.desc}</p>
      </Reveal>
    </header>
  );
}
