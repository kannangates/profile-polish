import { NextRequest } from "next/server";
import { fetchTrends } from "@/lib/trending";

export async function GET(req: NextRequest) {
  const geo = req.nextUrl.searchParams.get("geo") ?? "IN";
  const trends = await fetchTrends(/^[A-Z]{2}$/.test(geo) ? geo : "IN");
  return Response.json({ trends, fetchedAt: Date.now() }, { headers: { "cache-control": "public, max-age=600" } });
}
