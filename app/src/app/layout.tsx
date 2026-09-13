import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SceneBackground } from "@/components/three/SceneBackground";
import { SiteHeader } from "@/components/shell/SiteHeader";

export const metadata: Metadata = {
  title: "IPMAT Prep — your immersive path to the IIMs",
  description:
    "A cinematic, 3D preparation platform for IPMAT: plan, learn, practice, mock, drill daily and clear doubts.",
};

export const viewport: Viewport = {
  themeColor: "#12101f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full">
        <SceneBackground />
        <SiteHeader />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
