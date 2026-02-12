
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://157.230.133.243:8000';

  if (!query) return NextResponse.json([]);
  
  try {
    const res = await fetch(`${API_URL}/search?q=${encodeURIComponent(query)}`, {
      headers: { 'x-api-key': 'mission-control-secret-key' },
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Search failed');
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json([]);
  }
}
