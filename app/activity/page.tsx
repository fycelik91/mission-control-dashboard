
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Rocket, AlertCircle, Terminal, Cpu, Database, MessageCircle, Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  timestamp: string;
  action: string;
  detail: string;
  icon: string;
}

export default function ActivityPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/activity')
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load activity", err);
        setLoading(false);
      });
  }, []);

  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5 text-white" };
    switch (iconName) {
      case 'zap': return <div className="bg-yellow-500 p-2 rounded-full"><Zap {...props} /></div>;
      case '🚀': return <div className="bg-purple-500 p-2 rounded-full"><Rocket {...props} /></div>;
      case '🔴': return <div className="bg-red-500 p-2 rounded-full"><AlertCircle {...props} /></div>;
      case '💻': return <div className="bg-green-500 p-2 rounded-full"><Terminal {...props} /></div>;
      case 'brain': return <div className="bg-blue-500 p-2 rounded-full"><Cpu {...props} /></div>;
      case 'message-circle': return <div className="bg-indigo-500 p-2 rounded-full"><MessageCircle {...props} /></div>;
      case 'radar': return <div className="bg-cyan-500 p-2 rounded-full"><Database {...props} /></div>;
      default: return <div className="bg-gray-500 p-2 rounded-full"><Clock {...props} /></div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Activity Feed
            </h1>
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors border border-zinc-700"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="relative border-l border-gray-200 dark:border-zinc-800 ml-4 space-y-8 pb-10">
            {activities.map((item, idx) => (
              <div key={idx} className="relative pl-8 group animate-in slide-in-from-bottom-2 fade-in duration-500" style={{animationDelay: `${idx * 50}ms`}}>
                {/* Timeline dot/icon */}
                <div className="absolute -left-4 top-0 bg-gray-50 dark:bg-zinc-900 p-1">
                  {getIcon(item.icon)}
                </div>
                
                <div className="bg-white dark:bg-zinc-800/50 p-5 rounded-xl border border-gray-100 dark:border-zinc-700/50 shadow-sm hover:shadow-md transition-all hover:border-blue-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                      {item.action}
                    </span>
                    <span className="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded border border-gray-200 dark:border-zinc-700">
                      {new Date(item.timestamp).toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-mono whitespace-pre-wrap break-words bg-gray-50 dark:bg-black/20 p-3 rounded-lg border border-gray-100 dark:border-zinc-700/50">
                    {item.detail}
                  </div>
                  
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                    <span className="opacity-50">ID: {item.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
