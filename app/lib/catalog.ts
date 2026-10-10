/**
 * Server-side game catalog: the same SteamTools GameList the Atlas Tools app browses (~190k apps).
 *
 * The 25 MB list is fetched once per server instance and kept in memory (refreshed every few hours),
 * slimmed down to what the page needs. Store details (genres, header art, release state) come from
 * Steam's appdetails API, fetched only for the cards on screen and cached, because that API only allows
 * about 200 requests per 5 minutes per server IP.
 */

const GAME_LIST_URL =
  "https://raw.githubusercontent.com/SteamTools-Team/GameList/refs/heads/main/games.json";
const LIST_TTL_MS = 6 * 60 * 60 * 1000;
const DETAILS_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_DETAILS_CACHE = 20_000;

export type CatalogEntry = { appid: number; name: string; lm: number; lower: string };

export type GameDetails = {
  found: boolean;
  type: string;
  header: string;
  description: string;
  genres: string[];
  tags: string[];
  released: string;
  comingSoon: boolean;
  free: boolean;
};

// Names that are almost never a playable game (soundtracks, demos, servers…). Store "type" refines it.
const NON_GAME =
  /\b(soundtrack|ost|original score|demo|playtest|dedicated server|sdk|artbook|art book|wallpapers?|season pass|expansion pass|beta|test server)\b/i;

let listCache: { at: number; entries: CatalogEntry[] } | null = null;
let listLoading: Promise<CatalogEntry[]> | null = null;

async function fetchList(): Promise<CatalogEntry[]> {
  // no-store: the payload is far bigger than Next's data cache allows; we cache it in memory instead.
  const res = await fetch(GAME_LIST_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`GameList HTTP ${res.status}`);
  const raw = (await res.json()) as { appid: number; name: string; last_modified?: number }[];
  const entries: CatalogEntry[] = [];
  for (const r of raw) {
    const name = (r.name ?? "").trim();
    if (!r.appid || !name || NON_GAME.test(name)) continue;
    entries.push({ appid: r.appid, name, lm: r.last_modified ?? 0, lower: name.toLowerCase() });
  }
  return entries;
}

/** All catalog entries (cached). Serves the stale copy if a refresh fails. */
export async function getCatalog(): Promise<CatalogEntry[]> {
  const fresh = listCache && Date.now() - listCache.at < LIST_TTL_MS;
  if (fresh) return listCache!.entries;
  listLoading ??= fetchList()
    .then((entries) => {
      listCache = { at: Date.now(), entries };
      return entries;
    })
    .catch((err) => {
      if (listCache) return listCache.entries;
      throw err;
    })
    .finally(() => {
      listLoading = null;
    });
  return listLoading;
}

export type SortKey = "released" | "az" | "za";

// ── Release order ──────────────────────────────────────────────────
// The GameList has no release dates, so the newest releases come from Steam's store search sorted by
// release date (games only), keeping just the apps that are in the catalog. Walking all ~120k search
// results would take over a thousand requests, so only the newest RELEASED_SCAN of them are ordered
// exactly; the rest of the catalog follows by App ID (newest first), which roughly tracks age.

const RELEASED_TTL_MS = 60 * 60 * 1000;
const SEARCH_PAGE = 100;
const RELEASED_SCAN = 3000;

type ReleasedIndex = { at: number; for: CatalogEntry[]; order: CatalogEntry[]; dates: Map<number, string> };
let releasedCache: ReleasedIndex | null = null;
let releasedLoading: Promise<ReleasedIndex> | null = null;

async function fetchSearchPage(start: number): Promise<{ appid: number; date: string }[]> {
  const url =
    `https://store.steampowered.com/search/results/?sort_by=Released_DESC&category1=998&infinite=1` +
    `&start=${start}&count=${SEARCH_PAGE}&cc=us&l=english`;
  const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(15_000) });
  if (!res.ok) throw new Error(`Steam search HTTP ${res.status}`);
  const html = ((await res.json()) as { results_html?: string }).results_html ?? "";
  const rows: { appid: number; date: string }[] = [];
  for (const chunk of html.split("<a href=").slice(1)) {
    const id = /data-ds-appid="(\d+)"/.exec(chunk); // bundles list several ids and are skipped
    const date = /search_released[^>]*>\s*([^<]*?)\s*</.exec(chunk);
    if (id) rows.push({ appid: Number(id[1]), date: date?.[1] ?? "" });
  }
  return rows;
}

async function buildReleased(entries: CatalogEntry[]): Promise<ReleasedIndex> {
  const starts = Array.from({ length: RELEASED_SCAN / SEARCH_PAGE }, (_, i) => i * SEARCH_PAGE);
  const pages: { appid: number; date: string }[][] = new Array(starts.length);
  let next = 0;
  const worker = async () => {
    while (next < starts.length) {
      const k = next++;
      pages[k] = await fetchSearchPage(starts[k]).catch(() => []);
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));

  const byId = new Map(entries.map((e) => [e.appid, e]));
  const now = Date.now();
  const order: CatalogEntry[] = [];
  const dates = new Map<number, string>();
  for (const row of pages.flat()) {
    const entry = byId.get(row.appid);
    const when = Date.parse(row.date);
    // Skip apps the catalog doesn't have, duplicates, and anything not out yet ("Coming soon", "Q4 2026"…).
    if (!entry || dates.has(row.appid) || Number.isNaN(when) || when > now) continue;
    dates.set(row.appid, row.date);
    order.push(entry);
  }
  if (order.length === 0) throw new Error("Steam search returned nothing");
  const rest = entries.filter((e) => !dates.has(e.appid)).sort((a, b) => b.appid - a.appid);
  return { at: Date.now(), for: entries, order: order.concat(rest), dates };
}

