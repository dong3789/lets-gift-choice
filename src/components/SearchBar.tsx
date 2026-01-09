'use client';

import { useState } from 'react';
import { useTrackingStore } from '@/stores/trackingStore';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const trackSearch = useTrackingStore((state) => state.trackSearch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      trackSearch(query.trim());
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="relative w-full max-w-xl mx-auto"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="선물을 검색하세요... 🎁"
          className="w-full px-6 py-4 pr-24 rounded-full border-2 border-primary-200 focus:border-primary-500 focus:outline-none text-gray-700 shadow-md focus:shadow-lg transition-all bg-white"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        )}
        <motion.button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-2 rounded-full font-medium transition-all shadow-md"
          whileTap={{ scale: 0.95 }}
        >
          검색
        </motion.button>
      </div>
    </motion.form>
  );
}
