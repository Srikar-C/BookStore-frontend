import { create } from "zustand";

export const useOrderStore = create((set) => ({
    orders: null,

    setOrders: (orders) => set({ orders }),
}))