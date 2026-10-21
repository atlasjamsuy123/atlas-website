"use client";

import PauseOffscreen from "./PauseOffscreen";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLang } from "./LanguageProvider";

const COPY = {
  en: { open: "Open review", review: "Review", customer: "Customer review", close: "Close" },
  id: { open: "Buka ulasan", review: "Ulasan", customer: "Ulasan pelanggan", close: "Tutup" },
};

const reviewFiles = [
  "Screenshot 2026-09-16 132603.png",
  "Screenshot 2026-09-16 132610.png",
  "Screenshot 2026-09-16 132619.png",
  "Screenshot 2026-09-16 132626.png",
  "Screenshot 2026-09-16 132635.png",
  "Screenshot 2026-09-16 132641.png",
  "Screenshot 2026-09-16 132650.png",
  "Screenshot 2026-09-16 132657.png",
  "Screenshot 2026-09-16 132705.png",
  "Screenshot 2026-09-16 132714.png",
  "Screenshot 2026-09-16 132724.png",
  "Screenshot 2026-09-16 132734.png",
  "Screenshot 2026-09-16 132744.png",
  "Screenshot 2026-09-16 132751.png",
  "Screenshot 2026-09-16 132756.png",
  "Screenshot 2026-09-16 132811.png",
  "Screenshot 2026-09-16 132817.png",
  "Screenshot 2026-09-16 132823.png",
  "Screenshot 2026-09-16 132830.png",
  "Screenshot 2026-09-16 132836.png",
  "Screenshot 2026-09-16 132842.png",
  "Screenshot 2026-09-16 132848.png",
  "Screenshot 2026-09-16 132854.png",
  "Screenshot 2026-09-16 132901.png",
  "Screenshot 2026-09-16 132907.png",
];

export default function ReviewCarousel() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const t = COPY[useLang().lang];

  const openLightbox = (index: number, from: HTMLElement) => {
    openerRef.current = from;
    setSelectedIndex(index);
  };
  const closeLightbox = () => {
    setSelectedIndex(null);
    openerRef.current?.focus(); // back to the card that opened it
  };

  // Escape closes the lightbox; focus moves into it while open.
  useEffect(() => {
    if (selectedIndex === null) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedIndex]);

  const ReviewCard = ({ file, index, copy }: { file: string; index: number; copy: boolean }) => (
    <button
      type="button"
      // The strip holds every review twice so it can loop; only the first copy is reachable by Tab.
      tabIndex={copy ? -1 : 0}
      aria-hidden={copy || undefined}
      aria-label={`${t.open} ${index + 1}`}
      className="relative flex-shrink-0 w-64 h-64 overflow-hidden group cursor-pointer rounded-[20px] border border-white/10"
      onClick={(e) => openLightbox(index, e.currentTarget)}
    >
      <Image
        src={`/reviews/${file}`}
        alt=""
        fill
        sizes="256px"
        loading="eager"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </button>
  );

  return (
    <>
      {/* Scrolling Container */}
      {/* Edges fade out via a mask (works over the animated backdrop, unlike black overlays) */}
      <PauseOffscreen
        deferUntilNear
        className="relative overflow-hidden h-64"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8rem, black calc(100% - 8rem), transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8rem, black calc(100% - 8rem), transparent)",
        }}
      >

        {/* Infinite Scroll */}
        <div className="flex gap-4 animate-scroll w-max">
          {reviewFiles.map((file, i) => (
            <ReviewCard key={`first-${i}`} file={file} index={i} copy={false} />
          ))}
          {reviewFiles.map((file, i) => (
            <ReviewCard key={`second-${i}`} file={file} index={i} copy />
          ))}
        </div>
      </PauseOffscreen>

      {/* Lightbox: click outside, the close button, or Escape closes it */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${t.review} ${selectedIndex + 1}`}
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              ref={closeRef}
              type="button"
              onClick={closeLightbox}
              className="glass-pill absolute -top-14 right-0"
            >
              {t.close}
            </button>
            <Image
              src={`/reviews/${reviewFiles[selectedIndex]}`}
              alt={`${t.customer} ${selectedIndex + 1}`}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </>
  );
}
