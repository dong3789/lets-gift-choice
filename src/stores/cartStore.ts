import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Gift } from '@/types';

interface SelectionState {
  selectedGift: Gift | null;
  selectGift: (gift: Gift) => void;
  clearSelection: () => void;
  hasSelection: () => boolean;
}

export const useCartStore = create<SelectionState>()(
  persist(
    (set, get) => ({
      selectedGift: null,

      selectGift: (gift: Gift) => {
        set({ selectedGift: gift });
      },

      clearSelection: () => {
        set({ selectedGift: null });
      },

      hasSelection: () => {
        return get().selectedGift !== null;
      },
    }),
    {
      name: 'selection-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
