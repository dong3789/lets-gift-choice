'use client';

import { gifts } from '@/data/gifts';
import GiftCard from '@/components/GiftCard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      <div className="container mx-auto px-6 max-w-6xl py-16">
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-neutral-400 uppercase mb-3">
            2026 Lunar New Year
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-neutral-800 tracking-wide">
            새해 선물 컬렉션
          </h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {gifts.slice(0, 7).map((gift, index) => (
            <div
              key={gift.id}
              className={index === 0 ? 'col-span-2 row-span-2' : ''}
            >
              <GiftCard gift={gift} featured={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
