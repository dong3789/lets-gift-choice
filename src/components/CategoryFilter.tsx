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
  '주류': '🍷',
  '과자/간식': '🍘',
  '화장품': '✨',
};

export default function CategoryFilter({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <motion.div
      className="flex flex-wrap gap-2 justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <button
        onClick={() => onSelectCategory('all')}
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
          selectedCategory === 'all'
            ? 'bg-primary-600 text-white shadow-md'
            : 'bg-white text-gray-700 hover:bg-primary-50 border border-primary-200'
        }`}
      >
        <span>{categoryEmojis.all}</span>
        <span>전체</span>
      </button>
      {CATEGORIES.map((category) => (
        <motion.button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
            selectedCategory === category
              ? 'bg-primary-600 text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-primary-50 border border-primary-200'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{categoryEmojis[category]}</span>
          <span>{category}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}
