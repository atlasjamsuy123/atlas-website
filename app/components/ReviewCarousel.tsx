"use client";

import { useState } from "react";
import Image from "next/image";

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

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const ReviewCard = ({ file, index }: { file: string; index: number }) => (
    <div
      className="relative flex-shrink-0 w-64 h-64 overflow-hidden hover:opacity-90 transition-all group cursor-pointer rounded-lg"
      onClick={() => openLightbox(index)}
    >
      <Image
        src={`/reviews/${file}`}
        alt={`Review ${index + 1}`}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-colors flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 rounded-full p-3">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Scrolling Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Infinite Scroll */}
        <div className="flex gap-4 animate-scroll w-max">
          {reviewFiles.map((file, i) => (
            <ReviewCard key={`first-${i}`} file={file} index={i} />
          ))}
          {reviewFiles.map((file, i) => (
            <ReviewCard key={`second-${i}`} file={file} index={i} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center cursor-pointer"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-3xl w-full mx-8 cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={`/reviews/${reviewFiles[selectedIndex]}`}
              alt={`Review ${selectedIndex + 1}`}
              width={1200}
              height={800}
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
