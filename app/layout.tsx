import type { Metadata } from "next";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