/** Catalog in release order (cached for an hour; a stale copy is served while it refreshes). */
async function getReleased(entries: CatalogEntry[]): Promise<ReleasedIndex> {
  const cached = releasedCache?.for === entries ? releasedCache : null;
  if (!cached || Date.now() - cached.at > RELEASED_TTL_MS) {
    releasedLoading ??= buildReleased(entries)
      .then((idx) => (releasedCache = idx))
      .finally(() => {
        releasedLoading = null;
      });
  }
  if (cached) return cached;
  try {
    return await releasedLoading!;
  } catch {
    // Steam search unavailable: fall back to App ID order so the page still works.
    const order = [...entries].sort((a, b) => b.appid - a.appid);
    return { at: 0, for: entries, order, dates: new Map() };
  }
}

const sorted = new Map<SortKey, CatalogEntry[]>();
let sortedFor: CatalogEntry[] | null = null;

function sortedByName(entries: CatalogEntry[], sort: "az" | "za"): CatalogEntry[] {
  if (sortedFor !== entries) {
    sorted.clear();
    sortedFor = entries;
  }
  let list = sorted.get(sort);
  if (!list) {
    list = [...entries].sort((a, b) => a.lower.localeCompare(b.lower));
    if (sort === "za") list.reverse();
    sorted.set(sort, list);
  }
  return list;
}

/** Filter by name / App ID, sort, and slice one page. */
export async function searchCatalog(q: string, sort: SortKey, page: number, pageSize: number) {
  const all = await getCatalog();
  const query = q.trim().toLowerCase();
  const asId = /^\d+$/.test(query) ? Number(query) : null;

  const released = sort === "released" ? await getReleased(all) : null;
  let list = released ? released.order : sortedByName(all, sort as "az" | "za");
  if (query) list = list.filter((e) => e.appid === asId || e.lower.includes(query));

  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(Math.max(1, page), pages);
  const items = list.slice((current - 1) * pageSize, current * pageSize).map(({ appid, name, lm }) => ({
    appid,
    name,
    lm,
    released: released?.dates.get(appid) ?? "",
  }));
  return { total, totalAll: all.length, page: current, pages, pageSize, items };
}

// ── Store details ──────────────────────────────────────────────────

const detailsCache = new Map<number, { at: number; d: GameDetails }>();
let rateLimitedUntil = 0;

function parseDetails(appid: number, json: unknown): GameDetails | null {
  const node = (json as Record<string, { success?: boolean; data?: Record<string, unknown> }>)?.[String(appid)];
  if (!node) return null;
  if (!node.success || !node.data) {
    return { found: false, type: "", header: "", description: "", genres: [], tags: [], released: "", comingSoon: false, free: false };
  }
  const d = node.data as {
    type?: string;
    header_image?: string;
    short_description?: string;
    genres?: { description: string }[];
    categories?: { description: string }[];
    release_date?: { coming_soon?: boolean; date?: string };
    is_free?: boolean;
  };
  return {
    found: true,
    type: d.type ?? "",
    header: d.header_image ?? "",
    description: d.short_description ?? "",
    genres: (d.genres ?? []).map((g) => g.description).slice(0, 4),
    tags: (d.categories ?? []).map((c) => c.description).slice(0, 3),
    released: d.release_date?.date ?? "",
    comingSoon: !!d.release_date?.coming_soon,
    free: !!d.is_free,
  };
}

async function fetchDetails(appid: number): Promise<GameDetails | null> {
  if (Date.now() < rateLimitedUntil) return null;
  const url = `https://store.steampowered.com/api/appdetails?appids=${appid}&filters=basic,genres,categories,release_date&l=english`;
  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(10_000) });
    if (res.status === 429 || res.status === 403) {
      rateLimitedUntil = Date.now() + 2 * 60 * 1000;
      return null;
    }
    if (!res.ok) return null;
    return parseDetails(appid, await res.json());
  } catch {
    return null;
  }
}

/** Details for up to 30 apps: cached ones immediately, the rest fetched 4 at a time. */
export async function getDetails(ids: number[]): Promise<Record<number, GameDetails>> {
  const out: Record<number, GameDetails> = {};
  const missing: number[] = [];
  for (const id of ids.slice(0, 30)) {
    const hit = detailsCache.get(id);
    if (hit && Date.now() - hit.at < DETAILS_TTL_MS) out[id] = hit.d;
    else missing.push(id);
  }

  let next = 0;
  const worker = async () => {
    while (next < missing.length) {
      const id = missing[next++];
      const d = await fetchDetails(id);
      if (!d) continue;
      out[id] = d;
      if (detailsCache.size >= MAX_DETAILS_CACHE) detailsCache.delete(detailsCache.keys().next().value!);
      detailsCache.set(id, { at: Date.now(), d });
    }
  };
  await Promise.all(Array.from({ length: Math.min(4, missing.length) }, worker));
  return out;
}
