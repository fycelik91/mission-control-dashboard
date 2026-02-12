import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const API_URL = "https://mission-control-fycelik91.loca.lt";

  try {
    const res = await fetch(`${API_URL}/calendar`, {
      headers: {
        "x-api-key": "mission-control-secret-key",
        "Bypass-Tunnel-Reminder": "true",
      },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch calendar");

    const data = await res.json();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store, no-cache, must-revalidate" },
    });
  } catch (error) {
    console.error("Calendar API Error:", error);
    return NextResponse.json([], {
      headers: { "Cache-Control": "no-store" },
    });
  }
}
