// Role: Displays single product with image, title, price, rating, wishlist, and cart controls

"use client";

import Link from "next/link";
import { Heart, Minus, Plus } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useToastStore } from "@/stores/toast-store";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] || product.thumbnail;
  
  /* ===== STORES ===== */
  const { items, updateQuantity, removeItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { showToast } = useToastStore();
  
  /* ===== CART STATE ===== */
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const isWished = isInWishlist(product.id);

  /* ===== HANDLE WISHLIST TOGGLE ===== */
  const handleWishlistToggle = () => {
    toggleItem(product);
    if (!isWished) {
      showToast(`${product.title} added to wishlist!`, "wishlist");
    } else {
      showToast(`${product.title} removed from wishlist`, "wishlist");
    }
  };

  /* ===== HANDLE DECREASE QUANTITY ===== */
  const handleDecrease = () => {
    if (quantity === 1) {
      removeItem(product.id);
      showToast(`${product.title} removed from cart`, "cart");
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  /* ===== HANDLE INCREASE QUANTITY ===== */
  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
    showToast(`${product.title} added to cart!`, "cart");
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-sm shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700 cursor-pointer">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Title */}
        <Link href={`/product/${product.id}`} className="cursor-pointer">
          <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(product.rating.rate))}
            {"☆".repeat(5 - Math.floor(product.rating.rate))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.rating.count})
          </span>
        </div>

        {/* Price and Actions */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          
          <div className="flex items-center gap-2">
            {/* Quantity Controls (only show if item in cart) */}
            {quantity > 0 && (
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-sm">
                <button
                  onClick={handleDecrease}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-sm transition-colors cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-sm transition-colors cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {/* Add to Cart Button (only show if quantity is 0) */}
            {quantity === 0 && (
              <AddToCartButton product={product} variant="default" />
            )}
            
            {/* Wishlist Button */}
            <button
              onClick={handleWishlistToggle}
              className={`p-2 rounded-sm transition-all duration-200 cursor-pointer ${
                isWished
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-500 hover:text-white"
              }`}
              aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 ${isWished ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}