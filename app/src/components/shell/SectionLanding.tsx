import { PageHeader } from "./PageHeader";
import { SubOptionCard } from "./SubOptionCard";
import { Reveal } from "./Reveal";
import type { NavItem } from "@/lib/nav";

/** A section page that presents its sub-options as a grid of cards. */
export function SectionLanding({
  item,
  subhead,
}: {
  item: NavItem;
  subhead?: string;
}) {
  return (
    <main className="pb-28">
      <PageHeader item={item} />
      <section className="mx-auto max-w-6xl px-5 pt-12">
        {subhead && (
          <Reveal className="mb-6">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              {subhead}
            </h2>
          </Reveal>
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {item.sub?.map((sub, i) => (
            <Reveal key={sub.slug} delay={i * 0.07} className="h-full">
              <SubOptionCard
                sub={sub}
                href={`/${item.slug}/${sub.slug}`}
                hue={item.hue}
                index={i + 1}
              />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
