import { searchCatalog, type SortKey } from "../../lib/catalog";

const SORTS: SortKey[] = ["released", "az", "za"];

/** GET /api/games?q=&sort=released|az|za&page=1&size=24 — one page of the game catalog. */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const q = (params.get("q") ?? "").slice(0, 100);
  const sortParam = params.get("sort") as SortKey | null;
  const sort: SortKey = sortParam && SORTS.includes(sortParam) ? sortParam : "released";
  const page = Number(params.get("page")) || 1;
  const size = Math.min(48, Math.max(12, Number(params.get("size")) || 24));

  try {
    const result = await searchCatalog(q, sort, page, size);
    return Response.json(result, {
      // Let the browser/CDN reuse identical pages for a minute.
      headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" },
    });
  } catch {
    return Response.json({ error: "Game list unavailable, try again shortly." }, { status: 503 });
  }
}
