import type { Metadata } from "next";
import "./globals.css";
import LiquidBackdrop from "./components/LiquidBackdrop";
import SmoothScroll from "./components/SmoothScroll";

export const metadata: Metadata = {
  title: "Atlas Game Shop",
  description: "Atlas Game Shop",
  keywords: ["atlas tools", "steam games", "gaming tools", "game shop indonesia", "atlas game shop"],
  authors: [{ name: "Atlas Game Shop" }],
  openGraph: {
    title: "Atlas Game Shop",
    description: "Atlas Game Shop",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <LiquidBackdrop />
        <SmoothScroll />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
