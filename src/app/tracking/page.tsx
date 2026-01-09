'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useTrackingStore } from '@/stores/trackingStore';
import { TrackingEventType } from '@/types';

const eventTypeLabels: Record<TrackingEventType, { label: string; emoji: string; color: string }> = {
  view: { label: '조회', emoji: '👁️', color: 'bg-blue-100 text-blue-700' },
  addToCart: { label: '장바구니 추가', emoji: '🛒', color: 'bg-green-100 text-green-700' },
  removeFromCart: { label: '장바구니 제거', emoji: '🗑️', color: 'bg-orange-100 text-orange-700' },
  purchase: { label: '구매', emoji: '💰', color: 'bg-primary-100 text-primary-700' },
  search: { label: '검색', emoji: '🔍', color: 'bg-purple-100 text-purple-700' },
};

export default function TrackingPage() {
  const [mounted, setMounted] = useState(false);
  const {
    getViewCount,
    getAddToCartCount,
    getPurchaseCount,
    getTotalRevenue,
    getPopularProducts,
    getPopularCategories,
    getRecentSearches,
    getRecentOrders,
    getRecentEvents,
  } = useTrackingStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-2xl text-gray-400">로딩 중...</div>
      </div>
    );
  }

  const viewCount = getViewCount();
  const addToCartCount = getAddToCartCount();
  const purchaseCount = getPurchaseCount();
  const totalRevenue = getTotalRevenue();
  const popularProducts = getPopularProducts();
  const popularCategories = getPopularCategories();
  const recentSearches = getRecentSearches();
  const recentOrders = getRecentOrders();
  const recentEvents = getRecentEvents(15);

  const maxCategoryCount = Math.max(...popularCategories.map((c) => c.count), 1);

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <span className="text-3xl">📊</span>
        <h1 className="text-3xl font-bold text-gray-800">트래킹 대시보드</h1>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">총 조회수</p>
              <p className="text-3xl font-bold text-gray-800">{viewCount.toLocaleString()}</p>
            </div>
            <span className="text-4xl">👁️</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">장바구니 추가</p>
              <p className="text-3xl font-bold text-gray-800">{addToCartCount.toLocaleString()}</p>
            </div>
            <span className="text-4xl">🛒</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">주문 완료</p>
              <p className="text-3xl font-bold text-gray-800">{purchaseCount.toLocaleString()}</p>
            </div>
            <span className="text-4xl">📦</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">총 결제금액</p>
              <p className="text-3xl font-bold text-primary-600">{totalRevenue.toLocaleString()}원</p>
            </div>
            <span className="text-4xl">💰</span>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Popular Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🔥</span> 인기 상품 TOP 10
          </h2>
          {popularProducts.length > 0 ? (
            <div className="space-y-3">
              {popularProducts.map((product, index) => (
                <div key={product.giftId} className="flex items-center gap-3">
                  <span className="text-lg font-bold text-primary-600 w-6">
                    {index + 1}
                  </span>
                  <span className="flex-1 text-gray-700 truncate">{product.giftName}</span>
                  <span className="text-sm text-gray-500">{product.count}회</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">아직 데이터가 없습니다</p>
          )}
        </motion.div>

        {/* Popular Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📈</span> 인기 카테고리
          </h2>
          {popularCategories.length > 0 ? (
            <div className="space-y-4">
              {popularCategories.map((category) => (
                <div key={category.category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{category.category}</span>
                    <span className="text-gray-500">{category.count}회</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(category.count / maxCategoryCount) * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">아직 데이터가 없습니다</p>
          )}
        </motion.div>

        {/* Recent Searches */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>🔍</span> 최근 검색어
          </h2>
          {recentSearches.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((query, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {query}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">아직 검색 기록이 없습니다</p>
          )}
        </motion.div>

        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <span>📦</span> 최근 주문
          </h2>
          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {order.recipient.name}님 ({order.items.length}개 상품)
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(order.createdAt), 'yyyy.MM.dd HH:mm', { locale: ko })}
                    </p>
                  </div>
                  <p className="font-bold text-primary-600">
                    {order.totalAmount.toLocaleString()}원
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">아직 주문 내역이 없습니다</p>
          )}
        </motion.div>
      </div>

      {/* Activity Log */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-md p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span>📜</span> 활동 로그
        </h2>
        {recentEvents.length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentEvents.map((event) => {
              const eventInfo = eventTypeLabels[event.type];
              return (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${eventInfo.color}`}
                  >
                    {eventInfo.emoji} {eventInfo.label}
                  </span>
                  <span className="flex-1 text-gray-700">
                    {event.type === 'search'
                      ? `"${event.searchQuery}" 검색`
                      : event.giftName || '-'}
                  </span>
                  <span className="text-sm text-gray-400">
                    {format(new Date(event.timestamp), 'HH:mm:ss', { locale: ko })}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">아직 활동 기록이 없습니다</p>
        )}
      </motion.div>
    </div>
  );
}
