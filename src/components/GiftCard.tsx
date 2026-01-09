'use client';

import { Gift } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import { useTrackingStore } from '@/stores/trackingStore';
import { motion } from 'framer-motion';

interface GiftCardProps {
  gift: Gift;
}

export default function GiftCard({ gift }: GiftCardProps) {
  const { selectGift, selectedGift } = useCartStore();
  const trackView = useTrackingStore((state) => state.trackView);
  const trackAddToCart = useTrackingStore((state) => state.trackAddToCart);

  const isSelected = selectedGift?.id === gift.id;

  const handleClick = () => {
    trackView(gift.id, gift.name, gift.category);
  };

  const handleSelect = (e: React.MouseEvent) => {
    e.stopPropagation();
    selectGift(gift);
    trackAddToCart(gift.id, gift.name, gift.category, 1);
  };

  const discountPercent = gift.originalPrice
    ? Math.round(((gift.originalPrice - gift.price) / gift.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      onClick={handleClick}
      className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border-2 ${
        isSelected ? 'border-rose-500 ring-4 ring-rose-100' : 'border-transparent hover:border-gray-100'
      }`}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center h-44">
        <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
          {gift.image}
        </span>
        {isSelected && (
          <div className="absolute top-3 right-3 bg-rose-500 text-white rounded-full p-1.5">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
        {gift.isPopular && !isSelected && (
          <span className="absolute top-3 left-3 bg-slate-900 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            인기
          </span>
        )}
        {gift.isNew && !isSelected && (
          <span className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            NEW
          </span>
        )}
        {discountPercent > 0 && (
          <span className="absolute bottom-3 left-3 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      <div className="p-5">
        <p className="text-xs text-gray-400 font-medium mb-1 uppercase tracking-wide">{gift.category}</p>
        <h3 className="font-bold text-gray-900 mb-1.5 line-clamp-1 text-lg">{gift.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">{gift.description}</p>

        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex text-amber-400">
            {'★'.repeat(Math.floor(gift.rating))}
          </div>
          <span className="text-sm font-medium text-gray-700">{gift.rating}</span>
          <span className="text-sm text-gray-400">({gift.reviewCount.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            {gift.originalPrice && (
              <p className="text-sm text-gray-400 line-through">
                {gift.originalPrice.toLocaleString()}원
              </p>
            )}
            <p className="text-xl font-bold text-gray-900">
              {gift.price.toLocaleString()}원
            </p>
          </div>

          <motion.button
            onClick={handleSelect}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              isSelected
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-200'
                : 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {isSelected ? '선택됨' : '선택'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
