'use client';

import { Gift } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import { useTrackingStore } from '@/stores/trackingStore';

interface GiftCardProps {
  gift: Gift;
  featured?: boolean;
}

export default function GiftCard({ gift, featured = false }: GiftCardProps) {
  const { selectGift, selectedGift } = useCartStore();
  const trackView = useTrackingStore((state) => state.trackView);
  const trackAddToCart = useTrackingStore((state) => state.trackAddToCart);

  const isSelected = selectedGift?.id === gift.id;

  const handleClick = () => {
    trackView(gift.id, gift.name, gift.category);
    selectGift(gift);
    trackAddToCart(gift.id, gift.name, gift.category, 1);
  };

  return (
    <div
      onClick={handleClick}
      className={`group cursor-pointer h-full ${featured ? 'aspect-square' : ''}`}
    >
      <div className={`relative bg-[#F5F5F3] overflow-hidden ${featured ? 'h-full' : 'aspect-square'} ${isSelected ? 'ring-2 ring-neutral-900' : ''}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${featured ? 'text-9xl' : 'text-6xl'} group-hover:scale-110 transition-transform duration-500 ease-out`}>
            {gift.image}
          </span>
        </div>

        {isSelected && (
          <div className="absolute top-4 right-4 bg-neutral-900 text-white text-[10px] tracking-wider uppercase px-2 py-1">
            Selected
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>

      <div className="pt-4 pb-2">
        <p className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase mb-1">
          {gift.category}
        </p>
        <h3 className="text-sm font-normal text-neutral-800 mb-1 line-clamp-1">
          {gift.name}
        </h3>
        <p className="text-xs text-neutral-500">
          무료
        </p>
      </div>
    </div>
  );
}
