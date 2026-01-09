'use client';

import Link from 'next/link';
import { useCartStore } from '@/stores/cartStore';
import { useEffect, useState } from 'react';

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const selectedGift = useCartStore((state) => state.selectedGift);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="bg-[#FAFAF8] sticky top-0 z-50">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="text-xl tracking-[0.2em] font-light text-neutral-800 uppercase">
            설날선물
          </Link>

          <Link
            href="/cart"
            className="relative p-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {mounted && selectedGift && (
              <span className="absolute -top-0.5 -right-0.5 bg-neutral-900 text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                1
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
