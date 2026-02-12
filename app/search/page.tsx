
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search as SearchIcon, FileText } from 'lucide-react';

interface SearchResult {
  type: string;
  title: string;
  snippet: string;
  date: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearching(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data);
    setSearching(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link href="/" className="mr-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold">Global Search</h1>
        </div>

        <form onSubmit={handleSearch} className="mb-10">
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tasks, memories, docs..."
              className="w-full p-4 pl-12 rounded-xl border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </form>

        <div className="space-y-4">
          {searching && <p className="text-center text-gray-500">Searching...</p>}
          
          {!searching && results.length > 0 && (
            <div className="space-y-4">
              {results.map((res, idx) => (
                <div key={idx} className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-700 hover:border-blue-500 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-mono text-blue-600 dark:text-blue-400 uppercase">{res.type}</span>
                    <span className="text-sm text-gray-400">• {res.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{res.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 font-mono text-sm bg-gray-50 dark:bg-zinc-900/50 p-2 rounded">
                    {res.snippet}
                  </p>
                </div>
              ))}
            </div>
          )}

          {!searching && query && results.length === 0 && (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
