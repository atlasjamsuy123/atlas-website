"use client";

import { useState } from "react";
import Image from "next/image";

export default function InvisigalCharacter() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute bottom-0 hidden md:flex items-end pointer-events-auto z-0"
      style={{ right: "-320px", bottom: "-80px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src="/characters/Invisigal.png"
        alt="Invisigal"
        width={700}
        height={1000}
        className={`object-contain transition-opacity ${hovered ? "animate-flicker" : "opacity-70"}`}
        style={{
          maskImage: "linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
          WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 70%, rgba(0,0,0,0))",
        }}
      />
    </div>
  );
}
