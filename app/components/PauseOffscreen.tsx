"use client";

import { useEffect, useRef } from "react";

/**
 * Wraps an infinitely animated block (poster marquees, review carousel) and pauses its CSS animations
 * while it's off screen, via the .is-offscreen class in globals.css. Those marquees animate hundreds of
 * images; running them while scrolled away was wasted work on every frame.
 */
export default function PauseOffscreen({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle("is-offscreen", !entry.isIntersecting),
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
