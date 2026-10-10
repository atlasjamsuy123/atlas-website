"use client";

import { useEffect } from "react";

/**
 * Smooth, gliding mouse-wheel scrolling for the page (same feel as the Atlas Tools app): each wheel
 * notch moves a target and the page eases towards it every frame, so quick notches merge into one
 * continuous glide.
 *
 * Deliberately conservative: touchpads/touchscreens (pixel-precise deltas) and users who prefer reduced
 * motion keep native scrolling; Ctrl+wheel (zoom), horizontal wheels and wheels over a scrollable inner
 * element (dropdowns, code blocks…) are left alone; any other scroll (scrollbar drag, keyboard, anchor
 * links) cancels the glide instead of fighting it.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const EASE = 0.12; // share of the remaining distance covered per 60 fps frame
    let target = window.scrollY;
    let current = window.scrollY;
    let lastSet = -1;
    let raf = 0;

    const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

    const scrollableAncestor = (el: Element | null): boolean => {
      for (let node = el; node && node !== document.body; node = node.parentElement) {
        const { overflowY } = getComputedStyle(node);
        if ((overflowY === "auto" || overflowY === "scroll") && node.scrollHeight > node.clientHeight) return true;
      }
      return false;
    };

    let lastTime = 0;
    const tick = (time: number) => {
      const dt = lastTime ? Math.min(50, time - lastTime) : 16.7;
      lastTime = time;
      // Something else moved the page (scrollbar, keyboard, anchor link): stop gliding.
      if (lastSet >= 0 && Math.abs(window.scrollY - lastSet) > 2) {
        raf = 0;
        lastTime = 0;
        return;
      }
      const k = 1 - Math.pow(1 - EASE, dt / 16.7);
      current += (target - current) * k;
      if (Math.abs(target - current) < 0.5) current = target;
      window.scrollTo({ top: current, behavior: "instant" });
      lastSet = window.scrollY;
      if (current !== target) raf = requestAnimationFrame(tick);
      else {
        raf = 0;
        lastTime = 0;
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.defaultPrevented || e.ctrlKey || e.shiftKey) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      // Touchpads send many small pixel deltas: native scrolling already feels right there.
      if (e.deltaMode === 0 && Math.abs(e.deltaY) < 50) return;
      if (scrollableAncestor(e.target as Element)) return;

      e.preventDefault();
      if (!raf) {
        current = window.scrollY;
        target = window.scrollY;
      }
      const delta = e.deltaMode === 1 ? e.deltaY * 40 : e.deltaY; // lines → px
      target = Math.max(0, Math.min(maxScroll(), target + delta * 1.1));
      if (!raf) {
        lastSet = window.scrollY;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
