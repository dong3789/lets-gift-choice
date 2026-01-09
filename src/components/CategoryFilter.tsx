'use client';

import { CATEGORIES, Category } from '@/types';
import { motion } from 'framer-motion';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categoryEmojis: Record<Category | 'all', string> = {
  all: '🎁',
  '한우/육류': '🥩',
  '수산물': '🐟',
  '과일': '🍎',
  '건강식품': '🧧',
  '참기름/들기름': '🫒',
  '과자/간식': '🍘',
  '화장품': '✨',
};

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-3 justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <button
        onClick={() => onSelectCategory('all')}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
          selectedCategory === 'all'
            ? 'bg-slate-900 text-white shadow-lg'
            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
        }`}
      >
        <span>{categoryEmojis.all}</span>
        <span>전체</span>
      </button>
      {CATEGORIES.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all ${
            selectedCategory === category
              ? 'bg-slate-900 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
          }`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>{categoryEmojis[category]}</span>
          <span>{category}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
