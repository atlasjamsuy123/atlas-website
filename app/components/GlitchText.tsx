"use client";

import { useState, useEffect, useRef } from "react";

const phrases = [
  "#1 Gaming Tools & Steam Activation",
  "#1 Gaming Tools & EA Activation",
  "#1 Gaming Tools & Ubisoft Activation",
  "Order now!",
];

const glitchChars = "!<>-_\\/[]{}—=+*^?#@$%&";

// Random color for glitch characters - blue and purple shades
const glitchColors = [
  "#a855f7", // purple-500
  "#7c3aed", // violet-600
  "#3b82f6", // blue-500
  "#6366f1", // indigo-500
  "#60a5fa", // blue-400
  "#c084fc", // purple-400
  "#818cf8", // indigo-400
];

type CharData = { char: string; color: string | null };

export default function GlitchText() {
  const [chars, setChars] = useState<CharData[]>(
    phrases[0].split("").map((c) => ({ char: c, color: null }))
  );
  const [isOrderNow, setIsOrderNow] = useState(false);
  const indexRef = useRef(0);

  const glitchInto = (target: string) => {
    setIsOrderNow(target === "Order now!");
    let iteration = 0;

    const interval = setInterval(() => {
      const newChars: CharData[] = target.split("").map((char, i) => {
        if (char === " ") return { char: " ", color: null };
        if (i < iteration) return { char: target[i], color: null };
        return {
          char: glitchChars[Math.floor(Math.random() * glitchChars.length)],
          color: glitchColors[Math.floor(Math.random() * glitchColors.length)],
        };
      });

      setChars(newChars);
      iteration += 0.6;

      if (iteration >= target.length) {
        setChars(target.split("").map((c) => ({ char: c, color: null })));
        clearInterval(interval);
      }
    }, 30);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % phrases.length;
      glitchInto(phrases[indexRef.current]);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <p
      className={`text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light tracking-wide ${
        isOrderNow ? "text-purple-400" : "text-zinc-300"
      }`}
      style={{ fontFamily: "monospace", minHeight: "2rem" }}
    >
      {chars.map((c, i) =>
        c.color ? (
          <span key={i} style={{ color: c.color, textShadow: `0 0 8px ${c.color}` }}>
            {c.char}
          </span>
        ) : (
          <span key={i}>{c.char}</span>
        )
      )}
    </p>
  );
}
