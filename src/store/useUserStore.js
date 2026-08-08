import { userExist } from "@/utils/userUtils";
import { create } from "zustand";

export const useUserStore = create((set) => ({
    user: null,
    authLoading: false,
    authChecked: false,

    setUser: (user) => set({ user, authChecked: true }),
    setAuthLoading: (value) => set({ authLoading: value }),
    setAuthChecked: (value) => set({ authChecked: value }),

    getCurrentUser: async () => {
        set({ authLoading: true });
        try {
            const response = await userExist();
            const result = response?.data;
            if (result?.success) {
                set({ user: result.object });
            } else {
                set({ user: null });
            }
        } catch (error) {
            console.error("Error checking current user:", error);
            set({ user: null });
        } finally {
            set({ authLoading: false, authChecked: true });
        }
    },
}))