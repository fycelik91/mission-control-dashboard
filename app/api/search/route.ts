import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  const API_URL = "https://mission-control-fycelik91.loca.lt";

  if (!query) return NextResponse.json([]);

  try {
    const res = await fetch(
      `${API_URL}/search?q=${encodeURIComponent(query)}`,
      {
        headers: {
          "x-api-key": "mission-control-secret-key",
          "Bypass-Tunnel-Reminder": "true",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Search failed");
    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json([], {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
