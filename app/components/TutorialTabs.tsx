"use client";

import { useState } from "react";

type Step = {
  number: number;
  title: string;
  description: React.ReactNode;
  note?: string;
};

type Tab = {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
  steps: Step[];
};

const tabs: Tab[] = [
  {
    id: "library",
    label: "Add to Library",
    description: "How to add games to your Steam library using Atlas Tools.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
    steps: [
      {
        number: 1,
        title: "Open Atlas Tools",
        description: "Download and run Atlas Tools. You can get the download link from the Download section on this page.",
      },
      {
        number: 2,
        title: "Enter your Atlas Tools code",
        description: "On the login screen, enter the activation code for Atlas Tools that you received after purchase. This unlocks access to your game library.",
      },
      {
        number: 3,
        title: "Go to the Mode tab",
        description: "Click the Mode menu on the left sidebar of Atlas Tools.",
      },
      {
        number: 4,
        title: "Install a mode",
        description: "Click Install on either Atlas Tools 1.1 or Atlas Tools 1.2. Wait for the installation to complete — Steam will restart automatically.",
        note: "Atlas Tools 1.2 is recommended if you also need Activation support. Atlas Tools 1.1 works for standard library and sharing use.",
      },
      {
        number: 5,
        title: "Go to the Library tab",
        description: "Click the Library menu on the left sidebar. Your available games will be listed here.",
      },
      {
        number: 6,
        title: "Add a game to Steam",
        description: "Click on a game, then click \"Add to library\", then click \"Add\" to confirm. The game will be added to your Steam library.",
        note: "To add all your games at once, click the Auto Add button in the top-right corner of the Library tab.",
      },
    ],
  },
  {
    id: "fixes",
    label: "Fixes",
    description: "How to play games that need extra steps to run (Denuvo, EA, Ubisoft, Rockstar, etc).",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    steps: [
      {
        number: 1,
        title: "Open Atlas Tools → Fixes tab",
        description: "Launch Atlas Tools and click the Fixes menu on the left sidebar. Wait for the game list to load.",
      },
      {
        number: 2,
        title: "Search for your game and click it",
        description: "Use the search bar to find the game. Click the game card to open the fix detail panel on the right side.",
      },
      {
        number: 3,
        title: "Click \"Fix Version\"",
        description: "In the fix detail panel, click the Fix Version button. Atlas Tools will download and install the fix manifest for that game.",
      },
      {
        number: 4,
        title: "Restart Steam",
        description: "Close Steam completely and reopen it so the fix manifest takes effect.",
      },
      {
        number: 5,
        title: "Update the game",
        description: "Let Steam download and install any pending update for the game. Wait until the update is fully completed before continuing.",
      },
      {
        number: 6,
        title: "Go back to Fixes → click Fix",
        description: "Return to the Fixes tab in Atlas Tools, find the same game, and this time click the Fix button. Atlas Tools will apply the fix files to your game folder.",
        note: "The game must be fully installed and updated before this step. If the Fix button is greyed out, make sure the game is installed on your PC.",
      },
      {
        number: 7,
        title: "Launch the game",
        description: "Launch the game normally from Steam. The fix is now active and the game should run without issues.",
      },
    ],
  },
  {
    id: "sharing",
    label: "Steam Sharing",
    description: "How to play games via Steam Family Sharing using an Atlas account.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
      </svg>
    ),
    steps: [
      {
        number: 1,
        title: "Open Atlas Tools → Steam Sharing tab",
        description: "Launch Atlas Tools and click the Steam Sharing menu on the left sidebar. Wait for the game list to load.",
      },
      {
        number: 2,
        title: "Search for your game and click it",
        description: "Use the search bar to find the game. Click the game card to open the accounts panel.",
        note: "You must be logged in to your Atlas account and own the game in your Atlas library to access sharing accounts.",
      },
      {
        number: 3,
        title: "Choose an account and click \"Login Steam\"",
        description: "Select any available account from the list and click Login Steam. Steam will close and reopen automatically, logged in to the sharing account.",
      },
      {
        number: 4,
        title: "Play the game for 3–5 minutes",
        description: "Once Steam restarts, launch the game from your library. Play for at least 3–5 minutes — this is required for the DRM verification to complete.",
        note: "Do not close the game too early. The 3–5 minute session is needed for the check to pass successfully.",
      },
      {
        number: 5,
        title: "Switch back to your own account",
        description: "After you are done, switch back to your personal Steam account. Go to Steam → top-right avatar menu → Switch Account, then log in with your own credentials.",
        note: "Always switch back after playing. Leaving Steam on the sharing account may prevent other users from accessing it.",
      },
    ],
  },
  {
    id: "activation",
    label: "Activation",
    description: "How to activate a game directly to your own Steam account using a 6-character code.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    steps: [
      {
        number: 1,
        title: "Request your activation code from admin",
        description: (
          <>
            Contact the admin via{" "}
            <a
              href="https://whatsapp.com/channel/0029VbB5ZWsJ3jus9HtnEi3t"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
            >
              WhatsApp
            </a>{" "}
            to request your 6-character activation code for the game you purchased.
          </>
        ),
        note: "Codes are single-use and expire in ~30 minutes. Request it only when you are ready to activate.",
      },
      {
        number: 2,
        title: "Open Atlas Tools → Activation tab",
        description: "Launch Atlas Tools and click the Activation menu on the left sidebar.",
      },
      {
        number: 3,
        title: "Enter your 6-character code",
        description: "Type or paste the activation code into the 6 input boxes. The code is case-insensitive.",
      },
      {
        number: 4,
        title: "Click \"Apply ticket\"",
        description: "Hit the Apply ticket button. Atlas Tools will verify your code and write the game ticket to your system.",
      },
      {
        number: 5,
        title: "Game launches automatically",
        description: "Once the ticket is applied, Steam will launch the game automatically. The game is now added to your library.",
        note: "Make sure Steam is running before applying the ticket. If the game does not launch, open Steam and find it in your library manually.",
      },
    ],
  },
];

export default function TutorialTabs() {
  const [activeTab, setActiveTab] = useState("library");
  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm tracking-wide transition-all border ${
              activeTab === tab.id
                ? "bg-purple-600/30 border-purple-500/60 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
            }`}
          >
            <span className={activeTab === tab.id ? "text-purple-400" : "text-zinc-500"}>
              {tab.icon}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab description */}
      <p className="text-center text-zinc-400 text-sm mb-10 tracking-wide">
        {current.description}
      </p>

      {/* Steps */}
      <div className="space-y-4">
        {current.steps.map((step) => (
          <div
            key={step.number}
            className="flex gap-5 p-5 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:border-purple-500/20 hover:bg-purple-500/5 transition-all"
          >
            {/* Step number */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full border border-purple-500/40 flex items-center justify-center shadow-[0_0_12px_rgba(168,85,247,0.3)]">
              <span className="text-purple-400 text-sm font-light">{step.number}</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-light text-base mb-1">{step.title}</h4>
              <p className="text-zinc-500 text-sm leading-relaxed">{step.description}</p>
              {step.note && (
                <div className="mt-3 flex gap-2 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20">
                  <svg className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <p className="text-yellow-200/70 text-xs leading-relaxed">{step.note}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
