import { PageHeader } from "@/components/shell/PageHeader";
import { Reveal } from "@/components/shell/Reveal";
import { AskForm } from "@/components/doubt/AskForm";
import { getNavItem } from "@/lib/nav";

export default function DoubtPage() {
  const item = getNavItem("doubt")!;
  return (
    <main className="pb-28">
      <PageHeader item={item} />
      <section className="mx-auto max-w-3xl px-5 pt-12">
        <Reveal>
          <AskForm hue={item.hue} />
        </Reveal>
      </section>
    </main>
  );
}
