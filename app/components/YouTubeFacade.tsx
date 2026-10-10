"use client";

import { useState } from "react";

/**
 * Lightweight stand-in for a YouTube embed: just the video thumbnail and a play button until clicked.
 * The real iframe pulls in ~1 MB of player scripts and fonts on page load, which made the home page
 * slow to first paint; now that only happens when someone actually wants to watch.
 */
export default function YouTubeFacade({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full cursor-pointer"
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <span className="absolute inset-0 bg-black/30 transition-colors group-hover:bg-black/15" />
      <span className="glass-pill glass-pill-accent absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 !h-16 !w-16 !p-0 !rounded-full">
        <svg className="ml-1 h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </button>
  );
}
