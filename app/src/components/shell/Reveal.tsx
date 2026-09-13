"use client";

import { InView } from "@/components/motion-primitives/in-view";

/** Scroll-reveal on viewport enter. Small y-offset so it reads as a fade-up. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
}) {
  return (
    <InView
      as="div"
      className={className}
      once={once}
      viewOptions={{ margin: "0px 0px -12% 0px" }}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(6px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
      }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </InView>
  );
}
