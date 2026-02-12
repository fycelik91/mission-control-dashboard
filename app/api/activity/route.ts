
import { NextResponse } from 'next/server';

export async function GET() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://157.230.133.243:8000';
  
  try {
    const res = await fetch(`${API_URL}/activity`, {
      headers: { 'x-api-key': 'mission-control-secret-key' },
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Failed to fetch from local API');
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    // Fallback to mock if local server is unreachable
    return NextResponse.json([
      { id: "err-1", timestamp: new Date().toISOString(), action: "System Error", detail: "Could not connect to Mission Control Server. Is it running?" }
    ]);
  }
}
