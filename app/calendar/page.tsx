
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar as CalendarIcon } from 'lucide-react';

interface EventItem {
  id: number;
  title: string;
  start: string;
  type: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/calendar')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link href="/" className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold">Weekly Calendar</h1>
        </div>

        {loading ? (
          <p>Loading schedule...</p>
        ) : (
          <div className="grid gap-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs uppercase tracking-wider">
                    {event.type}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>{new Date(event.start).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
