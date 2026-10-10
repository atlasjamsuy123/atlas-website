"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "#1 Gaming Tools & Steam Activation",
  "#1 Gaming Tools & EA Activation",
  "#1 Gaming Tools & Ubisoft Activation",
  "Order now!",
];

const HOLD_MS = 3200; // how long each phrase stays readable
const NOISE = "▓▒░█▚▞/\\|<>_=+*#";
const GLOW_WINDOW = 5; // unresolved chars right behind the reveal edge glow violet

/** 0 = resolved, 1 = glowing noise at the reveal edge, 2 = faint noise further out */
type Cell = { ch: string; s: 0 | 1 | 2 };

const resolved = (text: string): Cell[] => text.split("").map((ch) => ({ ch, s: 0 }));
const noise = () => NOISE[(Math.random() * NOISE.length) | 0];

/**
 * Hero tagline that "decodes" between phrases: characters resolve left-to-right on an ease-out curve,
 * with a short glowing scramble at the reveal edge, plus a brief chromatic-aberration glitch burst
 * (red/cyan sliced ghosts, see .glitch-line in globals.css) as each new phrase lands. Driven by
 * requestAnimationFrame at ~30 fps; falls back to plain phrase swaps for reduced-motion users.
 */
export default function GlitchText() {
  const [cells, setCells] = useState<Cell[]>(() => resolved(PHRASES[0]));
  const [index, setIndex] = useState(0);
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let holdTimer = 0;
    let burstTimer = 0;
    let current = 0;

    const decodeTo = (target: string) => {
      const start = performance.now();
      const duration = Math.min(1100, 420 + target.length * 20);
      let lastPaint = 0;

      setBurst(true);
      burstTimer = window.setTimeout(() => setBurst(false), 420);

      const step = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        if (now - lastPaint >= 33 || p === 1) {
          lastPaint = now;
          const edge = Math.floor((1 - Math.pow(1 - p, 3)) * target.length); // ease-out reveal
          setCells(
            target.split("").map((ch, k): Cell => {
              if (ch === " " || k < edge || p === 1) return { ch, s: 0 };
              return { ch: noise(), s: k < edge + GLOW_WINDOW ? 1 : 2 };
            }),
          );
        }
        if (p < 1) raf = requestAnimationFrame(step);
        else holdTimer = window.setTimeout(next, HOLD_MS);
      };
      raf = requestAnimationFrame(step);
    };

    const next = () => {
      current = (current + 1) % PHRASES.length;
      setIndex(current);
      if (reduce) {
        setCells(resolved(PHRASES[current]));
        holdTimer = window.setTimeout(next, HOLD_MS);
      } else {
        decodeTo(PHRASES[current]);
      }
    };

    holdTimer = window.setTimeout(next, HOLD_MS);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(holdTimer);
      clearTimeout(burstTimer);
    };
  }, []);

  const phrase = PHRASES[index];
  const accent = phrase === "Order now!";

  return (
    <div className="mb-12 flex items-center justify-center" style={{ minHeight: "4rem" }}>
      <p
        className={`glitch-line ${burst ? "is-glitching" : ""} ${accent ? "is-accent" : ""}`}
        data-text={phrase}
        aria-label={phrase}
        aria-live="polite"
      >
        {cells.map((c, k) => (
          <span key={k} aria-hidden="true" className={c.s === 0 ? "g-done" : c.s === 1 ? "g-near" : "g-far"}>
            {c.ch}
          </span>
        ))}
        <span className="g-caret" aria-hidden="true" />
      </p>
    </div>
  );
}
