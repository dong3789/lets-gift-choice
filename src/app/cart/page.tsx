'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { useTrackingStore } from '@/stores/trackingStore';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { selectedGift, clearSelection } = useCartStore();
  const { trackRemoveFromCart } = useTrackingStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClear = () => {
    if (selectedGift) {
      trackRemoveFromCart(selectedGift.id, selectedGift.name, selectedGift.category);
    }
    clearSelection();
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xl text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">선택한 선물</h1>
        <p className="text-gray-500">소중한 분께 전달할 선물을 확인하세요</p>
      </motion.div>

      {!selectedGift ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg mb-6">아직 선물을 선택하지 않았습니다</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            선물 고르러 가기
          </Link>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="w-40 h-40 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-8xl">{selectedGift.image}</span>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-sm text-gray-400 font-medium uppercase tracking-wide mb-1">
                  {selectedGift.category}
                </p>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedGift.name}</h2>
                <p className="text-gray-500 mb-4">{selectedGift.description}</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-4">
                  <div className="flex text-amber-400">
                    {'★'.repeat(Math.floor(selectedGift.rating))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{selectedGift.rating}</span>
                  <span className="text-sm text-gray-400">({selectedGift.reviewCount.toLocaleString()})</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-3">
                  {selectedGift.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      {selectedGift.originalPrice.toLocaleString()}원
                    </span>
                  )}
                  <span className="text-2xl font-bold text-gray-900">
                    {selectedGift.price.toLocaleString()}원
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600 transition-colors font-medium"
                >
                  다른 선물 선택하기
                </button>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">설날 이벤트 100% 할인</p>
                    <p className="text-2xl font-bold text-rose-500">무료</p>
                  </div>
                  <Link
                    href="/checkout"
                    className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
                  >
                    선물하기
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
