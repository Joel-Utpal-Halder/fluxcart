// Role: Displays all products saved in wishlist

"use client";

import Link from "next/link";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlistStore } from "@/stores/wishlist-store";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import Container from "@/components/layout/Container";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist, getTotalItems } = useWishlistStore();
  const totalItems = getTotalItems();

  /* ===== EMPTY WISHLIST STATE ===== */
  if (items.length === 0) {
    return (
      <Container>
        <div className="py-20 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-sm mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your wishlist is empty
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Save your favorite items here by clicking the heart icon.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-sm hover:bg-primary-hover transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </Container>
    );
  }

  /* ===== WISHLIST WITH ITEMS ===== */
  return (
    <Container>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              My Wishlist
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {totalItems} {totalItems === 1 ? "item" : "items"} saved
            </p>
          </div>
          
          {/* Clear Wishlist Button */}
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800 rounded-sm shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Container */}
              <Link href={`/product/${product.id}`} className="block relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700 cursor-pointer">
                <img
                  src={product.images?.[0] || product.thumbnail}
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
                  
                  <div className="flex gap-2">
                    {/* Remove from Wishlist Button */}
                    <button
                      onClick={() => removeItem(product.id)}
                      className="p-2 rounded-sm bg-red-500 text-white hover:bg-red-600 transition-all duration-200 cursor-pointer"
                      aria-label="Remove from wishlist"
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>
                    
                    {/* Add to Cart Button */}
                    <AddToCartButton product={product} variant="default" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}