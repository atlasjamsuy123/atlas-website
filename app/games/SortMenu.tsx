"use client";

import { useEffect, useRef, useState } from "react";

type Option<K extends string> = { key: K; label: string };

/**
 * Glass dropdown for the catalog sort. Replaces the native <select>, whose popup Chromium draws
 * blank/glitched when the select sits inside a backdrop-filter surface (the glass search bar).
 * Keyboard: Enter/Space/↓ opens, ↑/↓ move, Enter picks, Esc closes.
 */
export default function SortMenu<K extends string>({
  value,
  options,
  onChange,
}: {
  value: K;
  options: readonly Option<K>[];
  onChange: (key: K) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.key === value) ?? options[0];

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const show = () => {
    setActive(Math.max(0, options.findIndex((o) => o.key === value)));
    setOpen(true);
  };

  const pick = (key: K) => {
    setOpen(false);
    if (key !== value) onChange(key);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        show();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(options[active].key);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className="relative" onKeyDown={onKeyDown}>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : show())}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="glass-pill !rounded-2xl !py-3 w-full sm:w-auto sm:min-w-[11.5rem] !justify-between gap-3"
      >
        <span>{current.label}</span>
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          style={{ transitionTimingFunction: "var(--lg-spring)" }}
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      <ul
        role="listbox"
        aria-label="Sort games"
        className={`sort-menu glass glass-strong !absolute right-0 top-[calc(100%+0.5rem)] z-30 w-full sm:w-56 rounded-2xl p-1.5 ${
          open ? "is-open" : ""
        }`}
      >
        {options.map((o, i) => {
          const selected = o.key === value;
          return (
            <li
              key={o.key}
              role="option"
              aria-selected={selected}
              onPointerEnter={() => setActive(i)}
              onClick={() => pick(o.key)}
              className={`flex cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                i === active ? "bg-white/10 text-white" : "text-zinc-300"
              }`}
            >
              {o.label}
              {selected && (
                <svg className="h-4 w-4 text-violet-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
