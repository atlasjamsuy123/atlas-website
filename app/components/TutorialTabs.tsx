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
        description: "Click Install on either Atlas Tools 1.1 or Atlas Tools 1.2. Wait for the installation to complete. Steam restarts automatically.",
        note: "Atlas Tools 1.2 is recommended if you also need Activation support. Atlas Tools 1.1 works for standard library use.",
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
    id: "activation",
    label: "Activation",
    description: "How to get a game ticket for games that need one, so they launch on your own Steam account.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    steps: [
      {
        number: 1,
        title: "Switch to Atlas Tools 1.2",
        description: "Open the Mode menu and install or switch to Atlas Tools 1.2. Activations only work in this mode.",
      },
      {
        number: 2,
        title: "Install the game in Steam",
        description: "Add the game to your library (see the Add to Library tab), then let Steam download and install it.",
        note: "The game has to be fully installed before you get a ticket, or Atlas Tools will stop and ask you to install it first.",
      },
      {
        number: 3,
        title: "Open Atlas Tools → Activations tab",
        description: "Click the Activations menu on the left sidebar, search for your game, and click its card to open the accounts panel.",
      },
      {
        number: 4,
        title: "Pick an account and click \"Get Ticket\"",
        description: "Choose any account in the panel and click Get Ticket. Each account shows how many uses it has left today.",
      },
      {
        number: 5,
        title: "Wait while Atlas Tools gets the ticket",
        description: "Atlas Tools restarts Steam with that account, waits for it to log in, saves the game ticket to your PC, then restarts Steam again. If the game has a fix, it is applied in the same run.",
        note: "This takes a minute or two. Leave Steam alone until Atlas Tools says the ticket is applied.",
      },
      {
        number: 6,
        title: "Log in to your own account and play",
        description: "When Steam reopens, log in to your own Steam account and launch the game from your library.",
        note: "Each game can be activated once every 30 hours.",
      },
    ],
  },
];

export default function TutorialTabs() {
  const [activeTab, setActiveTab] = useState("library");
  const current = tabs.find((t) => t.id === activeTab)!;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Tab buttons */}
      <div role="tablist" aria-label="Order type" className="flex flex-wrap gap-2 mb-8 justify-center">
        {tabs.map((tab) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={selected}
              aria-controls="tutorial-panel"
              onClick={() => setActiveTab(tab.id)}
              className={`flex min-h-11 items-center gap-2 px-4 rounded-xl text-sm font-semibold transition-colors border ${
                selected
                  ? "bg-[#7c3aed]/20 border-lavender/50 text-white"
                  : "bg-white/[0.04] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
              }`}
            >
              <span className={selected ? "text-lavender" : "text-zinc-400"} aria-hidden="true">
                {tab.icon}
              </span>
              {tab.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="tutorial-panel" aria-labelledby={`tab-${current.id}`}>
        <p className="text-center text-zinc-400 mb-10">{current.description}</p>

        {/* Steps: a numbered timeline, because the order matters */}
        <ol className="relative border-l border-white/10 ml-4 space-y-8">
          {current.steps.map((step) => (
            <li key={step.number} className="relative pl-9">
              <span className="absolute -left-4 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#14111f] text-sm font-bold text-lavender">
                {step.number}
              </span>
              <h4 className="text-white font-bold leading-8">{step.title}</h4>
              <p className="mt-1 text-zinc-400 text-sm leading-relaxed">{step.description}</p>
              {step.note && (
                <div className="mt-3 flex gap-2 rounded-xl border border-yellow-500/25 bg-yellow-500/[0.06] p-3">
                  <svg className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                  </svg>
                  <p className="text-yellow-100/85 text-sm leading-relaxed">{step.note}</p>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
