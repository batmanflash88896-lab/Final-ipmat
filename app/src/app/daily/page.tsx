import { SectionLanding } from "@/components/shell/SectionLanding";
import { getNavItem } from "@/lib/nav";

export default function DailyPage() {
  const item = getNavItem("daily")!;
  return <SectionLanding item={item} subhead="Today's practice" />;
}
