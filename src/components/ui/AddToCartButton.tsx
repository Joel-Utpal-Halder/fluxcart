// File: src/components/ui/AddToCartButton.tsx
// Role: A reusable button that adds products to cart with visual feedback and toast notifications

"use client";

import { useState } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useToastStore } from "@/stores/toast-store";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  variant?: "default" | "full";
}

export function AddToCartButton({ product, variant = "default" }: AddToCartButtonProps) {
  const { addItem, items, updateQuantity, removeItem } = useCartStore();
  const { showToast } = useToastStore();
  const [isAdded, setIsAdded] = useState(false);
  
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  /* ===== Handle Add to Cart ===== */
  const handleAdd = () => {
    addItem(product);
    setIsAdded(true);
    showToast(`${product.title} added to cart!`, "cart");
    setTimeout(() => setIsAdded(false), 1500);
  };

  /* ===== Handle Decrease Quantity ===== */
  const handleDecrease = () => {
    if (quantity === 1) {
      // Action: Remove item and show toast
      removeItem(product.id);
      showToast(`${product.title} removed from cart`, "cart");
    } else {
      // Action: Decrease quantity
      updateQuantity(product.id, quantity - 1);
    }
  };

  /* ===== Handle Increase Quantity ===== */
  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
    showToast(`${product.title} added to cart!`, "cart");
  };

  /* ===== Variant 1: Icon Only (for product cards) ===== */
  if (variant === "default") {
    return (
      <button
        onClick={handleAdd}
        className={`p-2 rounded-full transition-all duration-200 cursor-pointer ${
          isAdded
            ? "bg-green-500 text-white"
            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white"
        }`}
        aria-label="Add to cart"
      >
        {isAdded ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
      </button>
    );
  }

  /* ===== Variant 2: Full Button with Quantity ===== */
  return (
    <div className="flex items-center gap-3">
      {/* Quantity Selector */}
      {quantity > 0 && (
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-sm">
          <button
            onClick={handleDecrease}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-sm transition-colors cursor-pointer"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-sm transition-colors cursor-pointer"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* Add to Cart Button */}
      <button
        onClick={handleAdd}
        className={`flex items-center gap-2 px-6 py-3 rounded-sm font-semibold transition-all duration-200 cursor-pointer ${
          isAdded
            ? "bg-green-500 text-white"
            : "bg-primary text-white hover:bg-primary-hover"
        }`}
      >
        {isAdded ? (
          <>
            <Check className="w-5 h-5" />
            <span>Added!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            <span>{quantity > 0 ? "Add More" : "Add to Cart"}</span>
          </>
        )}
      </button>
    </div>
  );
}