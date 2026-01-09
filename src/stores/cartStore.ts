import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Gift, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (gift: Gift, quantity?: number) => void;
  removeItem: (giftId: string) => void;
  updateQuantity: (giftId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (gift: Gift, quantity: number = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.gift.id === gift.id);
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.gift.id === gift.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { gift, quantity }] };
        });
      },

      removeItem: (giftId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.gift.id !== giftId),
        }));
      },

      updateQuantity: (giftId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(giftId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.gift.id === giftId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.gift.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
