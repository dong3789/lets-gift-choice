'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const selectedGift = useCartStore((state) => state.selectedGift);
  const { user, signOut, initialize, isInitialized } = useAuthStore();

  useEffect(() => {
    setMounted(true);
    initialize();
  }, [initialize]);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/90">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg shadow-rose-200">
              <span className="text-white text-xl">🎁</span>
            </div>
            <div>
              <span className="text-lg font-bold text-gray-900">설날 선물</span>
              <span className="hidden sm:inline text-sm text-gray-400 ml-2">Gift Mall</span>
            </div>
          </Link>

          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
            >
              홈
            </Link>
            {mounted && isInitialized && user ? (
              <>
                <Link
                  href="/tracking"
                  className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
                >
                  대시보드
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50 text-sm"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                운영자
              </Link>
            )}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">선택한 선물</span>
              {mounted && selectedGift && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  1
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
