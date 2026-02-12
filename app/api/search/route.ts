
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  // Mock search results
  const results = [
    { type: "memory", title: "Project Alpha Notes", snippet: `...relevant to ${query}...`, date: "2023-10-01" },
    { type: "task", title: "Update Documentation", snippet: `Check ${query} section`, date: "2023-10-05" },
  ];

  return NextResponse.json(results);
}
