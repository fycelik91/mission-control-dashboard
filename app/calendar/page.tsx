
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalIcon, Clock, Grid } from 'lucide-react';
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay, addMonths, subMonths, addWeeks, subWeeks } from 'date-fns';

interface EventItem {
  id: string;
  title: string;
  start: string;
  type: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('week');
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

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  const nextPeriod = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const prevPeriod = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  const renderHeader = () => {
    const dateFormat = view === 'month' ? "MMMM yyyy" : "'Week of' MMM d, yyyy";
    return (
      <div className="flex items-center justify-between mb-8 bg-white dark:bg-zinc-800 p-4 rounded-xl border border-gray-100 dark:border-zinc-700 shadow-sm">
        <div className="flex items-center gap-4">
          <button onClick={prevPeriod} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xl font-bold min-w-[200px] text-center">
            {format(currentDate, dateFormat)}
          </span>
          <button onClick={nextPeriod} className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-lg">
          <button 
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'week' ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
          >
            Weekly
          </button>
          <button 
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${view === 'month' ? 'bg-white dark:bg-zinc-700 shadow-sm text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'}`}
          >
            Monthly
          </button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentDate);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="col-span-1 text-center font-medium text-gray-500 dark:text-gray-400 py-2 uppercase text-xs tracking-wider">
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(view === 'month' ? monthStart : currentDate);
    const endDate = endOfWeek(view === 'month' ? monthEnd : currentDate);

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        
        // Find events for this day
        const dayEvents = events.filter(e => isSameDay(new Date(e.start), cloneDay));
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, monthStart);
        
        days.push(
          <div
            key={day.toString()}
            className={`min-h-[120px] border border-gray-100 dark:border-zinc-700/50 p-2 relative group transition-colors hover:bg-gray-50 dark:hover:bg-zinc-800/50 
              ${!isCurrentMonth && view === 'month' ? "bg-gray-50/50 dark:bg-zinc-900/50 text-gray-400" : "bg-white dark:bg-zinc-800"}
              ${isToday ? "ring-2 ring-inset ring-blue-500/50 z-10" : ""}
            `}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full mb-2 ${isToday ? "bg-blue-600 text-white" : "text-gray-700 dark:text-gray-300"}`}>
              {formattedDate}
            </span>
            
            <div className="space-y-1">
              {dayEvents.map((evt, idx) => (
                <div key={idx} className={`text-xs p-1.5 rounded truncate border-l-2 ${
                  evt.type === 'Routine' ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-500 text-purple-700 dark:text-purple-300' :
                  evt.type === 'System' ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 text-blue-700 dark:text-blue-300' :
                  'bg-gray-100 dark:bg-zinc-700 border-gray-500 text-gray-700 dark:text-gray-300'
                }`}>
                  <div className="font-semibold truncate">{evt.title}</div>
                  <div className="text-[10px] opacity-75">{format(new Date(evt.start), "HH:mm")}</div>
                </div>
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7">
          {days}
        </div>
      );
      days = [];
    }
    return <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-zinc-700">{rows}</div>;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center">
          <Link href="/" className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Calendar</h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            {renderHeader()}
            {renderDays()}
            {renderCells()}
          </div>
        )}
      </div>
    </div>
  );
}
