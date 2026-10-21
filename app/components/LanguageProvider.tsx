"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LANG_COOKIE, type Lang } from "../lib/i18n";

type Ctx = { lang: Lang; setLang: (lang: Lang) => void };

const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {} });

/** The current language for client components. */
export const useLang = () => useContext(LanguageContext);

/**
 * Holds the language for client components and saves a new choice to the cookie. Server components
 * re-render in the new language through router.refresh(). First-time visitors get the language prompt.
 */
export default function LanguageProvider({
  initialLang,
  chosen,
  children,
}: {
  initialLang: Lang;
  chosen: boolean;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [lang, setLangState] = useState(initialLang);
  const [needsChoice, setNeedsChoice] = useState(!chosen);

  const setLang = (next: Lang) => {
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = next;
    setLangState(next);
    setNeedsChoice(false);
    router.refresh();
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
      {needsChoice && <LanguagePrompt suggested={initialLang} onPick={setLang} />}
    </LanguageContext.Provider>
  );
}

/** First-visit question: which language? Only closes by picking one. */
function LanguagePrompt({ suggested, onPick }: { suggested: Lang; onPick: (lang: Lang) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  const options: { lang: Lang; label: string; hint: string }[] = [
    { lang: "id", label: "Bahasa Indonesia", hint: "Tampilkan website dalam Bahasa Indonesia" },
    { lang: "en", label: "English", hint: "Show the website in English" },
  ];

  return (
    <dialog
      ref={dialog}
      aria-labelledby="lang-prompt-title"
      onCancel={(e) => e.preventDefault()}
      className="wa-dialog m-auto w-[calc(100%-2rem)] max-w-md rounded-[20px] p-0 text-zinc-300"
    >
      <div className="p-7">
        <h2 id="lang-prompt-title" className="text-2xl font-extrabold tracking-tight text-white">
          Pilih bahasa <span className="text-zinc-400">/ Choose your language</span>
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Kamu bisa menggantinya kapan saja di kanan atas. / You can change it any time at the top right.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {options.map((o) => (
            <button
              key={o.lang}
              type="button"
              autoFocus={o.lang === suggested}
              onClick={() => onPick(o.lang)}
              className={`lang-option ${o.lang === suggested ? "is-suggested" : ""}`}
            >
              <span className="lang-code">{o.lang.toUpperCase()}</span>
              <span className="text-left">
                <span className="block font-bold text-white">{o.label}</span>
                <span className="block text-sm text-zinc-400">{o.hint}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}

/** EN / ID switch for the top right of the navbar. */
export function LanguageSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label={lang === "id" ? "Bahasa" : "Language"} className="lang-switch">
      {(["en", "id"] as const).map((l) => (
        <button
          key={l}
          type="button"
          aria-pressed={lang === l}
          aria-label={l === "en" ? "English" : "Bahasa Indonesia"}
          onClick={() => lang !== l && setLang(l)}
          className={lang === l ? "is-active" : ""}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
