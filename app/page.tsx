import Image from "next/image";
import Link from "next/link";
import ReviewCarousel from "./components/ReviewCarousel";
import NavBar from "./components/NavBar";
import FAQ from "./components/FAQ";
import InvisigalCharacter from "./components/InvisigalCharacter";
import DownloadButton from "./components/DownloadButton";
import TutorialTabs from "./components/TutorialTabs";
import FadeIn from "./components/FadeIn";
import PauseOffscreen from "./components/PauseOffscreen";
import YouTubeFacade from "./components/YouTubeFacade";
import HeroVideo from "./components/HeroVideo";

const WHATSAPP = "https://whatsapp.com/channel/0029VbB5ZWsJ3jus9HtnEi3t";
const TOKOPEDIA = "https://www.tokopedia.com/atlas-game-shop";
const SHOPEE = "https://shopee.com/atlasgameshop";

// Owner-confirmed figures (asked 19 Oct 2026).
const STATS = [
  { value: "110K+", label: "games available" },
  { value: "7.2K+", label: "happy customers" },
  { value: "100%", label: "instant activation" },
];

// The promo leads because it is the reason most people order; the rest are supporting facts.
const PROMO = {
  title: "Buy one, get one free",
  desc: "Buy one game and pick a second title of equal or lower value at no cost.",
};
const FEATURES = [
  {
    title: "Your own Steam account",
    desc: "Games are activated on your own account. No shared logins and no remote access to your PC.",
    icon: "M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z",
  },
  {
    title: "Handhelds included",
    desc: "Works on handheld PCs and other portable hardware running Windows.",
    icon: "M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z",
  },
  {
    title: "Lifetime updates",
    desc: "Pay once. App updates and new game additions come at no extra cost.",
    icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const ORDER_POINTS = [
  "Play on your own account",
  "Pay one time, no subscription",
  "Denuvo, EA & Ubisoft support",
  "Support via WhatsApp chat",
];

const SHOWCASE = [
  {
    id: "library",
    title: "Add a game, find it in Steam",
    body: "Search the catalog, add a game, and it appears in your Steam library. Each game shows up front whether it needs an extra step, a fix, or an activation.",
    points: [
      "Search by game name or App ID",
      "Auto Add puts every game you own into Steam at once",
      "Labels for Extra Step, Fixes and Activation on each game",
    ],
    image: "/showcase/Library.webp",
    alt: "Atlas Tools library page with game cards",
  },
  {
    id: "fixes",
    title: "Fixes for games that will not start",
    body: "Some games need more than a license. Open the game in the Fixes tab, press Fix, and Atlas Tools applies the files to your game folder.",
    points: [
      "A ready-made fix per game, applied with one button",
      "DRM bypass tools for Denuvo, EA, Ubisoft and Rockstar titles",
      "Revert puts the original files back",
    ],
    image: "/showcase/Fixes.webp",
    alt: "Atlas Tools fixes page with a fix detail panel",
  },
  {
    id: "activation",
    title: "Activation in one click",
    body: "Some games need a ticket before they launch. Pick the game in the Activations tab, choose an account and press Get Ticket. Atlas Tools logs in, saves the ticket to your PC and hands Steam back to you.",
    points: [
      "Needs the Atlas Tools 1.2 mode and the game installed in Steam",
      "Any fix the game needs is applied in the same run",
      "Each game can be activated once every 30 hours",
    ],
    image: "/showcase/Activation.webp",
    alt: "Atlas Tools Activations page with the accounts panel and Get Ticket buttons",
  },
];

const posterRow = (key: string, offset: number) =>
  Array.from({ length: 2 }, (_, set) =>
    Array.from({ length: 33 }, (_, i) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={`${key}-${set}-${i}`}
        src={`/games/${((i + offset) % 65) + 1}.webp`}
        alt=""
        style={{ height: "100%", width: "auto", aspectRatio: "460 / 215", flexShrink: 0, display: "block", objectFit: "cover" }}
        loading="eager"
        decoding="async"
      />
    )),
  );

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <NavBar />

      <main>
        {/* Hero: the promise on the left, the real app on the right */}
        <section className="relative pt-32 pb-24 md:pt-40 md:pb-32">
          <div className="container mx-auto px-5 md:px-6 grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-12 items-center">
            <div>
              <h1 className="text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.25rem] font-extrabold tracking-tight text-white">
                Steam, EA and Ubisoft games on <span className="text-lavender">your own account</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">
                Atlas Tools adds the games you order to your Steam library and applies the fixes and activations they need.
                You pay once through Tokopedia or Shopee.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#order" className="glass-pill glass-pill-accent !px-6 !text-base">
                  Order on Tokopedia or Shopee
                </a>
                <Link href="/games" className="glass-pill !px-6 !text-base">
                  See the game list
                </Link>
              </div>

              {/* Customers who already ordered come back for the app itself */}
              <a href="#download" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-lavender hover:text-white transition-colors">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Already ordered? Download Atlas Tools for Windows
              </a>

              <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-2xl sm:text-3xl font-extrabold text-white">{s.value}</dd>
                    <dd className="mt-1 text-sm text-zinc-400">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <HeroVideo />
          </div>
        </section>

        {/* Features: promo first, three supporting facts as a row */}
        <section id="features" className="relative overflow-hidden py-24 md:py-28">
          <div className="absolute bottom-0 hidden 2xl:flex items-end pointer-events-none z-0" style={{ left: "-80px" }} aria-hidden="true">
            <Image
              src="/characters/JB.png"
              alt=""
              width={520}
              height={780}
              className="object-contain opacity-40"
              style={{ maskImage: "linear-gradient(to right, black 60%, transparent)", WebkitMaskImage: "linear-gradient(to right, black 60%, transparent)" }}
            />
          </div>
          <InvisigalCharacter />

          <div className="container mx-auto px-5 md:px-6 relative z-10 max-w-5xl">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Why order from Atlas</h2>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="mt-10 rounded-[20px] border border-lavender/30 bg-[#21173a] p-7 md:p-10 md:flex md:items-end md:justify-between gap-10">
                <div>
                  <p className="text-sm font-semibold text-lavender">Current promo</p>
                  <h3 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-tight text-white">{PROMO.title}</h3>
                  <p className="mt-3 max-w-lg text-zinc-300">{PROMO.desc}</p>
                </div>
                <a href="#order" className="glass-pill glass-pill-accent mt-6 md:mt-0 shrink-0">
                  Claim it with your order
                </a>
              </div>
            </FadeIn>

            <div className="mt-12 grid gap-10 sm:grid-cols-3">
              {FEATURES.map((f, i) => (
                <FadeIn key={f.title} delay={120 + i * 60}>
                  <svg className="h-7 w-7 text-lavender" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d={f.icon} />
                  </svg>
                  <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.desc}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* The app: one row per feature, image side alternating */}
        <section id="showcase" className="py-24 md:py-32 border-t border-white/[0.06]">
          <div className="container mx-auto px-5 md:px-6 max-w-6xl">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                What you get inside <span className="whitespace-nowrap">Atlas Tools</span>
              </h2>
            </FadeIn>

            <div className="mt-16 space-y-24 md:space-y-32">
              {SHOWCASE.map((s, i) => (
                <FadeIn key={s.id}>
                  <div className="grid md:grid-cols-[1fr_1.15fr] gap-10 md:gap-14 items-center">
                    <div className={i % 2 === 1 ? "md:order-2" : ""}>
                      <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">{s.title}</h3>
                      <p className="mt-4 text-zinc-300 leading-relaxed">{s.body}</p>
                      <ul className="mt-6 space-y-2.5 list-disc pl-5 marker:text-lavender text-sm text-zinc-400">
                        {s.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <div className={`shot ${i % 2 === 1 ? "md:order-1" : ""}`}>
                      <Image src={s.image} alt={s.alt} width={800} height={526} className="w-full h-auto" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Tutorial: the video first, the written steps under it */}
        <section id="tutorial" className="py-24 md:py-32 border-t border-white/[0.06]">
          <div className="container mx-auto px-5 md:px-6">
            <FadeIn>
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">How to set it up</h2>
                <p className="mt-4 text-zinc-400">Watch the full walkthrough, or follow the written steps for your order type below.</p>
              </div>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="mt-12 max-w-4xl mx-auto">
                <div className="glass relative w-full rounded-[20px] overflow-hidden" style={{ paddingBottom: "56.25%" }}>
                  <YouTubeFacade id="69OW5TPMJM0" title="Atlas Tools Tutorial" />
                </div>
              </div>
            </FadeIn>

            <div className="mt-20">
              <TutorialTabs />
            </div>
          </div>
        </section>

        {/* Download: install details beside the app shot */}
        <section id="download" className="py-24 md:py-28 border-t border-white/[0.06]">
          <div className="container mx-auto px-5 md:px-6 max-w-6xl grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Download Atlas Tools</h2>
              <p className="mt-4 text-zinc-300 leading-relaxed">
                The Windows app you use to add games, apply fixes and get activation tickets. Install it once; updates install
                themselves in the background.
              </p>
            </FadeIn>

            <FadeIn delay={80}>
              <div className="glass rounded-[20px] p-7 md:p-8">
                <p className="font-bold text-white">Atlas Tools for Windows</p>
                <p className="mt-1 text-sm text-zinc-400">Installer (.exe) with auto-update, Windows 10 / 11 64-bit</p>
                <div className="mt-6">
                  <DownloadButton />
                </div>
                <p className="mt-3 text-sm text-zinc-400">Download it with Google Chrome for the fewest browser warnings.</p>

                <h3 className="mt-8 text-sm font-semibold text-white">You also need</h3>
                <ul className="mt-3 space-y-2 list-disc pl-5 marker:text-lavender text-sm text-zinc-400">
                  <li>The Steam client installed</li>
                  <li>An internet connection</li>
                  <li>An Atlas Tools code from your Atlas Game Shop order</li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Reviews: real order screenshots, full width */}
        <section id="testimonials" className="py-24 md:py-28 border-t border-white/[0.06] overflow-hidden">
          <div className="container mx-auto px-5 md:px-6 max-w-6xl">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Reviews from real orders</h2>
              <p className="mt-4 text-zinc-400">Screenshots of verified purchases from Indonesian gamers. Click one to read it in full.</p>
            </FadeIn>
          </div>
          <div className="mt-12">
            <ReviewCarousel />
          </div>
        </section>

        {/* FAQ: a narrow reading column */}
        <section id="faq" className="py-24 md:py-28 border-t border-white/[0.06]">
          <div className="container mx-auto px-5 md:px-6 max-w-3xl">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Questions before you order</h2>
            </FadeIn>
            <div className="mt-10">
              <FAQ />
            </div>
          </div>
        </section>

        {/* Order: the poster wall shows the catalog, the card holds the store links */}
        <section id="order" className="relative overflow-hidden py-32 md:py-40">
          <PauseOffscreen deferUntilNear className="absolute inset-0 z-0 overflow-hidden flex flex-col gap-[2px]" style={{ contain: "strict" }}>
            <div className="poster-row flex flex-shrink-0 gap-[2px] animate-scroll-left">{posterRow("r1", 0)}</div>
            <div className="poster-row flex flex-shrink-0 gap-[2px] animate-scroll-right">{posterRow("r2", 22)}</div>
            <div className="poster-row flex flex-shrink-0 gap-[2px] animate-scroll-left-slow">{posterRow("r3", 44)}</div>
            <div className="poster-row-mobile flex flex-shrink-0 gap-[2px] animate-scroll-right">{posterRow("r4", 10)}</div>
            {/* Readability: dark centre where the card sits, fading into the page above and below */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 75% at 50% 50%, rgba(11,9,21,0.9), rgba(11,9,21,0.72) 60%, rgba(11,9,21,0.5))" }} />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0b0915] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0915] to-transparent" />
          </PauseOffscreen>

          <div className="relative z-10 container mx-auto px-5 md:px-6">
            <FadeIn>
              <div className="order-card mx-auto max-w-xl rounded-[20px] p-7 md:p-10">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Order through Tokopedia or Shopee</h2>
                <p className="mt-3 text-zinc-300">
                  Pick your games in our store, pay with the marketplace&apos;s buyer protection, and you get your Atlas Tools code.
                </p>

                <ul className="mt-7 grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-zinc-200">
                  {ORDER_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-lavender" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <a href={TOKOPEDIA} target="_blank" rel="noopener noreferrer" className="store-btn store-tokopedia">
                    Tokopedia
                  </a>
                  <a href={SHOPEE} target="_blank" rel="noopener noreferrer" className="store-btn store-shopee">
                    Shopee
                  </a>
                  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="store-btn store-wa col-span-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Ask on WhatsApp
                  </a>
                </div>

                <p className="mt-6 text-sm text-zinc-400">Payments through Tokopedia and Shopee are covered by their buyer protection.</p>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.06] py-12">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/AtlasGameShopLogo.png" alt="" width={40} height={40} />
            <div>
              <p className="font-bold text-white">Atlas Game Shop</p>
              <p className="text-sm text-zinc-400">© {new Date().getFullYear()}, Indonesia</p>
            </div>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
            <a href="#download" className="py-2 hover:text-white">Get the app</a>
            <a href={TOKOPEDIA} target="_blank" rel="noopener noreferrer" className="py-2 hover:text-white">Tokopedia</a>
            <a href={SHOPEE} target="_blank" rel="noopener noreferrer" className="py-2 hover:text-white">Shopee</a>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="py-2 hover:text-white">WhatsApp</a>
            <Link href="/terms" className="py-2 hover:text-white">Terms</Link>
            <Link href="/privacy" className="py-2 hover:text-white">Privacy</Link>
            <Link href="/refund" className="py-2 hover:text-white">Refunds</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
