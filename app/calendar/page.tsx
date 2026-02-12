
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar as CalendarIcon, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface EventItem {
  id: string;
  title: string;
  start: string;
  type: string;
}

const getEventTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'routine': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
    case 'maintenance': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300';
    case 'system': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
    case 'cron': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
    default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
  }
};

export default function CalendarPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/calendar')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load calendar", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link href="/" className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Weekly Calendar</h1>
        </div>

        {loading ? (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        ) : (
          <div className="grid gap-6">
            {events.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No upcoming events scheduled.</p>
            ) : (
                events.map((event) => (
                    <div key={event.id} className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 hover:shadow-md transition-shadow relative overflow-hidden group">
                        <div className={`absolute top-0 left-0 w-2 h-full ${getEventTypeColor(event.type).replace('bg-', 'bg-gradient-to-b from-')}`}></div>
                        <div className="ml-4 flex justify-between items-start">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${getEventTypeColor(event.type)}`}>
                                    {event.type}
                                </span>
                                <span className="text-xs text-gray-400 font-mono">ID: {event.id}</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{event.title}</h3>
                            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-2">
                                <Clock className="w-4 h-4 mr-2" />
                                <span className="font-mono">
                                    {format(new Date(event.start), 'EEEE, MMMM d • HH:mm')}
                                </span>
                            </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-zinc-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <CheckCircle className="w-6 h-6 text-green-500" />
                        </div>
                        </div>
                    </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
