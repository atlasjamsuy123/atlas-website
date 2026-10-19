"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { GameDetails } from "../lib/catalog";
import SortMenu from "./SortMenu";

type Item = { appid: number; name: string; lm: number; released: string };
type PageResult = { total: number; totalAll: number; page: number; pages: number; pageSize: number; items: Item[] };

const SORTS = [
  { key: "released", label: "Newest releases" },
  { key: "az", label: "Name (A to Z)" },
  { key: "za", label: "Name (Z to A)" },
] as const;

const PAGE_SIZE = 24;

/** Legacy header path; newer apps only have a hashed one, which the details call supplies. */
const cdnHeader = (appid: number) => `https://cdn.akamai.steamstatic.com/steam/apps/${appid}/header.jpg`;

function updatedLabel(lm: number) {
  if (!lm) return "";
  const days = Math.floor((Date.now() / 1000 - lm) / 86400);
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? "1 month ago" : `${months} months ago`;
  const years = Math.floor(days / 365);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

function pageWindow(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const out: (number | "…")[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) out.push("…");
  for (let i = start; i <= end; i++) out.push(i);
  if (end < total - 1) out.push("…");
  out.push(total);
  return out;
}

export default function GameCatalog() {
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sort, setSort] = useState<(typeof SORTS)[number]["key"]>("released");
  const [page, setPage] = useState(1);
  const [details, setDetails] = useState<Record<number, GameDetails>>({});
  const [retry, setRetry] = useState(0);
  // Each response is stored with the request key it answers, so "loading" is simply
  // "the latest answer isn't for the current request" (no setState inside the effect body).
  const [loaded, setLoaded] = useState<{ key: string; data?: PageResult; error?: string } | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Debounce typing; a new search starts from page 1.
  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(query);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const requestKey = `${debounced}|${sort}|${page}|${retry}`;
  const loading = loaded?.key !== requestKey;
  const result = loaded?.data ?? null;
  const error = loading ? "" : loaded?.error ?? "";

  // Load the page.
  useEffect(() => {
    const ctrl = new AbortController();
    const qs = new URLSearchParams({ q: debounced, sort, page: String(page), size: String(PAGE_SIZE) });
    fetch(`/api/games?${qs}`, { signal: ctrl.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error((await r.json().catch(() => null))?.error ?? "Failed to load games.");
        return r.json() as Promise<PageResult>;
      })
      .then((data) => setLoaded({ key: requestKey, data }))
      .catch((e: Error) => {
        if (e.name === "AbortError") return;
        setLoaded((prev) => ({ key: requestKey, data: prev?.data, error: e.message }));
      });
    return () => ctrl.abort();
  }, [debounced, sort, page, requestKey]);

  // Store details for the cards on screen (genres, real header art, release state).
  useEffect(() => {
    if (!result) return;
    const ids = result.items.map((i) => i.appid).filter((id) => !details[id]);
    if (ids.length === 0) return;
    const ctrl = new AbortController();
    fetch(`/api/games/details?ids=${ids.join(",")}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : {}))
      .then((d: Record<number, GameDetails>) => setDetails((prev) => ({ ...prev, ...d })))
      .catch(() => {});
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  // Hide entries Steam says aren't released games (DLC, tools, coming soon), like Atlas Tools does.
  const visible = useMemo(
    () =>
      (result?.items ?? []).filter((it) => {
        const d = details[it.appid];
        if (!d) return true;
        if (d.found && d.type && d.type !== "game") return false;
        if (d.comingSoon && !/^\d+$/.test(debounced.trim())) return false;
        return true;
      }),
    [result, details, debounced],
  );

  const goTo = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={topRef} className="scroll-mt-28">
      {/* Header */}
      <div className="lg-rise mb-8">
        <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">Game Library</h1>
        <p className="mt-3 text-zinc-300">
          <span className="font-semibold text-violet-300">{result ? result.totalAll.toLocaleString("en-US") : "…"} games</span>{" "}
          available
        </p>
        <p className="mt-1 text-sm text-zinc-400">DLC, soundtracks and unreleased titles are hidden.</p>
      </div>

      {/* Search + sort */}
      <div className="lg-rise glass glass-strong glass-blur relative z-20 rounded-3xl p-2 flex flex-col sm:flex-row gap-2 mb-8" style={{ ["--i" as string]: 1 }}>
        <label className="flex-1 flex items-center gap-3 px-4">
          <svg className="w-5 h-5 text-zinc-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by game name or App ID…"
            className="w-full bg-transparent py-3 text-white placeholder:text-zinc-400 outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-zinc-400 hover:text-white text-sm" aria-label="Clear search">
              ✕
            </button>
          )}
        </label>
        <SortMenu
          value={sort}
          options={SORTS}
          onChange={(key) => {
            setSort(key);
            setPage(1);
          }}
        />
      </div>

      {result && debounced && (
        <p className="mb-5 text-sm text-zinc-400">
          {result.total.toLocaleString("en-US")} result{result.total === 1 ? "" : "s"} for “{debounced}”
        </p>
      )}

      {error && (
        <div className="glass rounded-3xl p-10 text-center text-zinc-300">
          {error}
          <div className="mt-4">
            <button className="glass-pill" onClick={() => setRetry((r) => r + 1)}>Try again</button>
          </div>
        </div>
      )}

      {/* Grid */}
      {!error && (
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }, (_, i) => <SkeletonCard key={i} i={i} />)
            : visible.map((it, i) => <GameCard key={it.appid} item={it} d={details[it.appid]} i={i} />)}
        </div>
      )}

      {!loading && !error && visible.length === 0 && (
        <div className="glass rounded-3xl p-12 text-center text-zinc-400">No games match your search.</div>
      )}

      {/* Pager */}
      {result && result.pages > 1 && !error && (
        <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
          <button className="glass-pill !px-4" disabled={page <= 1} onClick={() => goTo(page - 1)} aria-label="Previous page">
            ‹
          </button>
          {pageWindow(result.page, result.pages).map((p, i) =>
            p === "…" ? (
              <span key={`gap-${i}`} className="px-2 text-zinc-400">…</span>
            ) : (
              <button
                key={p}
                onClick={() => goTo(p)}
                className={`glass-pill !px-4 ${p === result.page ? "glass-pill-accent" : ""}`}
              >
                {p}
              </button>
            ),
          )}
          <button className="glass-pill !px-4" disabled={page >= result.pages} onClick={() => goTo(page + 1)} aria-label="Next page">
            ›
          </button>
        </div>
      )}
    </div>
  );
}

function GameCard({ item, d, i }: { item: Item; d?: GameDetails; i: number }) {
  // Steam's real (possibly hashed) header once details arrive, the legacy CDN path until then.
  const src = d?.header || cdnHeader(item.appid);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const broken = failedSrc === src;

  const chips = d ? [...d.genres, ...d.tags].slice(0, 5) : null;
  const released = d?.released || item.released;

  return (
    <article className="lg-rise glass glass-hover group rounded-3xl overflow-hidden flex flex-col" style={{ ["--i" as string]: i % 12 }}>
      {/* Header art */}
      <div className="relative aspect-[460/215] overflow-hidden bg-white/5">
        {!broken && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={item.name}
            loading="lazy"
            onError={() => setFailedSrc(src)}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        {d?.free && (
          <span className="absolute top-3 left-3 glass-chip !text-emerald-200 !bg-emerald-500/25 !border-emerald-400/40 backdrop-blur-md">
            Free
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 p-5">
        <h3 className="text-white font-semibold leading-snug line-clamp-2">{item.name}</h3>
        <p className="mt-1 text-xs text-zinc-400">App ID: {item.appid}</p>

        <div className="mt-3 flex flex-wrap content-start gap-1.5 min-h-[3.25rem]">
          {chips === null
            ? [64, 48, 56].map((w, k) => <span key={k} className="lg-skeleton h-5" style={{ width: w }} />)
            : chips.map((c) => (
                <span key={c} className="glass-chip">
                  {c}
                </span>
              ))}
        </div>

        {(released || item.lm > 0) && (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {/* The list's own timestamp is a bulk-refresh date, so prefer Steam's release date. */}
            {released ? `Released ${released}` : `Updated ${updatedLabel(item.lm).toLowerCase()}`}
          </p>
        )}
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 gap-2 p-3 pt-0">
        <a
          href={`https://store.steampowered.com/app/${item.appid}`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-pill !rounded-2xl !py-2 !text-xs"
        >
          <ExternalIcon /> Steam
        </a>
        <a
          href={`https://steamdb.info/app/${item.appid}/`}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-pill !rounded-2xl !py-2 !text-xs"
        >
          <ExternalIcon /> SteamDB
        </a>
      </div>
    </article>
  );
}

function SkeletonCard({ i }: { i: number }) {
  return (
    <div className="lg-rise glass rounded-3xl overflow-hidden" style={{ ["--i" as string]: i }}>
      <div className="aspect-[460/215] lg-skeleton !rounded-none" />
      <div className="p-5 space-y-3">
        <div className="lg-skeleton h-4 w-3/4" />
        <div className="lg-skeleton h-3 w-1/3" />
        <div className="flex gap-2">
          <div className="lg-skeleton h-5 w-16" />
          <div className="lg-skeleton h-5 w-12" />
        </div>
      </div>
    </div>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 3h7v7m0-7L10 14M5 5h4M5 5v14h14v-4" />
    </svg>
  );
}
