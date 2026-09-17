import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atlas Game Shop - Gaming Tools & Steam Games Terpercaya",
  description: "Solusi terpercaya untuk Atlas Tools dan Steam Games. Aktivasi instan, support 24/7, dipercaya ribuan gamer Indonesia.",
  keywords: ["atlas tools", "steam games", "gaming tools", "game shop indonesia", "atlas game shop"],
  authors: [{ name: "Atlas Game Shop" }],
  openGraph: {
    title: "Atlas Game Shop - Gaming Tools Terpercaya",
    description: "Solusi terpercaya untuk Atlas Tools dan Steam Games",
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
        {children}
      </body>
    </html>
  );
}
