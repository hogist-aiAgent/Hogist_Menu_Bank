import { create } from "zustand";

export const useMenuStore = create((set) => ({
  selectedItems: [],

  addItem: (item) =>
    set((state) => {
      if (state.selectedItems.some((i) => i.id === item.id)) {
        return state;
      }
      return { selectedItems: [...state.selectedItems, item] };
    }),

  removeItem: (item) =>
    set((state) => ({
      selectedItems: state.selectedItems.filter((i) => i.id !== item.id),
    })),

  clearAll: () => set({ selectedItems: [] }),
}));