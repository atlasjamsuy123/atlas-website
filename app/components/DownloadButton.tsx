"use client";

import { useEffect, useRef, useState } from "react";
import { whatsappWith } from "../lib/links";

// The dialog can't be dismissed for this many seconds, so the WhatsApp offer gets read.
const LOCK_SECONDS = 5;

const SETUP_URL =
  "https://github.com/atlasjamsuy123/Atlas-tools-Update/releases/latest/download/AtlasTools-win-Setup.exe";

const WA_MESSAGE = "Halo Atlas, saya baru download Atlas Tools. Boleh dibantu?";

/**
 * The installer download. The click still downloads normally; it also opens a dialog that points
 * the user to the Atlas WhatsApp chat, where they get their code and setup help.
 * Native <dialog> gives focus trapping and Esc-to-close for free.
 */
export default function DownloadButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const locked = secondsLeft > 0;

  useEffect(() => {
    if (!locked) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [locked, secondsLeft]);

  const open = () => {
    setSecondsLeft(LOCK_SECONDS);
    dialog.current?.showModal();
  };
  const dismiss = () => {
    if (!locked) dialog.current?.close();
  };

  return (
    <>
      <a
        href={SETUP_URL}
        download="AtlasTools-win-Setup.exe"
        onClick={open}
        className="glass-pill glass-pill-accent w-full !py-3 !text-base"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        Download Atlas Tools
      </a>

      <dialog
        ref={dialog}
        aria-labelledby="dl-dialog-title"
        onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
        onCancel={(e) => { if (locked) e.preventDefault(); }} // Esc does nothing until the timer ends
        // Chrome lets a repeated Esc close the dialog anyway; put it back while still locked.
        onClose={() => { if (locked) dialog.current?.showModal(); }}
        className="wa-dialog m-auto w-[calc(100%-2rem)] max-w-md rounded-[20px] p-0 text-zinc-300"
      >
        <div className="p-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366]/15 text-[#25d366]">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </span>
          <h2 id="dl-dialog-title" className="mt-5 text-2xl font-extrabold tracking-tight text-white">
            Your download has started
          </h2>
          <p className="mt-2">
            Chat with Atlas on WhatsApp to get your Atlas Tools code, or for help installing and activating your games.
          </p>

          <div className="mt-7 flex flex-col gap-3">
            <a
              href={whatsappWith(WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => dialog.current?.close()}
              className="store-btn store-wa-solid"
            >
              Chat Atlas on WhatsApp
            </a>
            <button type="button" onClick={dismiss} disabled={locked} className="glass-pill">
              {locked ? `Maybe later (${secondsLeft})` : "Maybe later"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
