"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does game activation work?",
    a: "Atlas Tools activates the game directly on your PC — no shared account, no remote login. The desktop app installs the title into your own Steam, EA, or Ubisoft client and unlocks it locally, so you launch and play from your own machine like any other game you own.",
  },
  {
    q: "Is this a subscription?",
    a: "No. The Steam Unlocker is a one-time purchase with lifetime access - pay once, use forever.",
  },
  {
    q: "Is this safe for my computer?",
    a: "Yes. The Atlas Tools app is clean software with no malware, keyloggers, or harmful components. Thousands of customers use it daily without issues.",
  },
  {
    q: "Which platforms are supported?",
    a: "Steam, EA, Ubisoft Connect, and Denuvo-protected games. We also support Online-Fix for multiplayer on compatible titles.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept orders from Tokopedia & Shopee. All orders through Tokopedia & Shopee are fully buyer-protected.",
  },
  {
    q: "Can I get a refund?",
    a: "Yes. If you cannot activate your game using the Atlas Tools App after following our support guide, we will issue a full refund. You can contact us on Whatsapp.",
  },
  {
    q: "Do games update automatically?",
    a: "Yes. Games activated through Steam update normally through the Steam client. EA and Ubisoft titles also receive updates through their respective launchers.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`rounded-xl border transition-all duration-300 overflow-hidden ${
            openIndex === i
              ? "border-purple-500/50 bg-purple-500/5"
              : "border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <button
            className="w-full p-6 flex items-center justify-between text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className={`font-light text-lg tracking-wide transition-colors duration-200 ${
              openIndex === i ? "text-purple-400" : "text-white"
            }`}>
              {faq.q}
            </span>
            <span className={`text-2xl transition-all duration-300 flex-shrink-0 ml-4 ${
              openIndex === i ? "text-purple-400 rotate-45" : "text-zinc-500"
            }`}>
              +
            </span>
          </button>

          <div className={`transition-all duration-300 ease-in-out ${
            openIndex === i ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}>
            <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800/50 pt-4">
              {faq.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
