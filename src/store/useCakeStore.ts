import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cake } from "../types";
import { INITIAL_CAKES } from "../data/cakes";

interface CakeStore {
  cakes: Cake[];
  addCake: (cake: Cake) => void;
  updateCake: (id: string, cake: Partial<Cake>) => void;
  removeCake: (id: string) => void;
  resetToDefaults: () => void;
}

export const useCakeStore = create<CakeStore>()(
  persist(
    (set) => ({
      cakes: INITIAL_CAKES,
      addCake: (cake) => set((state) => ({ cakes: [...state.cakes, cake] })),
      updateCake: (id, updates) =>
        set((state) => ({
          cakes: state.cakes.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        })),
      removeCake: (id) =>
        set((state) => ({ cakes: state.cakes.filter((c) => c.id !== id) })),
      resetToDefaults: () => set({ cakes: INITIAL_CAKES }),
    }),
    { name: "bfk-cakes" }
  )
);
