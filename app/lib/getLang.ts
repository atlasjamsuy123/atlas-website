import { cookies, headers } from "next/headers";
import { isLang, LANG_COOKIE, type Lang } from "./i18n";

/**
 * The language to render on the server. `chosen` is false until the visitor picks one in the
 * language prompt; until then we guess from the browser's Accept-Language (Indonesian browsers get
 * Indonesian, everyone else English).
 */
export async function getLang(): Promise<{ lang: Lang; chosen: boolean }> {
  const saved = (await cookies()).get(LANG_COOKIE)?.value;
  if (isLang(saved)) return { lang: saved, chosen: true };

  const accept = (await headers()).get("accept-language") ?? "";
  const first = accept.split(",")[0]?.trim().toLowerCase() ?? "";
  return { lang: first.startsWith("id") || first.startsWith("in") ? "id" : "en", chosen: false };
}
