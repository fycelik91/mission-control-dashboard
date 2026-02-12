
import { NextResponse } from 'next/server';

// Mock data for now since we can't access local file system from Vercel serverless functions directly
// without a database or external storage. In a real scenario, this would connect to a DB.
const MOCK_ACTIVITY = [
  { id: 1, timestamp: new Date().toISOString(), action: "System", detail: "Mission Control Dashboard initiated" },
  { id: 2, timestamp: new Date(Date.now() - 3600000).toISOString(), action: "Task", detail: "Analyzed weekly metrics" },
  { id: 3, timestamp: new Date(Date.now() - 86400000).toISOString(), action: "Memory", detail: "Updated MEMORY.md with new preferences" },
  { id: 4, timestamp: new Date(Date.now() - 172800000).toISOString(), action: "Deploy", detail: "Deployed version 1.0.2 to production" },
];

export async function GET() {
  return NextResponse.json(MOCK_ACTIVITY);
}
