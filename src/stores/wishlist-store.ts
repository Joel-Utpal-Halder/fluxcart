// Role: Manages wishlist state with localStorage persistence

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleItem: (product: Product) => void;
  clearWishlist: () => void;
  getTotalItems: () => number;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      /* ===== INITIAL STATE ===== */
      items: [],

      /* ===== ADD PRODUCT TO WISHLIST ===== */
      addItem: (product: Product) => {
        const exists = get().items.some((item) => item.id === product.id);
        if (!exists) {
          set({ items: [...get().items, product] });
        }
      },

      /* ===== REMOVE PRODUCT FROM WISHLIST ===== */
      removeItem: (productId: number) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      /* ===== CHECK IF PRODUCT IS IN WISHLIST ===== */
      isInWishlist: (productId: number) => {
        return get().items.some((item) => item.id === productId);
      },

      /* ===== TOGGLE PRODUCT (ADD/REMOVE) ===== */
      toggleItem: (product: Product) => {
        const exists = get().isInWishlist(product.id);
        if (exists) {
          get().removeItem(product.id);
        } else {
          get().addItem(product);
        }
      },

      /* ===== CLEAR ENTIRE WISHLIST ===== */
      clearWishlist: () => {
        set({ items: [] });
      },

      /* ===== GET TOTAL WISHLIST ITEMS ===== */
      getTotalItems: () => {
        return get().items.length;
      },
    }),
    {
      name: "wishlist-storage", // localStorage key
    }
  )
);