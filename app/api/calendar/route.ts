
import { NextResponse } from 'next/server';

const MOCK_EVENTS = [
  { id: 1, title: "Weekly Review", start: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), type: "recurring" },
  { id: 2, title: "Database Backup", start: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), type: "maintenance" },
  { id: 3, title: "Content Sync", start: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(), type: "automated" },
];

export async function GET() {
  return NextResponse.json(MOCK_EVENTS);
}
