import Link from "next/link";
import { WHATSAPP } from "../lib/links";
import { LanguageSwitch } from "./LanguageProvider";

export type LegalSection = {
  heading: string;
  body?: React.ReactNode;
  list?: React.ReactNode[];
  ordered?: boolean;
};

export type LegalContent = {
  title: string;
  updated: string;
  back: string;
  sections: LegalSection[];
};

/** The WhatsApp link used inside legal text. */
export const WaLink = () => (
  <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">
    WhatsApp
  </a>
);

/** Shared layout for the Terms, Privacy and Refund pages. */
export default function LegalPage({ content }: { content: LegalContent }) {
  return (
    <div className="min-h-screen text-white" style={{ background: "linear-gradient(135deg, #0a0010 0%, #0d0018 40%, #0a000f 70%, #060008 100%)" }}>
      <div className="container mx-auto px-6 py-20 max-w-3xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/" className="text-purple-400 hover:text-purple-300 text-sm">← {content.back}</Link>
          <LanguageSwitch />
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">{content.title}</h1>
        <p className="text-zinc-400 text-sm mb-12">{content.updated}</p>

        <div className="space-y-10 text-zinc-400 text-sm leading-relaxed">
          {content.sections.map((s) => {
            const List = s.ordered ? "ol" : "ul";
            return (
              <section key={s.heading}>
                <h2 className="text-white text-lg font-bold mb-4">{s.heading}</h2>
                {s.body && <p>{s.body}</p>}
                {s.list && (
                  <List className={`${s.ordered ? "list-decimal" : "list-disc"} list-inside mt-2 space-y-1 ml-4`}>
                    {s.list.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </List>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
