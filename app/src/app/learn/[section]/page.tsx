import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shell/PageHeader";
import { DataSlot } from "@/components/shell/DataSlot";
import { getNavItem } from "@/lib/nav";

export function generateStaticParams() {
  return getNavItem("learn")!.sub!.map((s) => ({ section: s.slug }));
}

export default async function LearnSection({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const item = getNavItem("learn")!;
  const sub = item.sub!.find((s) => s.slug === section);
  if (!sub) notFound();

  return (
    <main className="pb-28">
      <PageHeader item={item} crumb={sub.title} />
      <section className="mx-auto max-w-6xl px-5 pt-12">
        <DataSlot
          title={`${sub.title} — lessons`}
          note="Concept lessons, notes and worked examples for this section will be added here step by step."
          hue={item.hue}
        />
      </section>
    </main>
  );
}
