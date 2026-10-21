import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LiquidBackdrop from "./components/LiquidBackdrop";
import SmoothScroll from "./components/SmoothScroll";
import LanguageProvider from "./components/LanguageProvider";
import { getLang } from "./lib/getLang";

// One family for the whole site (DESIGN.md): Jakarta-made, 800 for headlines, 400-600 for text.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const DESCRIPTION = {
  en: "Steam, EA, and Ubisoft games activated on your own account with the Atlas Tools app. Order through Tokopedia or Shopee.",
  id: "Game Steam, EA, dan Ubisoft aktif di akun kamu sendiri lewat aplikasi Atlas Tools. Order lewat Tokopedia atau Shopee.",
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getLang();
  return {
    title: "Atlas Game Shop",
    description: DESCRIPTION[lang],
    keywords: ["atlas tools", "steam games", "gaming tools", "game shop indonesia", "atlas game shop"],
    authors: [{ name: "Atlas Game Shop" }],
    openGraph: {
      title: "Atlas Game Shop",
      description: DESCRIPTION[lang],
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { lang, chosen } = await getLang();
  return (
    <html lang={lang} className={jakarta.variable}>
      <body className="antialiased">
        <LanguageProvider initialLang={lang} chosen={chosen}>
          <LiquidBackdrop />
          <SmoothScroll />
          <div className="relative z-10">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
