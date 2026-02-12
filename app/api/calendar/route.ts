
import { NextResponse } from 'next/server';

export async function GET() {
  // Return empty array to remove mock data as requested
  return NextResponse.json([]);
}
