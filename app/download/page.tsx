import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import DownloadSection from "../components/DownloadSection";
import TutorialTabs from "../components/TutorialTabs";
import FadeIn from "../components/FadeIn";
import { getLang } from "../lib/getLang";
import { WHATSAPP, WHATSAPP_NUMBER } from "../lib/links";

const COPY = {
  en: {
    metaTitle: "Download Atlas Tools | Atlas Game Shop",
    metaDesc: "Download the Atlas Tools app for Windows and set up the games from your Atlas Game Shop order.",
    stepsTitle: "After installing",
    stepsBody: "Follow the steps for what you want to do. Every step happens inside Atlas Tools.",
    help: "Stuck? Chat with us on WhatsApp at",
  },
  id: {
    metaTitle: "Download Atlas Tools | Atlas Game Shop",
    metaDesc: "Download aplikasi Atlas Tools untuk Windows dan pasang game dari order Atlas Game Shop kamu.",
    stepsTitle: "Setelah terinstal",
    stepsBody: "Ikuti langkah sesuai yang ingin kamu lakukan. Semua langkahnya dilakukan di dalam Atlas Tools.",
    help: "Ada kendala? Chat kami di WhatsApp",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const { lang } = await getLang();
  return { title: COPY[lang].metaTitle, description: COPY[lang].metaDesc };
}

/** atlasgameshop.site/download: the link to send a buyer who already ordered. */
export default async function DownloadPage() {
  const { lang } = await getLang();
  const t = COPY[lang];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <NavBar />

      <main>
        <section className="pt-32 pb-20 md:pt-40 md:pb-24">
          <DownloadSection lang={lang} asPage />
        </section>

        <section className="py-20 md:py-24 border-t border-white/[0.06]">
          <div className="container mx-auto px-5 md:px-6">
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">{t.stepsTitle}</h2>
                <p className="mt-4 text-zinc-400">{t.stepsBody}</p>
              </div>
            </FadeIn>
            <div className="mt-12">
              <TutorialTabs />
            </div>
            <p className="mt-16 text-center text-zinc-400">
              {t.help}{" "}
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="font-semibold text-lavender hover:text-white">
                {WHATSAPP_NUMBER}
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
