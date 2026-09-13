import { SectionLanding } from "@/components/shell/SectionLanding";
import { getNavItem } from "@/lib/nav";

export default function MockPage() {
  const item = getNavItem("mock")!;
  return <SectionLanding item={item} subhead="How do you want to test yourself?" />;
}
