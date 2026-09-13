import { SectionLanding } from "@/components/shell/SectionLanding";
import { getNavItem } from "@/lib/nav";

export default function PracticePage() {
  const item = getNavItem("practice")!;
  return <SectionLanding item={item} subhead="Choose a section to practice" />;
}
