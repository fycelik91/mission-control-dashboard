
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Activity, Calendar as CalendarIcon, Search, ArrowRight, Zap, Command } from 'lucide-react';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-zinc-950 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-4 selection:bg-blue-500/30">
      
      <div className="max-w-5xl w-full animate-in fade-in zoom-in duration-700 slide-in-from-bottom-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full -z-10 animate-pulse-slow"></div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 bg-gradient-to-b from-gray-900 via-gray-700 to-gray-400 dark:from-white dark:via-zinc-400 dark:to-zinc-700 bg-clip-text text-transparent">
            Mission Control
          </h1>
          <p className="text-lg text-gray-500 dark:text-zinc-400 font-mono tracking-widest uppercase">
            System Operational • All Systems Green
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Activity */}
          <Link 
            href="/activity"
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 p-8 transition-all hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500/50 hover:bg-zinc-800/80"
            onMouseEnter={() => setHoveredCard('activity')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="w-32 h-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Activity Feed</h2>
                <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Real-time log of every system action, deployment, and memory update.
                </p>
              </div>
              <div className="mt-8 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform">
                View Timeline <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 2: Calendar */}
          <Link 
            href="/calendar"
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 p-8 transition-all hover:scale-[1.02] hover:shadow-2xl hover:border-purple-500/50 hover:bg-zinc-800/80"
            onMouseEnter={() => setHoveredCard('calendar')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <CalendarIcon className="w-32 h-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <CalendarIcon className="w-6 h-6 text-purple-600 dark:text-purple-400 group-hover:text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Calendar</h2>
                <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Weekly and monthly view of scheduled tasks, maintenance windows, and crons.
                </p>
              </div>
              <div className="mt-8 flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-2 transition-transform">
                Open Schedule <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Card 3: Global Search */}
          <Link 
            href="/search"
            className="group relative overflow-hidden rounded-3xl bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800 p-8 transition-all hover:scale-[1.02] hover:shadow-2xl hover:border-emerald-500/50 hover:bg-zinc-800/80"
            onMouseEnter={() => setHoveredCard('search')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Search className="w-32 h-32" />
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Command className="w-6 h-6 text-emerald-600 dark:text-emerald-400 group-hover:text-white" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Global Search</h2>
                <p className="text-gray-500 dark:text-zinc-400 text-sm leading-relaxed">
                  Instant access to memory files, documentation, logs, and system artifacts.
                </p>
              </div>
              <div className="mt-8 flex items-center text-sm font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-2 transition-transform">
                Start Query <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>

        </div>
        
        {/* Footer Status */}
        <div className="mt-16 flex justify-center space-x-8 text-xs font-mono text-gray-400 uppercase tracking-widest opacity-50">
           <span>API Status: Online</span>
           <span>•</span>
           <span>Latency: 24ms</span>
           <span>•</span>
           <span>Secure Tunnel: Active</span>
        </div>

      </div>
    </main>
  );
}
