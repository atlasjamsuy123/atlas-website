"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Tutorial", href: "tutorial" },
  { label: "Features", href: "features" },
  { label: "Showcase", href: "showcase" },
  { label: "Download", href: "download" },
  { label: "FAQ", href: "faq" },
];

/**
 * Floating Liquid Glass capsule. Section links smooth-scroll on the home page; from any other page
 * (e.g. /games) they navigate back home to that section. It tightens up slightly once scrolled.
 */
export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);

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
    <nav className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 pointer-events-none">
      <div
        className={`glass glass-strong glass-blur pointer-events-auto flex items-center gap-2 md:gap-6 rounded-full transition-all duration-500 ${
          scrolled ? "px-3 py-2" : "px-4 py-3"
        }`}
        style={{ transitionTimingFunction: "var(--lg-ease)" }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (onHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 pl-1 pr-2"
        >
          <Image src="/images/AtlasGameShopLogo.png" alt="Atlas" width={28} height={28} />
          <span className="hidden sm:inline text-white text-sm font-light tracking-wider">Atlas Game Shop</span>
        </Link>

        {/* Section links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => goTo(item.href)}
              className="rounded-full px-3 py-1.5 text-[11px] tracking-widest text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {item.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Games catalog */}
        <Link
          href="/games"
          className={`rounded-full px-3 py-1.5 text-[11px] tracking-widest transition-colors ${
            pathname?.startsWith("/games") ? "bg-white/15 text-white" : "text-zinc-300 hover:text-white hover:bg-white/10"
          }`}
        >
          GAMES
        </Link>

        {/* Order Now CTA */}
        <button onClick={() => goTo("cta")} className="glass-pill glass-pill-accent !px-4 !py-1.5 !text-[11px] tracking-widest">
          ORDER NOW
        </button>
      </div>
    </nav>
  );
}
