import Image from "next/image";
import Link from "next/link";
import ReviewCarousel from "./components/ReviewCarousel";
import GlitchText from "./components/GlitchText";
import NavBar from "./components/NavBar";
import FloatingShapes from "./components/FloatingShapes";
import FAQ from "./components/FAQ";
import InvisigalCharacter from "./components/InvisigalCharacter";
import DownloadButton from "./components/DownloadButton";
import TutorialTabs from "./components/TutorialTabs";
import FadeIn from "./components/FadeIn";

export default function Home() {
  // Generate random stars - reduced count for performance
  const stars = Array.from({ length: 40 }, (_, i) => {
    const colors = ['star-white', 'star-purple', 'star-yellow'];
    const sizes = [1, 1.5, 2];
    return {
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: sizes[Math.floor(Math.random() * sizes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: `${Math.random() * 3}s`,
      duration: `${3 + Math.random() * 2}s`
    };
  });
  
  return (
    <div className="min-h-screen relative overflow-hidden" style={{background: "linear-gradient(135deg, #0a0010 0%, #0d0018 40%, #0a000f 70%, #060008 100%)"}}>
      {/* Starfield Background */}
      <div className="fixed inset-0 z-0">
        {stars.map(star => (
          <div
            key={star.id}
            className={`star ${star.color}`}
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>
      <FloatingShapes />

      {/* Content with relative positioning to appear above stars */}
      <div className="relative z-10">

      {/* Top Navigation Bar */}
      <NavBar />
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden border-b border-zinc-800 pt-32 pb-20">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black" />
          {/* Purple glow effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-purple-500/20 rounded-full animate-pulse" />
              <Image
                src="/images/AtlasGameShopLogo.png"
                alt="Atlas Game Shop Logo"
                width={180}
                height={180}
                className="relative brightness-110"
              />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent">
              Atlas Game Shop
            </span>
          </h1>
          
          <GlitchText />

        </div>
      </section>

      {/* Video Tutorial Section */}
      <section id="tutorial" className="py-32 border-b border-zinc-800 relative overflow-hidden">
        {/* Purple glow background */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[128px]" />
        
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-block text-xs tracking-[0.3em] text-purple-400 mb-4">TUTORIAL</div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
              Atlas Tools Guide
            </h2>
            <p className="text-zinc-500 text-sm tracking-wide">
              Step-by-step installation and usage
            </p>
          </div>
          </FadeIn>

          <FadeIn delay={100}>
          <div className="max-w-5xl mx-auto">
            <div className="relative w-full border border-purple-500/30 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(168,85,247,0.15)]" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/jDnQ5Z00dpI"
                title="Atlas Tools Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          </FadeIn>

          {/* Step-by-step guide tabs */}
          <div className="mt-24">
            <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-block text-xs tracking-[0.3em] text-purple-400 mb-4">HOW TO PLAY</div>
              <h3 className="text-3xl md:text-4xl font-light text-white mb-4 tracking-tight">
                Step-by-Step Guide
              </h3>
              <p className="text-zinc-500 text-sm tracking-wide">
                Choose the method that applies to your purchase
              </p>
            </div>
            </FadeIn>
            <FadeIn delay={100}>
            <TutorialTabs />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 border-b border-zinc-800 relative overflow-hidden">
        {/* Character Left - James Bond */}
        <div className="absolute left-0 bottom-0 hidden md:flex items-end pointer-events-none z-0" style={{left: "-60px"}}>
          <Image
            src="/characters/JB.png"
            alt="James Bond"
            width={600}
            height={900}
            className="object-contain opacity-70"
            style={{ maskImage: "linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0))", WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 70%, rgba(0,0,0,0))" }}
          />
        </div>

        {/* Character Right - Invisigal */}
        <InvisigalCharacter />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <FadeIn>
            <div className="inline-block text-xs tracking-[0.3em] text-violet-400 mb-4">FEATURES</div>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">
              Why Atlas Game Shop?
            </h2>
            </FadeIn>
          </div>

          <div className="max-w-3xl mx-auto space-y-10">
            {/* Row 1 - Left */}
            <FadeIn direction="left">
            <div className="flex items-center gap-6 group">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-purple-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all">
                <svg className="w-7 h-7 md:w-9 md:h-9 text-purple-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </div>
              <div>
                <span className="text-xl sm:text-2xl md:text-4xl font-light text-white tracking-wide block" style={{textShadow: "0 0 20px rgba(168,85,247,0.5)"}}>
                  Buy One Get One Free
                </span>
                <p className="text-zinc-500 text-sm mt-2">Purchase one game and get another title of equal or lesser value completely free.</p>
              </div>
            </div>
            </FadeIn>

            {/* Row 2 - Right (on mobile: same left-to-right layout) */}
            <FadeIn direction="right" delay={50}>
            <div className="flex items-center gap-6 md:flex-row-reverse group">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-purple-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all">
                <svg className="w-7 h-7 md:w-9 md:h-9 text-purple-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 2.25h10.5a2.25 2.25 0 002.25-2.25v-15a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 4.5v15a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div className="md:text-right">
                <span className="text-xl sm:text-2xl md:text-4xl font-light text-white tracking-wide block" style={{textShadow: "0 0 20px rgba(168,85,247,0.5)"}}>
                  Handheld Support
                </span>
                <p className="text-zinc-500 text-sm mt-2">Fully compatible with handheld devices and other portable gaming hardware with Windows OS.</p>
              </div>
            </div>
            </FadeIn>

            {/* Row 3 - Left */}
            <FadeIn direction="left" delay={50}>
            <div className="flex items-center gap-6 group">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-purple-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all">
                <svg className="w-7 h-7 md:w-9 md:h-9 text-purple-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
              </div>
              <div>
                <span className="text-xl sm:text-2xl md:text-4xl font-light text-white tracking-wide block" style={{textShadow: "0 0 20px rgba(168,85,247,0.5)"}}>
                  Play In Your Account
                </span>
                <p className="text-zinc-500 text-sm mt-2">Games are activated directly on your own Steam account — no shared accounts, no remote access needed.</p>
              </div>
            </div>
            </FadeIn>

            {/* Row 4 - Right (on mobile: same left-to-right layout) */}
            <FadeIn direction="right" delay={50}>
            <div className="flex items-center gap-6 md:flex-row-reverse group">
              <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-purple-400/60 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)] group-hover:shadow-[0_0_35px_rgba(168,85,247,0.7)] transition-all">
                <svg className="w-7 h-7 md:w-9 md:h-9 text-purple-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="md:text-right">
                <span className="text-xl sm:text-2xl md:text-4xl font-light text-white tracking-wide block" style={{textShadow: "0 0 20px rgba(168,85,247,0.5)"}}>
                  Lifetime Update
                </span>
                <p className="text-zinc-500 text-sm mt-2">One-time purchase with lifetime access. All future updates and new game additions are included for free.</p>
              </div>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-32 border-b border-zinc-800">
        <div className="container mx-auto px-6">
          <FadeIn>
          <div className="text-center mb-20">
            <div className="inline-block text-xs tracking-[0.3em] text-purple-400 mb-4">SHOWCASE</div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
              Atlas Tools Interface
            </h2>
            <p className="text-zinc-500 text-sm tracking-wide">
              Powerful features designed for gamers
            </p>
          </div>
          </FadeIn>

          <div className="max-w-7xl mx-auto space-y-32">
            {/* Library Feature */}
            <FadeIn direction="up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block text-xs tracking-[0.3em] text-purple-400 mb-4">GAME LIBRARY</div>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                  Extensive Game Collection
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-6">
                  Access thousands of games in one unified library. Browse, search, and launch your favorite titles instantly with a clean, intuitive interface.
                </p>
                <ul className="space-y-3 text-zinc-500 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Search and filter games by genre, release date, or popularity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>One-click launch with automatic updates</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>View game details, screenshots, and system requirements</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2 relative group perspective-1000">
                {/* Multi-color glow effect */}
                <div className="absolute -inset-4 bg-purple-500/20 blur-3xl group-hover:bg-purple-500/30 transition-colors" />
                <div className="absolute -inset-4 bg-yellow-500/15 blur-3xl translate-x-12 translate-y-12 group-hover:bg-yellow-500/25 transition-colors" />
                <div className="relative border border-purple-500/30 overflow-hidden rounded-lg shadow-[0_0_60px_rgba(168,85,247,0.3)] transform -rotate-y-12 rotate-x-3 group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700 ease-out">
                  <Image
                    src="/showcase/Library.png"
                    alt="Atlas Tools Library"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            </FadeIn>

            {/* Activation Feature */}
            <FadeIn direction="up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative group perspective-1000">
                {/* Multi-color glow effect */}
                <div className="absolute -inset-4 bg-violet-500/20 blur-3xl group-hover:bg-violet-500/30 transition-colors" />
                <div className="absolute -inset-4 bg-yellow-500/15 blur-3xl -translate-x-12 translate-y-12 group-hover:bg-yellow-500/25 transition-colors" />
                <div className="relative border border-violet-500/30 overflow-hidden rounded-lg shadow-[0_0_60px_rgba(139,92,246,0.3)] transform rotate-y-12 rotate-x-3 group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700 ease-out">
                  <Image
                    src="/showcase/Activation.png"
                    alt="Game Activation"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div>
                <div className="inline-block text-xs tracking-[0.3em] text-violet-400 mb-4">ACTIVATION SYSTEM</div>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                  Instant Game Activation
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-6">
                  Activate games in seconds with our automated system. No manual codes, no waiting—just instant access to your entire library.
                </p>
                <ul className="space-y-3 text-zinc-500 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">→</span>
                    <span>Automatic game detection and activation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">→</span>
                    <span>Real-time activation status and notifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">→</span>
                    <span>Support for multiple platforms (Steam, EA, Ubisoft, etc.)</span>
                  </li>
                </ul>
              </div>
            </div>
            </FadeIn>

            {/* Steam Sharing Feature */}
            <FadeIn direction="up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-block text-xs tracking-[0.3em] text-purple-400 mb-4">STEAM SHARING</div>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                  Family Sharing Made Easy
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-6">
                  Manage Steam Family Sharing accounts effortlessly. Switch between accounts, track availability, and maximize your gaming access.
                </p>
                <ul className="space-y-3 text-zinc-500 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Multiple Steam account management in one interface</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Real-time account availability checker</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Quick switch between shared libraries</span>
                  </li>
                </ul>
              </div>
              <div className="order-1 md:order-2 relative group perspective-1000">
                {/* Multi-color glow effect */}
                <div className="absolute -inset-4 bg-purple-500/20 blur-3xl group-hover:bg-purple-500/30 transition-colors" />
                <div className="absolute -inset-4 bg-yellow-500/15 blur-3xl translate-x-12 -translate-y-12 group-hover:bg-yellow-500/25 transition-colors" />
                <div className="relative border border-purple-500/30 overflow-hidden rounded-lg shadow-[0_0_60px_rgba(168,85,247,0.3)] transform -rotate-y-12 rotate-x-3 group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700 ease-out">
                  <Image
                    src="/showcase/Steamsharing.png"
                    alt="Steam Sharing"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
            </FadeIn>

            {/* Fixes Feature */}
            <FadeIn direction="up">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative group perspective-1000">
                {/* Multi-color glow effect */}
                <div className="absolute -inset-4 bg-violet-500/20 blur-3xl group-hover:bg-violet-500/30 transition-colors" />
                <div className="absolute -inset-4 bg-yellow-500/15 blur-3xl -translate-x-12 -translate-y-12 group-hover:bg-yellow-500/25 transition-colors" />
                <div className="relative border border-violet-500/30 overflow-hidden rounded-lg shadow-[0_0_60px_rgba(139,92,246,0.3)] transform rotate-y-12 rotate-x-3 group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700 ease-out">
                  <Image
                    src="/showcase/Fixes.png"
                    alt="Game Fixes"
                    width={800}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <div>
                <div className="inline-block text-xs tracking-[0.3em] text-violet-400 mb-4">AUTOMATED FIXES</div>
                <h3 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
                  Built-in Game Fixes
                </h3>
                <p className="text-zinc-400 text-base leading-relaxed mb-6">
                  Apply common game fixes and patches automatically. Resolve DRM issues, compatibility problems, and performance bottlenecks with one click.
                </p>
                <ul className="space-y-3 text-zinc-500 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">→</span>
                    <span>Pre-configured fixes for popular games</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">→</span>
                    <span>DRM bypass tools (Denuvo, EA, Ubisoft, Rockstar)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-violet-400 mt-1">→</span>
                    <span>Performance optimization and compatibility patches</span>
                  </li>
                </ul>
              </div>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-32 border-b border-zinc-800 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 rounded-full blur-[128px]" />

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
          <div className="text-center mb-16">
            <div className="inline-block text-xs tracking-[0.3em] text-purple-400 mb-4">DOWNLOAD</div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
              Download Atlas Tools
            </h2>
            <p className="text-zinc-500 text-sm tracking-wide">
              The desktop app for Windows. Free to download and use.
            </p>
          </div>
          </FadeIn>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            {/* Left - Download Card */}
            <FadeIn direction="left">
            <div className="space-y-6">
              {/* Download Button */}
              <div className="border border-purple-500/30 bg-purple-500/5 p-8 rounded-xl relative overflow-hidden group hover:border-purple-400/50 transition-all">
                <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-purple-500/20 p-2 rounded-lg">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-white font-light text-lg">Atlas Tools V.1</div>
                      <div className="text-zinc-500 text-xs tracking-wide">Installer (.exe) — Auto-update included</div>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-sm leading-relaxed mb-3">
                    Install Atlas Tools sekali, update otomatis setiap ada fitur baru — tidak perlu download ulang. Includes all features — game library, activation system, Steam sharing, and automated fixes.
                  </p>

                  <div className="flex items-center gap-2 mb-6 text-xs text-zinc-500 bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2">
                    <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                    </svg>
                    <span>Recommended: Download using <span className="text-white">Google Chrome</span> for best compatibility</span>
                  </div>

                  <DownloadButton />
                </div>
              </div>

              {/* System Requirements */}
              <div className="border border-zinc-800 p-6 rounded-xl">
                <div className="text-xs tracking-[0.2em] text-zinc-600 mb-4">SYSTEM REQUIREMENTS</div>
                <div className="space-y-2 text-sm text-zinc-500">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">→</span>
                    <span>Windows 10 / 11 (64-bit)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">→</span>
                    <span>Steam client installed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">→</span>
                    <span>Internet connection required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">→</span>
                    <span>Valid Atlas Game Shop purchase</span>
                  </div>
                </div>
              </div>
            </div>
            </FadeIn>

            {/* Right - App Screenshot */}
            <FadeIn direction="right">
            <div className="relative group perspective-1000">
              <div className="absolute -inset-4 bg-purple-500/20 blur-3xl group-hover:bg-purple-500/30 transition-colors" />
              <div className="absolute -inset-4 bg-yellow-500/10 blur-3xl translate-x-8 translate-y-8" />
              <div className="relative border border-purple-500/30 overflow-hidden rounded-xl shadow-[0_0_60px_rgba(168,85,247,0.3)] transform -rotate-y-12 rotate-x-3 group-hover:rotate-y-0 group-hover:rotate-x-0 transition-transform duration-700 ease-out">
                <Image
                  src="/images/AtlasTools.png"
                  alt="Atlas Tools App"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 border-b border-zinc-800 overflow-hidden">
        <div className="container mx-auto px-6">
          <FadeIn>
          <div className="text-center mb-20">
            <div className="inline-block text-xs tracking-[0.3em] text-purple-400 mb-4">TESTIMONIALS</div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
              Customer Reviews
            </h2>
            <p className="text-zinc-500 text-sm tracking-wide">
              Verified purchases from Indonesian gamers
            </p>
          </div>
          </FadeIn>
          <ReviewCarousel />

          {/* Stats */}
          <FadeIn delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl md:text-5xl font-light text-purple-400 mb-2" style={{textShadow: "0 0 20px rgba(168,85,247,0.6)"}}>110K+</div>
              <div className="text-xs tracking-[0.2em] text-zinc-500">GAMES AVAILABLE</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-purple-400 mb-2" style={{textShadow: "0 0 20px rgba(168,85,247,0.6)"}}>7.2K+</div>
              <div className="text-xs tracking-[0.2em] text-zinc-500">HAPPY CUSTOMERS</div>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <svg className="w-12 h-12 text-purple-400" fill="currentColor" viewBox="0 0 24 24" style={{filter: "drop-shadow(0 0 8px rgba(168,85,247,0.6))"}}>
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801"/>
                </svg>
              </div>
              <div className="text-xs tracking-[0.2em] text-zinc-500">PLATFORMS SUPPORTED</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-light text-purple-400 mb-2" style={{textShadow: "0 0 20px rgba(168,85,247,0.6)"}}>100%</div>
              <div className="text-xs tracking-[0.2em] text-zinc-500">INSTANT ACTIVATION</div>
            </div>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 border-b border-zinc-800">
        <div className="container mx-auto px-6">
          <FadeIn>
          <div className="text-center mb-20">
            <div className="inline-block text-xs tracking-[0.3em] text-purple-400 mb-4">FAQ</div>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">
              Common Questions
            </h2>
            <p className="text-zinc-500 text-sm tracking-wide">
              Everything you need to know before getting started
            </p>
          </div>
          </FadeIn>

          <FadeIn delay={100}>
          <FAQ />
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-32 relative overflow-hidden">
        {/* Game Posters Background - 3 rows carousel */}
        <div className="absolute inset-0 z-0 overflow-hidden flex flex-col gap-[2px] bg-purple-500/40" style={{contain: "strict"}}>
          {/* Row 1 - scroll left */}
          <div className="poster-row flex flex-shrink-0 gap-[2px] animate-scroll-left">
            {Array.from({ length: 2 }, (_, set) =>
              Array.from({ length: 33 }, (_, i) => (
                <img
                  key={`r1-${set}-${i}`}
                  src={`/games/${(i % 65) + 1}.jpg`}
                  alt=""
                  style={{height: "100%", width: "auto", flexShrink: 0, display: "block", objectFit: "cover"}}
                  loading="lazy"
                />
              ))
            )}
          </div>

          {/* Row 2 - scroll right */}
          <div className="poster-row flex flex-shrink-0 gap-[2px] animate-scroll-right">
            {Array.from({ length: 2 }, (_, set) =>
              Array.from({ length: 33 }, (_, i) => (
                <img
                  key={`r2-${set}-${i}`}
                  src={`/games/${((i + 22) % 65) + 1}.jpg`}
                  alt=""
                  style={{height: "100%", width: "auto", flexShrink: 0, display: "block", objectFit: "cover"}}
                  loading="lazy"
                />
              ))
            )}
          </div>

          {/* Row 3 - scroll left slow */}
          <div className="poster-row flex flex-shrink-0 gap-[2px] animate-scroll-left-slow">
            {Array.from({ length: 2 }, (_, set) =>
              Array.from({ length: 33 }, (_, i) => (
                <img
                  key={`r3-${set}-${i}`}
                  src={`/games/${((i + 44) % 65) + 1}.jpg`}
                  alt=""
                  style={{height: "100%", width: "auto", flexShrink: 0, display: "block", objectFit: "cover"}}
                  loading="lazy"
                />
              ))
            )}
          </div>

          {/* Row 4 - mobile only, scroll right */}
          <div className="poster-row-mobile flex flex-shrink-0 gap-[2px] animate-scroll-right">
            {Array.from({ length: 2 }, (_, set) =>
              Array.from({ length: 33 }, (_, i) => (
                <img
                  key={`r4-${set}-${i}`}
                  src={`/games/${((i + 10) % 65) + 1}.jpg`}
                  alt=""
                  style={{height: "100%", width: "auto", flexShrink: 0, display: "block", objectFit: "cover"}}
                  loading="lazy"
                />
              ))
            )}
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* CTA Content */}
        <div className="relative z-10 container mx-auto px-6">
          <div className="text-center mb-6">
            <div className="inline-block text-sm tracking-[0.3em] text-purple-300 font-light" style={{textShadow: "0 0 20px rgba(168,85,247,0.8)"}}>GET STARTED</div>
          </div>
          <div className="max-w-lg mx-auto">
            <div className="bg-purple-950/30 backdrop-blur-md border border-purple-500/30 rounded-2xl p-10 shadow-[0_0_60px_rgba(168,85,247,0.2)]">
              <h2 className="text-3xl md:text-4xl font-light text-white mb-3 tracking-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-violet-200 bg-clip-text text-transparent">
                  Ready to Upgrade?
                </span>
              </h2>
              <p className="text-zinc-300 text-sm mb-6 tracking-wide">
                Join thousands of gamers using Atlas Game Shop services!
              </p>
              <ul className="text-zinc-400 text-sm mb-8 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Play on your own account
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Pay one time, no subscription
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Denuvo, EA & Ubisoft activation support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">✓</span> Support via Whatsapp chat
                </li>
              </ul>

              <div className="flex items-center justify-between mt-2">
                <Link
                  href="https://www.tokopedia.com/atlas-game-shop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-400 transition-colors text-sm"
                >
                  Tokopedia
                </Link>
                <span className="text-zinc-700">|</span>
                <Link
                  href="https://whatsapp.com/channel/0029VbB5ZWsJ3jus9HtnEi3t"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-400 transition-colors text-sm flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Whatsapp Channel
                </Link>
                <span className="text-zinc-700">|</span>
                <Link
                  href="https://shopee.com/atlasgameshop"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-400 transition-colors text-sm"
                >
                  Shopee
                </Link>
              </div>
            </div>
          </div>
          <p className="text-center text-white text-xs mt-4 tracking-wide" style={{textShadow: "0 1px 6px rgba(0,0,0,1), 0 0 20px rgba(0,0,0,0.9)"}}>
            Payments through Tokopedia & Shopee are covered by buyer protection.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-16">
        <div className="container mx-auto px-6">
          {/* Footer columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/images/AtlasGameShopLogo.png" alt="Atlas Game Shop" width={40} height={40} />
                <div>
                  <div className="text-white font-light text-sm">Atlas Game Shop</div>
                  <div className="text-zinc-500 text-xs">Play Steam, EA, Ubisoft and Denuvo games instantly.</div>
                </div>
              </div>
            </div>

            {/* Product */}
            <div>
              <div className="text-purple-400 text-xs font-semibold tracking-widest mb-4">PRODUCT</div>
              <ul className="space-y-3 text-zinc-400 text-sm">
                <li><a href="#download" className="hover:text-white transition-colors">Download Atlas Tools</a></li>
                <li><a href="#showcase" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#tutorial" className="hover:text-white transition-colors">Tutorial</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <div className="text-purple-400 text-xs font-semibold tracking-widest mb-4">SUPPORT</div>
              <ul className="space-y-3 text-zinc-400 text-sm">
                <li><a href="#tutorial" className="hover:text-white transition-colors">How to Activate</a></li>
                <li><a href="https://whatsapp.com/channel/0029VbB5ZWsJ3jus9HtnEi3t" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Whatsapp Channel</a></li>
                <li><a href="https://www.tokopedia.com/atlas-game-shop" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Order via Tokopedia</a></li>
                <li><a href="https://shopee.com/atlasgameshop" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Order via Shopee</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <div className="text-purple-400 text-xs font-semibold tracking-widest mb-4">LEGAL</div>
              <ul className="space-y-3 text-zinc-400 text-sm">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-600 text-xs tracking-wide">
              © {new Date().getFullYear()} ATLAS GAME SHOP
            </p>
            <p className="text-zinc-700 text-xs tracking-wide">
              INDONESIA
            </p>
            <div className="flex gap-6">
              <Link href="https://www.tokopedia.com/atlas-game-shop" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors text-xs tracking-wider">TOKOPEDIA</Link>
              <Link href="https://shopee.com/atlasgameshop" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-white transition-colors text-xs tracking-wider">SHOPEE</Link>
              <Link href="https://whatsapp.com/channel/0029VbB5ZWsJ3jus9HtnEi3t" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-emerald-400 transition-colors text-xs tracking-wider">WHATSAPP</Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
