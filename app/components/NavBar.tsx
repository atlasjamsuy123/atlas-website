"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitch, useLang } from "./LanguageProvider";

// Every item points at a section that exists on the home page.
const NAV = {
  en: {
    items: [
      { label: "Tutorial", href: "tutorial" },
      { label: "Features", href: "features" },
      { label: "App", href: "showcase" },
      { label: "Download", href: "download" },
      { label: "Reviews", href: "testimonials" },
      { label: "FAQ", href: "faq" },
    ],
    games: "Games",
    order: "Order now",
    main: "Main",
  },
  id: {
    items: [
      { label: "Tutorial", href: "tutorial" },
      { label: "Fitur", href: "features" },
      { label: "Aplikasi", href: "showcase" },
      { label: "Download", href: "download" },
      { label: "Ulasan", href: "testimonials" },
      { label: "FAQ", href: "faq" },
    ],
    games: "Game",
    order: "Order sekarang",
    main: "Utama",
  },
};

/**
 * Floating navbar. Section links smooth-scroll on the home page; from any other page (e.g. /games)
 * they navigate back home to that section. It tightens up slightly once scrolled.
 */
export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const t = NAV[useLang().lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    if (!onHome) {
      router.push(`/#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav aria-label={t.main}className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 pt-3 pointer-events-none">
      <div
        className={`glass glass-blur pointer-events-auto flex w-full max-w-5xl items-center gap-1 rounded-full transition-[padding] duration-300 ${
          scrolled ? "px-2 py-1.5" : "px-3 py-2"
        }`}
      >
        <Link
          href="/"
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex min-h-11 shrink-0 items-center gap-2.5 rounded-full pl-1 pr-2 sm:pr-3"
        >
          <Image src="/images/AtlasGameShopLogo.png" alt="Atlas Game Shop" width={32} height={32} />
          <span className="hidden sm:inline text-sm font-bold text-white" aria-hidden="true">Atlas Game Shop</span>
        </Link>

        <div className="ml-auto hidden lg:flex items-center">
          {t.items.map((item) => (
            <button
              key={item.href}
              onClick={() => goTo(item.href)}
              className="min-h-11 rounded-full px-3.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>

        <Link
          href="/games"
          aria-current={pathname?.startsWith("/games") ? "page" : undefined}
          className={`ml-auto lg:ml-1 flex min-h-11 items-center rounded-full px-2.5 sm:px-3.5 text-sm font-medium transition-colors ${
            pathname?.startsWith("/games") ? "text-lavender" : "text-zinc-300 hover:text-white"
          }`}
        >
          {t.games}
        </Link>

        <button onClick={() => goTo("order")} className="glass-pill glass-pill-accent !rounded-full !px-4 text-sm whitespace-nowrap">
          {/* Phones get the one-word label so the language switch still fits */}
          <span className="sm:hidden">Order</span>
          <span className="hidden sm:inline">{t.order}</span>
        </button>

        <div className="ml-1.5">
          <LanguageSwitch />
        </div>
      </div>
    </nav>
  );
}
