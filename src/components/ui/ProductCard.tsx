// File: src/components/ui/ProductCard.tsx

"use client";

import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Use the first image from the images array, or fallback to thumbnail
  const imageUrl = product.images?.[0] || product.thumbnail;

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-sm shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/product/${product.id}`} className="block relative h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="p-4">
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {product.category}
        </span>

        <Link href={`/product/${product.id}`}>
          <h3 className="mt-1 text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        <div className="mt-2 flex items-center gap-1">
          <div className="flex text-yellow-400">
            {"★".repeat(Math.floor(product.rating.rate))}
            {"☆".repeat(5 - Math.floor(product.rating.rate))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            ({product.rating.count})
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          
          <div className="flex gap-2">
            <button
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-full bg-primary text-white hover:bg-primary-hover transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}