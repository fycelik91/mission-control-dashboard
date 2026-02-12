
import { NextResponse } from 'next/server';

export async function GET() {
  const API_URL = 'https://mission-control-fycelik91.loca.lt';
  
  try {
    const res = await fetch(`${API_URL}/calendar`, {
      headers: { 'x-api-key': 'mission-control-secret-key', 'Bypass-Tunnel-Reminder': 'true' },
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Failed to fetch from local API');
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json([]);
  }
}
