"use client";

import { useState } from "react";
import Image from "next/image";

export default function InvisigalCharacter() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      // Only on very wide screens, where she has room beside the content instead of covering it.
      className="absolute bottom-0 hidden 2xl:flex items-end pointer-events-auto z-0"
      style={{ right: "-260px", bottom: "-80px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-hidden="true"
    >
      <Image
        src="/characters/Invisigal.png"
        alt=""
        width={620}
        height={886}
        className={`object-contain transition-opacity ${hovered ? "animate-flicker" : "opacity-50"}`}
        style={{
          maskImage: "linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
        }}
      />
    </div>
  );
}
