// Role: Displays single product with image, title, price, rating, wishlist, and add-to-cart

"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";
import { useWishlistStore } from "@/stores/wishlist-store";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0] || product.thumbnail;
  const { isInWishlist, toggleItem } = useWishlistStore();
  const isWished = isInWishlist(product.id);

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
          
          <div className="flex gap-2">
            {/* Wishlist Button */}
            <button
              onClick={() => toggleItem(product)}
              className={`p-2 rounded-sm transition-all duration-200 cursor-pointer ${
                isWished
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white"
              }`}
              aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 ${isWished ? "fill-current" : ""}`} />
            </button>
            
            {/* Add to Cart Button */}
            <AddToCartButton product={product} variant="default" />
          </div>
        </div>
      </div>
    </div>
  );
}