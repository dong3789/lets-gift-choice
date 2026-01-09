'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useTrackingStore } from '@/stores/trackingStore';
import { useAuthStore } from '@/stores/authStore';
import { TrackingEventType } from '@/types';

const eventTypeLabels: Record<TrackingEventType, { label: string; icon: string; color: string }> = {
  view: { label: '조회', icon: '👁️', color: 'bg-blue-50 text-blue-600 border-blue-100' },
  addToCart: { label: '선택', icon: '✓', color: 'bg-green-50 text-green-600 border-green-100' },
  removeFromCart: { label: '선택 해제', icon: '✕', color: 'bg-orange-50 text-orange-600 border-orange-100' },
  purchase: { label: '주문 완료', icon: '🎁', color: 'bg-rose-50 text-rose-600 border-rose-100' },
  search: { label: '검색', icon: '🔍', color: 'bg-purple-50 text-purple-600 border-purple-100' },
};

export default function TrackingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { user, initialize, isInitialized, isLoading } = useAuthStore();
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
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (mounted && isInitialized && !isLoading && !user) {
      router.push('/login');
    }
  }, [mounted, isInitialized, isLoading, user, router]);

  if (!mounted || isLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-xl text-gray-400">로딩 중...</div>
      </div>
    );
  }

  if (!user) {
    return null;
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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">운영자 대시보드</h1>
          <p className="text-gray-500 mt-1">실시간 쇼핑몰 현황을 확인하세요</p>
        </div>
        <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium border border-emerald-100">
          {user.email}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">총 조회수</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{viewCount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">선물 선택</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{addToCartCount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">주문 완료</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{purchaseCount.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🎁</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">총 주문금액</p>
              <p className="text-3xl font-bold text-rose-500 mt-1">{totalRevenue.toLocaleString()}원</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">💰</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Popular Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">인기 상품 TOP 10</h2>
          {popularProducts.length > 0 ? (
            <div className="space-y-3">
              {popularProducts.map((product, index) => (
                <div key={product.giftId} className="flex items-center gap-3">
                  <span className={`text-sm font-bold w-6 h-6 rounded-full flex items-center justify-center ${
                    index < 3 ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {index + 1}
                  </span>
                  <span className="flex-1 text-gray-700 truncate">{product.giftName}</span>
                  <span className="text-sm text-gray-400">{product.count}회</span>
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
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">인기 카테고리</h2>
          {popularCategories.length > 0 ? (
            <div className="space-y-4">
              {popularCategories.map((category) => (
                <div key={category.category}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-700 font-medium">{category.category}</span>
                    <span className="text-gray-400">{category.count}회</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(category.count / maxCategoryCount) * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full"
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
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">최근 검색어</h2>
          {recentSearches.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((query, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-50 text-gray-600 rounded-lg text-sm border border-gray-100"
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
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-bold text-gray-900 mb-4">최근 주문</h2>
          {recentOrders.length > 0 ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.recipient.name}님
                    </p>
                    <p className="text-sm text-gray-400">
                      {format(new Date(order.createdAt), 'MM.dd HH:mm', { locale: ko })}
                    </p>
                  </div>
                  <p className="font-bold text-rose-500">
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
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <h2 className="text-lg font-bold text-gray-900 mb-4">활동 로그</h2>
        {recentEvents.length > 0 ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {recentEvents.map((event) => {
              const eventInfo = eventTypeLabels[event.type];
              return (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold border ${eventInfo.color}`}
                  >
                    {eventInfo.icon} {eventInfo.label}
                  </span>
                  <span className="flex-1 text-gray-700 text-sm">
                    {event.type === 'search'
                      ? `"${event.searchQuery}" 검색`
                      : event.giftName || '-'}
                  </span>
                  <span className="text-xs text-gray-400">
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
