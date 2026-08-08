import { books } from "@/utils/bookUtils";
import { showToast } from "@/utils/showToasts";
import { create } from "zustand";

export const useBookStore = create((set) => ({
    books: [],

    setBooks: (books) => set({ books }),

    getBooks: async () => {
        const response = await books();
        const result = response.data;
        if (result.success) {
            set({ books: result.object });
        }
        else {
            showToast(result);
        }
    }
}))