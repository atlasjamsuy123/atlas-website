import DownloadButton from "./DownloadButton";
import FadeIn from "./FadeIn";
import type { Lang } from "../lib/i18n";

const COPY = {
  en: {
    title: "Download Atlas Tools",
    body: "The Windows app you use to add games, apply fixes and get activation tickets. Install it once; updates install themselves in the background.",
    card: "Atlas Tools for Windows",
    spec: "Installer (.exe) with auto-update, Windows 10 / 11 64-bit",
    chrome: "Download it with Google Chrome for the fewest browser warnings.",
    needTitle: "You also need",
    needs: ["The Steam client installed", "An internet connection", "An Atlas Tools code from your Atlas Game Shop order"],
  },
  id: {
    title: "Download Atlas Tools",
    body: "Aplikasi Windows untuk menambah game, memasang fix dan mengambil tiket aktivasi. Cukup instal sekali; update terpasang sendiri di background.",
    card: "Atlas Tools untuk Windows",
    spec: "Installer (.exe) dengan auto-update, Windows 10 / 11 64-bit",
    chrome: "Download pakai Google Chrome supaya peringatan browser paling sedikit.",
    needTitle: "Yang juga kamu perlukan",
    needs: ["Aplikasi Steam sudah terinstal", "Koneksi internet", "Kode Atlas Tools dari order Atlas Game Shop kamu"],
  },
};

/**
 * The installer block: what the app is, the download button, and what else is needed. Shared by the
 * home page's #download section and the /download page, so the two can't drift apart.
 * On /download it is the page's main heading (h1); on home it is a section (h2).
 */
export default function DownloadSection({ lang, asPage = false }: { lang: Lang; asPage?: boolean }) {
  const t = COPY[lang];
  const Heading = asPage ? "h1" : "h2";

  return (
    <div className="container mx-auto px-5 md:px-6 max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
      <FadeIn>
        <Heading className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">{t.title}</Heading>
        <p className="mt-4 text-zinc-300 leading-relaxed">{t.body}</p>
      </FadeIn>

      <FadeIn delay={80}>
        <div className="glass rounded-[20px] p-7 md:p-8">
          <p className="font-bold text-white">{t.card}</p>
          <p className="mt-1 text-sm text-zinc-400">{t.spec}</p>
          <div className="mt-6">
            <DownloadButton />
          </div>
          <p className="mt-3 text-sm text-zinc-400">{t.chrome}</p>

          <h3 className="mt-8 text-sm font-semibold text-white">{t.needTitle}</h3>
          <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-lavender text-sm text-zinc-400">
            {t.needs.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </FadeIn>
    </div>
  );
}
