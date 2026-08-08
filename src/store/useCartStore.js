import { create } from "zustand";

export const useCartStore = create((set) => ({
    carts: null,

    setCarts: (carts) => set({ carts }),
}))