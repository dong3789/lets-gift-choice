'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { gifts, getPopularGifts, searchGifts } from '@/data/gifts';
import GiftCard from '@/components/GiftCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const popularGifts = useMemo(() => getPopularGifts(), []);

  const filteredGifts = useMemo(() => {
    let result = gifts;

    if (searchQuery) {
      result = searchGifts(searchQuery);
    }

    if (selectedCategory !== 'all') {
      result = result.filter((gift) => gift.category === selectedCategory);
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSelectedCategory('all');
    }
  };

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gradient-to-br from-rose-500 via-rose-600 to-rose-700 rounded-3xl p-8 md:p-12 text-white relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
              설날 이벤트 진행중
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              2026 설날
              <br />
              <span className="text-rose-200">특별한 선물</span>
            </h1>

            <p className="text-lg md:text-xl text-rose-100 mb-4">
              소중한 분들께 마음을 전하세요
            </p>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-xl mb-8">
              <span className="text-2xl">🎁</span>
              <span className="font-semibold">전 상품 100% 할인 + 무료 배송</span>
            </div>

            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </motion.section>

      {/* Category Filter */}
      <section>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      {/* Popular Gifts Section */}
      {!searchQuery && selectedCategory === 'all' && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">🔥</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">인기 상품</h2>
            </div>
            <span className="text-gray-400 text-sm">{popularGifts.length}개 상품</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularGifts.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <GiftCard gift={gift} />
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* All/Filtered Gifts Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
              <span className="text-xl">🎁</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {searchQuery
                ? `"${searchQuery}" 검색 결과`
                : selectedCategory === 'all'
                ? '전체 상품'
                : selectedCategory}
            </h2>
          </div>
          <span className="text-gray-400 text-sm">{filteredGifts.length}개 상품</span>
        </div>

        {filteredGifts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGifts.map((gift, index) => (
              <motion.div
                key={gift.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <GiftCard gift={gift} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg mb-4">검색 결과가 없습니다</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-rose-500 hover:text-rose-600 font-medium transition-colors"
            >
              전체 상품 보기
            </button>
          </div>
        )}
      </motion.section>
    </div>
  );
}
