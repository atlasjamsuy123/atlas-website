"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Wraps an infinitely animated block (poster marquees, review carousel) and pauses its CSS animations
 * while it's off screen, via the .is-offscreen class in globals.css. Those marquees animate hundreds of
 * images; running them while scrolled away was wasted work on every frame.
 *
 * With `deferUntilNear`, the children are only mounted once the block comes within ~1.5 screens of the
 * viewport. Their images can then load eagerly: native lazy-loading never fires for marquee items that
 * sit off to the side, so they used to slide in as empty boxes.
 */
export default function PauseOffscreen({
  children,
  className,
  style,
  deferUntilNear = false,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  deferUntilNear?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(!deferUntilNear);

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

  useEffect(() => {
    const el = ref.current;
    if (near || !el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [near]);

  return (
    <div ref={ref} className={className} style={style}>
      {near ? children : null}
    </div>
  );
}
