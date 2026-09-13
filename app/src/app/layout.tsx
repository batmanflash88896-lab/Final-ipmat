import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Final IPMAT — UI stack",
  description:
    "Magic UI, SmoothUI, Neobrutalism, motion-primitives, unlumen UI and the 21st.dev MCP server, all installed and wired.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
