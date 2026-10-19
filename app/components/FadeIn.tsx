"use client";

import { useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: "up" | "down" | "left" | "right" | "none";
};

/**
 * Reveals a block once as it scrolls into view.
 *
 * Content is visible in the server HTML: it is only hidden after hydration, and only when it is still
 * below the fold, so a slow script, a blocked observer, or a crawler never leaves a section blank.
 * Blocks already on screen at load stay put instead of animating in.
 */
export default function FadeIn({ children, className = "", delay = 0, direction = "up" }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"static" | "hidden" | "shown">("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // already visible: no animation

    setState("hidden");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const offset = {
    up: "translateY(24px)",
    down: "translateY(-24px)",
    left: "translateX(24px)",
    right: "translateX(-24px)",
    none: "none",
  }[direction];

  const style: React.CSSProperties =
    state === "static"
      ? {}
      : {
          opacity: state === "shown" ? 1 : 0,
          transform: state === "shown" ? "none" : offset,
          transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
