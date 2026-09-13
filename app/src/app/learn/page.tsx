import { SectionLanding } from "@/components/shell/SectionLanding";
import { getNavItem } from "@/lib/nav";

export default function LearnPage() {
  const item = getNavItem("learn")!;
  return <SectionLanding item={item} subhead="Choose a section to learn" />;
}
