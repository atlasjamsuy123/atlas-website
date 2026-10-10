import { getDetails } from "../../../lib/catalog";

/** GET /api/games/details?ids=1,2,3 — Steam store details for the cards on screen (max 30). */
export async function GET(request: Request) {
  const ids = (new URL(request.url).searchParams.get("ids") ?? "")
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isInteger(n) && n > 0)
    .slice(0, 30);
  if (ids.length === 0) return Response.json({});

  const details = await getDetails(ids);
  return Response.json(details, {
    headers: { "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400" },
  });
}
