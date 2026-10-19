import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LiquidBackdrop from "./components/LiquidBackdrop";
import SmoothScroll from "./components/SmoothScroll";

// One family for the whole site (DESIGN.md): Jakarta-made, 800 for headlines, 400-600 for text.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const description =
  "Steam, EA, and Ubisoft games activated on your own account with the Atlas Tools app. Order through Tokopedia or Shopee.";

export const metadata: Metadata = {
  title: "Atlas Game Shop",
  description,
  keywords: ["atlas tools", "steam games", "gaming tools", "game shop indonesia", "atlas game shop"],
  authors: [{ name: "Atlas Game Shop" }],
  openGraph: {
    title: "Atlas Game Shop",
    description,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="antialiased">
        <LiquidBackdrop />
        <SmoothScroll />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
