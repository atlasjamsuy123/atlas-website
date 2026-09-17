"use client";

import Image from "next/image";

const navItems = [
  { label: "Tutorial", href: "tutorial" },
  { label: "Features", href: "features" },
  { label: "Showcase", href: "showcase" },
  { label: "Download", href: "download" },
  { label: "Testimonials", href: "testimonials" },
  { label: "FAQ", href: "faq" },
];

export default function NavBar() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-zinc-800/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3">
          <Image src="/images/AtlasGameShopLogo.png" alt="Atlas" width={32} height={32} />
          <div className="text-white text-sm font-light tracking-wider">Atlas Game Shop</div>
        </button>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="text-xs tracking-widest text-zinc-500 hover:text-white transition-colors"
            >
              {item.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Order Now CTA */}
        <button
          onClick={() => scrollTo("cta")}
          className="text-xs tracking-widest text-purple-400 hover:text-purple-300 transition-colors"
        >
          ORDER NOW
        </button>
      </div>
    </nav>
  );
}
