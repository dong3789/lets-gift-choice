'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/stores/cartStore';
import { useTrackingStore } from '@/stores/trackingStore';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore();
  const { trackRemoveFromCart } = useTrackingStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemove = (giftId: string, giftName: string, category: string) => {
    trackRemoveFromCart(giftId, giftName, category as any);
    removeItem(giftId);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-2xl text-gray-400">로딩 중...</div>
      </div>
    );
  }

  const totalPrice = getTotalPrice();
  const discount = totalPrice; // 100% 할인
  const finalPrice = 0;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <span className="text-3xl">🛒</span>
        <h1 className="text-3xl font-bold text-gray-800">장바구니</h1>
      </motion.div>

      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-2xl shadow"
        >
          <span className="text-6xl mb-4 block">🛒</span>
          <p className="text-gray-500 text-lg mb-4">장바구니가 비어있습니다</p>
          <Link
            href="/"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            쇼핑하러 가기
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.gift.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md p-4 flex items-center gap-4"
                >
                  <div className="text-5xl bg-cream rounded-xl p-4">
                    {item.gift.image}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-primary-600 font-medium">
                      {item.gift.category}
                    </p>
                    <h3 className="font-bold text-gray-800">{item.gift.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {item.gift.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {item.gift.originalPrice.toLocaleString()}원
                        </span>
                      )}
                      <span className="text-primary-600 font-bold">
                        {item.gift.price.toLocaleString()}원
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.gift.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.gift.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      {(item.gift.price * item.quantity).toLocaleString()}원
                    </p>
                    <button
                      onClick={() =>
                        handleRemove(item.gift.id, item.gift.name, item.gift.category)
                      }
                      className="text-sm text-gray-400 hover:text-primary-600 transition-colors"
                    >
                      삭제
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <button
              onClick={() => {
                items.forEach((item) => {
                  trackRemoveFromCart(item.gift.id, item.gift.name, item.gift.category);
                });
                clearCart();
              }}
              className="text-gray-500 hover:text-primary-600 transition-colors text-sm"
            >
              장바구니 비우기
            </button>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-24"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>📋</span> 주문 요약
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>상품금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>배송비</span>
                <span className="text-green-600">무료</span>
              </div>
              <div className="flex justify-between text-primary-600 font-medium">
                <span>🎊 설날 할인 (100%)</span>
                <span>-{discount.toLocaleString()}원</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">최종 결제금액</span>
                <span className="text-2xl font-bold text-primary-600">
                  {finalPrice.toLocaleString()}원
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white text-center py-4 rounded-xl font-bold text-lg transition-all shadow-md hover:shadow-lg"
            >
              🧧 무료로 선물하기
            </Link>

            <p className="text-center text-sm text-gray-400 mt-4">
              설날 이벤트로 모든 상품이 무료입니다!
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
}
