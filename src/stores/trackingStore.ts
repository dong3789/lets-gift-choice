import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { TrackingEvent, TrackingEventType, Order, Category, CartItem, RecipientInfo } from '@/types';

interface TrackingState {
  events: TrackingEvent[];
  orders: Order[];
  searchQueries: string[];

  trackView: (giftId: string, giftName: string, category: Category) => void;
  trackAddToCart: (giftId: string, giftName: string, category: Category, quantity: number) => void;
  trackRemoveFromCart: (giftId: string, giftName: string, category: Category) => void;
  trackPurchase: (items: CartItem[], recipient: RecipientInfo, totalAmount: number) => void;
  trackSearch: (query: string) => void;

  getViewCount: () => number;
  getAddToCartCount: () => number;
  getPurchaseCount: () => number;
  getTotalRevenue: () => number;
  getPopularProducts: () => { giftId: string; giftName: string; count: number }[];
  getPopularCategories: () => { category: Category; count: number }[];
  getRecentSearches: () => string[];
  getRecentOrders: () => Order[];
  getRecentEvents: (limit?: number) => TrackingEvent[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useTrackingStore = create<TrackingState>()(
  persist(
    (set, get) => ({
      events: [],
      orders: [],
      searchQueries: [],

      trackView: (giftId: string, giftName: string, category: Category) => {
        const event: TrackingEvent = {
          id: generateId(),
          type: 'view',
          giftId,
          giftName,
          category,
          timestamp: new Date(),
        };
        set((state) => ({ events: [...state.events, event] }));
      },

      trackAddToCart: (giftId: string, giftName: string, category: Category, quantity: number) => {
        const event: TrackingEvent = {
          id: generateId(),
          type: 'addToCart',
          giftId,
          giftName,
          category,
          quantity,
          timestamp: new Date(),
        };
        set((state) => ({ events: [...state.events, event] }));
      },

      trackRemoveFromCart: (giftId: string, giftName: string, category: Category) => {
        const event: TrackingEvent = {
          id: generateId(),
          type: 'removeFromCart',
          giftId,
          giftName,
          category,
          timestamp: new Date(),
        };
        set((state) => ({ events: [...state.events, event] }));
      },

      trackPurchase: (items: CartItem[], recipient: RecipientInfo, totalAmount: number) => {
        const orderId = generateId();

        items.forEach((item) => {
          const event: TrackingEvent = {
            id: generateId(),
            type: 'purchase',
            giftId: item.gift.id,
            giftName: item.gift.name,
            category: item.gift.category,
            quantity: item.quantity,
            timestamp: new Date(),
          };
          set((state) => ({ events: [...state.events, event] }));
        });

        const order: Order = {
          id: orderId,
          items,
          recipient,
          totalAmount,
          createdAt: new Date(),
        };
        set((state) => ({ orders: [...state.orders, order] }));
      },

      trackSearch: (query: string) => {
        const event: TrackingEvent = {
          id: generateId(),
          type: 'search',
          searchQuery: query,
          timestamp: new Date(),
        };
        set((state) => ({
          events: [...state.events, event],
          searchQueries: [query, ...state.searchQueries.filter((q) => q !== query)].slice(0, 20),
        }));
      },

      getViewCount: () => {
        return get().events.filter((e) => e.type === 'view').length;
      },

      getAddToCartCount: () => {
        return get().events.filter((e) => e.type === 'addToCart').length;
      },

      getPurchaseCount: () => {
        return get().orders.length;
      },

      getTotalRevenue: () => {
        return get().orders.reduce((total, order) => total + order.totalAmount, 0);
      },

      getPopularProducts: () => {
        const events = get().events.filter((e) => e.type === 'view' && e.giftId);
        const countMap = new Map<string, { giftName: string; count: number }>();

        events.forEach((event) => {
          if (event.giftId && event.giftName) {
            const existing = countMap.get(event.giftId) || { giftName: event.giftName, count: 0 };
            countMap.set(event.giftId, { giftName: event.giftName, count: existing.count + 1 });
          }
        });

        return Array.from(countMap.entries())
          .map(([giftId, data]) => ({ giftId, giftName: data.giftName, count: data.count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);
      },

      getPopularCategories: () => {
        const events = get().events.filter((e) => e.category);
        const countMap = new Map<Category, number>();

        events.forEach((event) => {
          if (event.category) {
            countMap.set(event.category, (countMap.get(event.category) || 0) + 1);
          }
        });

        return Array.from(countMap.entries())
          .map(([category, count]) => ({ category, count }))
          .sort((a, b) => b.count - a.count);
      },

      getRecentSearches: () => {
        return get().searchQueries.slice(0, 10);
      },

      getRecentOrders: () => {
        return [...get().orders].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ).slice(0, 10);
      },

      getRecentEvents: (limit: number = 20) => {
        return [...get().events]
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, limit);
      },
    }),
    {
      name: 'tracking-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
