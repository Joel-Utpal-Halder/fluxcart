// Role: A reusable button that adds products to cart with visual feedback (success state, loading state, quantity selector). Provides add-to-cart functionality with quantity selector and success feedback

"use client";

import { useState } from "react";
import { ShoppingCart, Check, Minus, Plus } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  variant?: "default" | "full";  // default: icon only, full: with text + quantity
}

export function AddToCartButton({ product, variant = "default" }: AddToCartButtonProps) {
  const { addItem, items, updateQuantity } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);
  
  // Find current item in cart
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  /* ===== Handle Add to Cart with Animation ===== */
  const handleAdd = () => {
    addItem(product);
    setIsAdded(true);
    
    // Reset success animation after 1.5 seconds
    setTimeout(() => setIsAdded(false), 1500);
  };

  /* ===== Handle Quantity Change ===== */
  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(product.id, newQuantity);
  };

  /* ===== Variant 1: Icon Only (for product cards) ===== */
  if (variant === "default") {
    return (
      <button
        onClick={handleAdd}
        className={`p-2 rounded-full transition-all duration-200 ${
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

  /* ===== Variant 2: Full Button with Quantity (for product detail page) ===== */
  return (
    <div className="flex items-center gap-3">
      {/* Quantity Selector (only show if item in cart) */}
      {quantity > 0 && (
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-lg transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      )}
      
      {/* Add to Cart Button */}
      <button
        onClick={handleAdd}
        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
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