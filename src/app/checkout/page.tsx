'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { useTrackingStore } from '@/stores/trackingStore';

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [recipientName, setRecipientName] = useState('');

  const { selectedGift, clearSelection } = useCartStore();
  const { trackPurchase } = useTrackingStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim()) {
      alert('받는 분 성함을 입력해주세요.');
      return;
    }

    if (selectedGift) {
      trackPurchase(
        [{ gift: selectedGift, quantity: 1 }],
        { name: recipientName },
        selectedGift.price
      );
    }

    clearSelection();
    setIsCompleted(true);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xl text-gray-400">로딩 중...</div>
      </div>
    );
  }

  if (!selectedGift && !isCompleted) {
    router.push('/cart');
    return null;
  }

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl mx-auto text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <svg className="w-12 h-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-gray-900 mb-3"
        >
          선물이 전달됩니다!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-500 text-lg mb-8"
        >
          <span className="text-rose-500 font-semibold">{recipientName}</span>님께{' '}
          소중한 선물이 전달될 예정입니다
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-rose-50 to-amber-50 rounded-2xl p-6 mb-8 border border-rose-100"
        >
          <p className="text-rose-600 font-bold text-xl">
            새해 복 많이 받으세요!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={() => router.push('/')}
            className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            홈으로 돌아가기
          </button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">선물 보내기</h1>
        <p className="text-gray-500">받으실 분의 성함을 입력해주세요</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
      >
        {selectedGift && (
          <div className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-100">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center">
              <span className="text-4xl">{selectedGift.image}</span>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-400 uppercase tracking-wide">{selectedGift.category}</p>
              <p className="font-bold text-gray-900">{selectedGift.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 line-through">{selectedGift.price.toLocaleString()}원</p>
              <p className="font-bold text-rose-500">무료</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              받는 분 성함
            </label>
            <input
              type="text"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="성함을 입력해주세요"
              className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:border-slate-500 focus:ring-2 focus:ring-slate-100 outline-none transition-all text-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            선물 보내기
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-4">
          설날 이벤트로 모든 선물이 무료입니다
        </p>
      </motion.div>
    </div>
  );
}
