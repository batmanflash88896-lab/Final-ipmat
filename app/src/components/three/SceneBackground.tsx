"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

/**
 * Persistent 3D backdrop for the whole app. Fixed behind all content.
 * Falls back to a static gradient when the user prefers reduced motion or
 * WebGL isn't available.
 */
export function SceneBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // basic WebGL capability check
    let hasWebGL = false;
    try {
      const c = document.createElement("canvas");
      hasWebGL = !!(
        c.getContext("webgl2") || c.getContext("webgl")
      );
    } catch {
      hasWebGL = false;
    }
    setEnabled(!reduced && hasWebGL);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Ambient gradient base — always present, also the reduced-motion fallback */}
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 15%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%), radial-gradient(55% 45% at 85% 80%, color-mix(in oklch, var(--accent) 16%, transparent), transparent 70%)",
        }}
      />
      {enabled && <Scene3D className="absolute inset-0" />}
      {/* Legibility scrim over the 3D so foreground text stays crisp */}
      <div className="absolute inset-0 bg-background/45" />
      <div className="absolute inset-0 bg-grid opacity-[0.35]" />
      <div
        className="absolute inset-x-0 bottom-0 h-64"
        style={{
          background:
            "linear-gradient(to top, var(--background), transparent)",
        }}
      />
    </div>
  );
}
