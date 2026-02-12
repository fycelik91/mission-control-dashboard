
import { NextResponse } from 'next/server';

export async function GET() {
  const API_URL = 'https://mission-control-fycelik91.loca.lt';
  
  try {
    const res = await fetch(`${API_URL}/activity`, {
      headers: { 
        'x-api-key': 'mission-control-secret-key',
        'Bypass-Tunnel-Reminder': 'true' // localtunnel asks for confirmation sometimes
      },
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Failed to fetch from local API');
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json([
      { 
        id: "err-conn", 
        timestamp: new Date().toISOString(), 
        action: "Connection Error", 
        detail: "Could not reach Mission Control Server via Tunnel. Check if localtunnel is running.",
        icon: "🔴"
      }
    ]);
  }
}
