// Role: Manages shopping cart state (items, quantity, total) with localStorage persistence. Manages shopping cart state using Zustand; handles add/remove/update items and persists cart data in localStorage.

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

/* ===== Define Cart Item Structure ===== */
export interface CartItem extends Product {
  quantity: number;  // How many of this product in cart
}

/* ===== Define Store Actions ===== */
interface CartStore {
  // State
  items: CartItem[];
  
  // Actions
  addItem: (product: Product) => void;           // Add product or increase quantity
  removeItem: (productId: number) => void;       // Remove completely
  updateQuantity: (productId: number, quantity: number) => void;  // Change quantity
  clearCart: () => void;                          // Empty entire cart
  
  // Helpers
  getTotalItems: () => number;    // Sum of all quantities
  getTotalPrice: () => number;    // Sum of (price × quantity)
}

/* ===== Create Store with Persistence ===== */
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state: empty cart
      items: [],

      /* ===== Add Item to Cart ===== */
      // If product exists: increase quantity by 1
      // If new product: add with quantity 1
      addItem: (product: Product) => {
        const existingItem = get().items.find((item) => item.id === product.id);
        
        if (existingItem) {
          // Product already in cart → increase quantity
          set({
            items: get().items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          // New product → add with quantity 1
          set({ items: [...get().items, { ...product, quantity: 1 }] });
        }
      },

      /* ===== Remove Item Completely ===== */
      removeItem: (productId: number) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },

      /* ===== Update Specific Quantity ===== */
      // If quantity ≤ 0, remove the item instead
      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      /* ===== Empty Entire Cart ===== */
      clearCart: () => {
        set({ items: [] });
      },

      /* ===== Calculate Total Item Count ===== */
      // Used for cart badge in navbar
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      /* ===== Calculate Total Price ===== */
      // Used for cart page total
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage", // localStorage key (data survives page refresh)
    }
  )
);