'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { useTrackingStore } from '@/stores/trackingStore';

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    message: '',
  });

  const { items, clearCart, getTotalPrice } = useCartStore();
  const { trackPurchase } = useTrackingStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      alert('필수 정보를 입력해주세요.');
      return;
    }

    // Track purchase
    trackPurchase(items, formData, getTotalPrice());

    // Clear cart
    clearCart();

    // Show completion
    setIsCompleted(true);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-2xl text-gray-400">로딩 중...</div>
      </div>
    );
  }

  if (items.length === 0 && !isCompleted) {
    router.push('/cart');
    return null;
  }

  if (isCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-gray-800 mb-4"
        >
          주문이 완료되었습니다!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-2"
        >
          <span className="text-gold-600 font-bold">{formData.name}</span>님께 선물이
          전달됩니다
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-primary-600 font-bold text-xl mb-8"
        >
          🧧 새해 복 많이 받으세요! 🧧
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-lg font-bold text-gray-800 mb-4">배송 정보</h2>
          <div className="text-left space-y-2 text-gray-600">
            <p>
              <span className="font-medium">받는 분:</span> {formData.name}
            </p>
            <p>
              <span className="font-medium">연락처:</span> {formData.phone}
            </p>
            <p>
              <span className="font-medium">주소:</span> {formData.address}
            </p>
            {formData.message && (
              <p>
                <span className="font-medium">선물 메시지:</span> {formData.message}
              </p>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex gap-4 justify-center"
        >
          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-full font-medium transition-all shadow-md"
          >
            계속 쇼핑하기
          </button>
          <button
            onClick={() => router.push('/tracking')}
            className="bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-full font-medium transition-all"
          >
            주문 내역 보기
          </button>
        </motion.div>
      </motion.div>
    );
  }

  const totalPrice = getTotalPrice();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <span className="text-3xl">📦</span>
        <h1 className="text-3xl font-bold text-gray-800">결제하기</h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recipient Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>🎁</span> 받는 분 정보
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름 <span className="text-primary-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="받으시는 분의 성함"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  연락처 <span className="text-primary-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-0000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  주소 <span className="text-primary-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="배송 받으실 주소"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  선물 메시지
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="새해 복 많이 받으세요! 🧧"
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg"
            >
              🧧 무료 결제 완료하기
            </button>
          </form>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📋</span> 주문 상품
          </h2>

          <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.gift.id} className="flex items-center gap-3">
                <span className="text-2xl">{item.gift.image}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 line-clamp-1">
                    {item.gift.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.gift.price.toLocaleString()}원 x {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-bold text-gray-800">
                  {(item.gift.price * item.quantity).toLocaleString()}원
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>상품금액</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>배송비</span>
              <span className="text-green-600">무료</span>
            </div>
            <div className="flex justify-between text-primary-600 font-medium">
              <span>🎊 설날 할인</span>
              <span>-{totalPrice.toLocaleString()}원</span>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">최종 결제금액</span>
              <span className="text-2xl font-bold text-primary-600">0원</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
