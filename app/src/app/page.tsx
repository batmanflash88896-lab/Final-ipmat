import { Marquee } from "@/components/magicui/marquee";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Button as RetroButton } from "@/components/retroui/Button";
import { Card as RetroCard } from "@/components/retroui/Card";
import { Text as RetroText } from "@/components/retroui/Text";
import { CountUp } from "@/components/unlumen-ui/primitives/count-up";
import { GlowButton } from "@/components/unlumen-ui/primitives/glow";
import SiriOrb from "@/components/smoothui/siri-orb";
import MagneticButton from "@/components/smoothui/magnetic-button";

const libraries = [
  { name: "Magic UI", ns: "@magicui", url: "magicui.design", count: "150+" },
  { name: "SmoothUI", ns: "@smoothui", url: "smoothui.dev", count: "130+" },
  { name: "Neobrutalism", ns: "@neobrutalism", url: "neobrutalism.com", count: "40+" },
  { name: "motion-primitives", ns: "@motion-primitives", url: "motion-primitives.com", count: "35+" },
  { name: "unlumen UI", ns: "@unlumen", url: "ui.unlumen.com", count: "30+" },
  { name: "21st.dev", ns: "@21st", url: "21st.dev (MCP)", count: "MCP" },
];

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="w-full max-w-5xl mx-auto px-6 py-14 border-b border-border">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-background text-foreground">
      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto px-6 pt-24 pb-16 text-center">
        <AnimatedGradientText className="text-sm font-medium">
          🚀 UI stack installed &amp; wired
        </AnimatedGradientText>
        <h1 className="mt-6 text-5xl sm:text-6xl font-bold tracking-tight">
          Final&nbsp;<AuroraText>IPMAT</AuroraText>
        </h1>
        <div className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          <TextEffect per="word" preset="fade-in-blur">
            Six component libraries, four AI skills, and the 21st.dev MCP server —
            all installed and ready to build with.
          </TextEffect>
        </div>
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <ShimmerButton className="shadow-2xl">
            <span className="text-sm font-medium text-white">Start building</span>
          </ShimmerButton>
          <MagneticButton>
            <span className="px-6 py-3 rounded-lg border border-border font-medium inline-block">
              Explore components
            </span>
          </MagneticButton>
        </div>
      </section>

      {/* Marquee of libraries */}
      <Section
        title="Installed libraries"
        subtitle="Every registry is wired in components.json — add any component with the shadcn CLI."
      >
        <Marquee pauseOnHover className="[--duration:22s]">
          {libraries.map((lib) => (
            <div
              key={lib.name}
              className="mx-3 w-64 rounded-xl border border-border bg-card p-5"
            >
              <div className="text-lg font-semibold">{lib.name}</div>
              <div className="text-xs text-muted-foreground mt-1">{lib.url}</div>
              <div className="mt-4 flex items-center justify-between">
                <code className="text-xs rounded bg-muted px-2 py-1">{lib.ns}</code>
                <span className="text-xs text-muted-foreground">{lib.count}</span>
              </div>
            </div>
          ))}
        </Marquee>
      </Section>

      {/* Neobrutalism */}
      <Section
        title="Neobrutalism"
        subtitle="Bold, high-contrast components — @neobrutalism / retroui."
      >
        <RetroCard className="max-w-md p-6">
          <RetroText as="h3" className="text-xl font-bold mb-2">
            Neobrutalist card
          </RetroText>
          <RetroText className="text-sm mb-4">
            Copied straight from the neobrutalism registry.
          </RetroText>
          <div className="flex gap-3">
            <RetroButton>Primary</RetroButton>
            <RetroButton variant="outline">Outline</RetroButton>
          </div>
        </RetroCard>
      </Section>

      {/* unlumen + smoothui */}
      <Section
        title="unlumen UI · SmoothUI"
        subtitle="Animated primitives from @unlumen and @smoothui."
      >
        <div className="flex flex-wrap items-center gap-10">
          <div className="text-center">
            <div className="text-5xl font-bold tabular-nums">
              <CountUp to={187} />
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              components vendored (unlumen CountUp)
            </div>
          </div>
          <div className="text-center">
            <SiriOrb size="96px" />
            <div className="text-sm text-muted-foreground mt-2">
              SmoothUI Siri Orb
            </div>
          </div>
          <div className="text-center">
            <GlowButton>Glow button</GlowButton>
            <div className="text-sm text-muted-foreground mt-2">
              unlumen GlowButton
            </div>
          </div>
        </div>
      </Section>

      <footer className="w-full max-w-5xl mx-auto px-6 py-10 text-center text-sm text-muted-foreground">
        Skills installed in <code>.claude/skills/</code> · MCP config in{" "}
        <code>.mcp.json</code> · registries in <code>app/components.json</code>
      </footer>
    </main>
  );
}
