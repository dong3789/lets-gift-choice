'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { gifts, getPopularGifts, searchGifts, getGiftsByCategory } from '@/data/gifts';
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
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.section
        className="text-center py-12 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 rounded-3xl shadow-xl text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 text-6xl">🧧</div>
          <div className="absolute top-8 right-8 text-5xl">🎁</div>
          <div className="absolute bottom-4 left-1/4 text-4xl">✨</div>
          <div className="absolute bottom-8 right-1/4 text-5xl">🧧</div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gold-300">2025 설날</span> 명절 선물
          </h1>
          <p className="text-lg md:text-xl text-primary-100 mb-2">
            소중한 분들께 마음을 전하세요
          </p>
          <p className="text-gold-400 font-semibold text-xl mb-8">
            🎊 전 상품 무료 배송 + 100% 할인 이벤트 🎊
          </p>
          <SearchBar onSearch={handleSearch} />
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
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔥</span>
            <h2 className="text-2xl font-bold text-gray-800">인기 상품</h2>
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
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">🎁</span>
          <h2 className="text-2xl font-bold text-gray-800">
            {searchQuery
              ? `"${searchQuery}" 검색 결과`
              : selectedCategory === 'all'
              ? '전체 상품'
              : selectedCategory}
          </h2>
          <span className="text-gray-500 text-lg">({filteredGifts.length}개)</span>
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
          <div className="text-center py-16 bg-white rounded-2xl shadow">
            <span className="text-6xl mb-4 block">😢</span>
            <p className="text-gray-500 text-lg">검색 결과가 없습니다</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              전체 상품 보기
            </button>
          </div>
        )}
      </motion.section>
    </div>
  );
}
