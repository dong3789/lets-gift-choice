'use client';

import { Gift } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import { useTrackingStore } from '@/stores/trackingStore';
import { motion } from 'framer-motion';

interface GiftCardProps {
  gift: Gift;
}

export default function GiftCard({ gift }: GiftCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const trackView = useTrackingStore((state) => state.trackView);
  const trackAddToCart = useTrackingStore((state) => state.trackAddToCart);

  const handleClick = () => {
    trackView(gift.id, gift.name, gift.category);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(gift);
    trackAddToCart(gift.id, gift.name, gift.category, 1);
  };

  const discountPercent = gift.originalPrice
    ? Math.round(((gift.originalPrice - gift.price) / gift.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-primary-100"
      whileHover={{ y: -4, scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative bg-gradient-to-br from-cream to-cream-dark p-6 flex items-center justify-center h-40">
        <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
          {gift.image}
        </span>
        {gift.isPopular && (
          <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            인기
          </span>
        )}
        {gift.isNew && (
          <span className="absolute top-3 right-3 bg-gold-500 text-primary-900 text-xs font-bold px-2 py-1 rounded-full">
            NEW
          </span>
        )}
        {discountPercent > 0 && (
          <span className="absolute bottom-3 left-3 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {discountPercent}% 할인
          </span>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-primary-600 font-medium mb-1">{gift.category}</p>
        <h3 className="font-bold text-gray-800 mb-1 line-clamp-1">{gift.name}</h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{gift.description}</p>

        <div className="flex items-center gap-1 mb-3">
          <span className="text-gold-500">★</span>
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
            <p className="text-lg font-bold text-primary-600">
              {gift.price.toLocaleString()}원
            </p>
          </div>

          <motion.button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            담기
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
