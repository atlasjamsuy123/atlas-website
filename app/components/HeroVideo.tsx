"use client";

import { useEffect, useRef, useState } from "react";

const SRC = "/videos/atlas-tools-trailer.mp4";
const POSTER = "/videos/atlas-tools-trailer-poster.webp";

/**
 * Hero trailer: plays muted on a loop (browsers only allow muted autoplay), with buttons to pause it
 * and to turn the sound on. Users who ask for reduced motion get the poster and press play themselves.
 */
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    v.play().catch(() => {}); // autoplay can still be refused (e.g. data saver); the Play button covers it
  }, []);

  const togglePlay = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) v.play().catch(() => {});
  };

  return (
    <div className="shot relative bg-black">
      <video
        ref={ref}
        className="block w-full aspect-video"
        src={SRC}
        poster={POSTER}
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Atlas Tools trailer: adding a game to the library, applying a fix, and activating a game"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? "Pause trailer" : "Play trailer"}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/65 text-white hover:bg-black/80 transition-colors"
        >
          {playing ? (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
            </svg>
          ) : (
            <svg className="ml-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Turn sound on" : "Turn sound off"}
          aria-pressed={!muted}
          className="flex h-11 items-center gap-2 rounded-xl bg-black/65 px-3.5 text-sm font-semibold text-white hover:bg-black/80 transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H3v6h3l5 4V5z" />
            {muted ? (
              <path strokeLinecap="round" d="M22 9l-6 6M16 9l6 6" />
            ) : (
              <path strokeLinecap="round" d="M15.5 8.5a5 5 0 010 7M18.5 5.5a9 9 0 010 13" />
            )}
          </svg>
          {muted ? "Sound on" : "Sound off"}
        </button>
      </div>
    </div>
  );
}
