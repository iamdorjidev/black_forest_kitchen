import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cake, CartItem } from "../types";

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  open: () => void;
  close: () => void;
  addItem: (cake: Cake) => void;
  removeItem: (cakeId: string) => void;
  setQuantity: (cakeId: string, quantity: number) => void;
  setNote: (cakeId: string, note: string) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      addItem: (cake) =>
        set((state) => {
          const existing = state.items.find((i) => i.cake.id === cake.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.cake.id === cake.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
              isOpen: true,
            };
          }
          return { items: [...state.items, { cake, quantity: 1 }], isOpen: true };
        }),
      removeItem: (cakeId) =>
        set((state) => ({ items: state.items.filter((i) => i.cake.id !== cakeId) })),
      setQuantity: (cakeId, quantity) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.cake.id === cakeId ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        })),
      setNote: (cakeId, note) =>
        set((state) => ({
          items: state.items.map((i) => (i.cake.id === cakeId ? { ...i, note } : i)),
        })),
      clear: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.cake.price * i.quantity, 0),
      count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "bfk-cart", partialize: (state) => ({ items: state.items }) }
  )
);
