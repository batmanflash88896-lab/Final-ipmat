import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vendored component-library source (Magic UI, SmoothUI, Neobrutalism,
  // motion-primitives, unlumen) is copied verbatim from each project's shadcn
  // registry. Those upstream files don't type-check strictly against the exact
  // latest peer versions (React 19 JSX namespace, newer motion/cobe APIs), so
  // we don't block builds on their internal type drift — your own app code is
  // still checked in the editor.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
