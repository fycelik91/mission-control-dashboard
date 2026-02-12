
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Zap, Rocket, AlertCircle, Terminal, Cpu, Database, MessageCircle } from 'lucide-react';

interface ActivityItem {
  id: string;
  timestamp: string;
  action: string;
  detail: string;
  icon: string;
}

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'zap': return <Zap className="w-5 h-5 text-yellow-500" />;
    case '🚀': return <Rocket className="w-5 h-5 text-purple-500" />;
    case '🔴': return <AlertCircle className="w-5 h-5 text-red-500" />;
    case '💻': return <Terminal className="w-5 h-5 text-green-500" />;
    case 'brain': return <Cpu className="w-5 h-5 text-blue-500" />;
    case 'message-circle': return <MessageCircle className="w-5 h-5 text-indigo-500" />;
    case 'radar': return <Database className="w-5 h-5 text-cyan-500" />;
    default: return <Clock className="w-5 h-5 text-gray-500" />;
  }
};

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center">
                <Link href="/" className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Activity Feed</h1>
            </div>
            <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
            >
                Refresh Data
            </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No activity recorded yet.</p>
            ) : (
                activities.map((item) => (
                <div key={item.id} className="bg-white dark:bg-zinc-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-700 hover:shadow-md transition-shadow flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-gray-50 dark:bg-zinc-700/50 p-3 rounded-full flex-shrink-0">
                    {getIconComponent(item.icon)}
                    </div>
                    <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">{item.action}</span>
                        <span className="text-xs font-mono text-gray-400 bg-gray-100 dark:bg-zinc-900 px-2 py-1 rounded">
                            {new Date(item.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed break-words font-mono bg-gray-50 dark:bg-zinc-900/30 p-2 rounded border border-gray-100 dark:border-zinc-700/50">
                        {item.detail}
                    </p>
                    <div className="mt-2 text-xs text-gray-400 flex items-center gap-2">
                        <span>ID: {item.id}</span>
                        <span>•</span>
                        <span>{new Date(item.timestamp).toLocaleDateString()}</span>
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
