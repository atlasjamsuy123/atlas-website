"use client";

import { useId, useState } from "react";
import { useLang } from "./LanguageProvider";

const FAQS_ID = [
  {
    q: "Bagaimana cara aktivasi game?",
    a: "Atlas Tools mengaktifkan game langsung di PC kamu, tanpa akun bersama dan tanpa remote login. Aplikasinya memasang game ke Steam, EA, atau Ubisoft kamu sendiri dan membukanya di PC kamu, jadi kamu tinggal main seperti game lain yang kamu punya.",
  },
  {
    q: "Apakah ini langganan?",
    a: "Bukan. Steam Unlocker cukup dibeli sekali dengan akses seumur hidup: bayar sekali, pakai selamanya.",
  },
  {
    q: "Apakah aman untuk komputer saya?",
    a: "Aman. Aplikasi Atlas Tools tidak berisi malware, keylogger, atau komponen berbahaya lainnya, dan sudah dipakai lebih dari 7.200 pelanggan.",
  },
  {
    q: "Platform apa saja yang didukung?",
    a: "Steam, EA, Ubisoft Connect, dan game yang dilindungi Denuvo. Online-Fix untuk multiplayer di game yang mendukung.",
  },
  {
    q: "Bagaimana cara bayarnya?",
    a: "Order lewat toko kami di Tokopedia dan Shopee, jadi setiap pembayaran dilindungi perlindungan pembeli dari marketplace.",
  },
  {
    q: "Bisa refund?",
    a: "Bisa. Kalau game kamu tetap tidak bisa diaktifkan dengan Atlas Tools setelah mengikuti panduan support kami, uangnya kami kembalikan penuh. Hubungi kami lewat WhatsApp.",
  },
  {
    q: "Apakah game update otomatis?",
    a: "Ya. Game yang aktif lewat Steam update lewat aplikasi Steam seperti biasa. Game EA dan Ubisoft update lewat launcher masing-masing.",
  },
];

const FAQS_EN = [
  {
    q: "How does game activation work?",
    a: "Atlas Tools activates the game directly on your PC, with no shared account and no remote login. The desktop app installs the title into your own Steam, EA, or Ubisoft client and unlocks it locally, so you launch and play from your own machine like any other game you own.",
  },
  {
    q: "Is this a subscription?",
    a: "No. The Steam Unlocker is a one-time purchase with lifetime access: pay once, use it for good.",
  },
  {
    q: "Is this safe for my computer?",
    a: "Yes. The Atlas Tools app contains no malware, keyloggers, or other harmful components, and more than 7,200 customers use it.",
  },
  {
    q: "Which platforms are supported?",
    a: "Steam, EA, Ubisoft Connect, and Denuvo-protected games. Online-Fix covers multiplayer on compatible titles.",
  },
  {
    q: "How do I pay?",
    a: "Orders go through our Tokopedia and Shopee stores, so every payment has the marketplace's buyer protection.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If you cannot activate your game with the Atlas Tools app after following our support guide, we refund the full amount. Contact us on WhatsApp.",
  },
  {
    q: "Do games update automatically?",
    a: "Yes. Games activated through Steam update through the Steam client as usual. EA and Ubisoft titles update through their own launchers.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const base = useId();
  const faqs = useLang().lang === "id" ? FAQS_ID : FAQS_EN;

  return (
    <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
      {faqs.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <h3>
              <button
                id={`${base}-q${i}`}
                aria-expanded={open}
                aria-controls={`${base}-a${i}`}
                className="w-full min-h-14 py-5 flex items-center justify-between gap-6 text-left"
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span className={`text-lg font-semibold transition-colors ${open ? "text-lavender" : "text-white"}`}>{faq.q}</span>
                <svg
                  className={`h-5 w-5 flex-shrink-0 text-zinc-400 transition-transform duration-300 ${open ? "rotate-45 text-lavender" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </h3>
            <div
              id={`${base}-a${i}`}
              role="region"
              aria-labelledby={`${base}-q${i}`}
              hidden={!open}
              className="pb-6 pr-10 text-zinc-300 leading-relaxed"
            >
              {faq.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
