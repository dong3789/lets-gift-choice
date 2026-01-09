'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <span className="text-3xl">🧧</span>
            <span className="text-xl font-bold text-gold-300">설날 선물</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/"
              className="text-white/90 hover:text-gold-300 transition-colors font-medium"
            >
              홈
            </Link>
            <Link
              href="/tracking"
              className="text-white/90 hover:text-gold-300 transition-colors font-medium"
            >
              트래킹
            </Link>
            <Link
              href="/cart"
              className="relative flex items-center gap-1 bg-gold-500 hover:bg-gold-600 px-4 py-2 rounded-full transition-colors"
            >
              <span className="text-xl">🛒</span>
              <span className="font-medium text-primary-900">장바구니</span>
              {mounted && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
