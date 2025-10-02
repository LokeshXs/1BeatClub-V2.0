import { create } from "zustand";

type StoreType = {
  count: number;
  setCount: (count: number) => void;
  incrementCount: () => void;
  decrementCount: () => void;
};

export const useInvitations = create<StoreType>((set) => ({
  count: 0,
  setCount: (count) => {
    set({
      count: count,
    });
  },
  incrementCount: () => {
    set((prev) => ({
      count: prev.count + 1,
    }));
  },
  decrementCount: () => {
    set((prev) => ({
      count: prev.count - 1,
    }));
  },
}));
