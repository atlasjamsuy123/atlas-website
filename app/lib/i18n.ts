// The site is in English and Indonesian. The visitor's choice lives in the `lang` cookie so the server
// renders the right language straight away (no flash of the other one).
export type Lang = "en" | "id";

export const LANGS: readonly Lang[] = ["en", "id"];
export const LANG_COOKIE = "lang";

export const isLang = (v: unknown): v is Lang => v === "en" || v === "id";

/** Number formatting per language: 7,200 in English, 7.200 in Indonesian. */
export const numberLocale = (lang: Lang) => (lang === "id" ? "id-ID" : "en-US");
