"use client";

import { useEffect, useRef, useState } from "react";
import { WHATSAPP_NUMBER, whatsappWith } from "../lib/links";
import { useLang } from "./LanguageProvider";

// The dialog can't be dismissed for this many seconds, so the WhatsApp offer gets read.
const LOCK_SECONDS = 10;

const SETUP_URL =
  "https://github.com/atlasjamsuy123/Atlas-tools-Update/releases/latest/download/AtlasTools-win-Setup.exe";

const COPY = {
  en: {
    button: "Download Atlas Tools",
    title: "Your download has started",
    body: "Chat with Atlas on WhatsApp to get your Atlas Tools code, or for help installing and activating your games.",
    chat: "Chat Atlas on WhatsApp",
    phone: "No WhatsApp on this PC? Message this number from your phone:",
    copy: "Copy",
    copied: "Copied",
    later: "Maybe later",
    waMessage: "Hi Atlas, I just downloaded Atlas Tools. Can you help me?",
  },
  id: {
    button: "Download Atlas Tools",
    title: "Download kamu sudah dimulai",
    body: "Chat Atlas di WhatsApp untuk dapat kode Atlas Tools, atau minta bantuan instal dan aktivasi game kamu.",
    chat: "Chat Atlas di WhatsApp",
    phone: "Tidak ada WhatsApp di PC ini? Chat nomor ini dari HP kamu:",
    copy: "Salin",
    copied: "Tersalin",
    later: "Nanti saja",
    waMessage: "Halo Atlas, saya baru download Atlas Tools. Boleh dibantu?",
  },
};

/**
 * The installer download. The click still downloads normally; it also opens a dialog that points
 * the user to the Atlas WhatsApp chat, where they get their code and setup help.
 * Native <dialog> gives focus trapping and Esc-to-close for free.
 */
export default function DownloadButton() {
  const dialog = useRef<HTMLDialogElement>(null);
  const t = COPY[useLang().lang];
  const [secondsLeft, setSecondsLeft] = useState(0);
  const locked = secondsLeft > 0;
  const leavingForChat = useRef(false); // the WhatsApp button may close it while still locked
  const [copied, setCopied] = useState(false);

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(WHATSAPP_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the number is still on screen to type */
    }
  };

  useEffect(() => {
    if (!locked) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [locked, secondsLeft]);

  const open = () => {
    leavingForChat.current = false;
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
        {t.button}
      </a>

      <dialog
        ref={dialog}
        aria-labelledby="dl-dialog-title"
        onClick={(e) => { if (e.target === e.currentTarget) dismiss(); }}
        onCancel={(e) => { if (locked) e.preventDefault(); }} // Esc does nothing until the timer ends
        // Chrome lets a repeated Esc close the dialog anyway; put it back while still locked.
        onClose={() => { if (locked && !leavingForChat.current) dialog.current?.showModal(); }}
        className="wa-dialog m-auto w-[calc(100%-2rem)] max-w-md rounded-[20px] p-0 text-zinc-300"
      >
        <div className="p-7">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366]/15 text-[#25d366]">
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </span>
          <h2 id="dl-dialog-title" className="mt-5 text-2xl font-extrabold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="mt-2">{t.body}</p>

          <div className="mt-7 flex flex-col gap-3">
            <a
              href={whatsappWith(t.waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                leavingForChat.current = true;
                setSecondsLeft(0);
                dialog.current?.close();
              }}
              className="store-btn store-wa-solid"
            >
              {t.chat}
            </a>

            {/* For people without WhatsApp on this PC: the number to message from their phone */}
            <div className="rounded-[14px] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm text-zinc-400">{t.phone}</p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <span className="select-all text-xl font-bold tracking-wide text-white">{WHATSAPP_NUMBER}</span>
                <button type="button" onClick={copyNumber} aria-live="polite" className="glass-pill !min-h-10 !px-4 !text-sm">
                  {copied ? t.copied : t.copy}
                </button>
              </div>
            </div>

            <button type="button" onClick={dismiss} disabled={locked} className="glass-pill">
              {locked ? `${t.later} (${secondsLeft})` : t.later}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
