
import { NextResponse } from 'next/server';

export async function GET() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://157.230.133.243:8000';
  
  try {
    const res = await fetch(`${API_URL}/calendar`, {
      headers: { 'x-api-key': 'mission-control-secret-key' },
      cache: 'no-store'
    });
    
    if (!res.ok) throw new Error('Failed to fetch from local API');
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json([
      { id: "err-2", title: "API Unavailable", start: new Date().toISOString(), type: "Error" }
    ]);
  }
}
