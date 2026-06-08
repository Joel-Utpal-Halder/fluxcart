// Role: Displays a single product with image, title, price, rating, and add-to-cart button

"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { AddToCartButton } from "./AddToCartButton";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Use the first image from the images array, or fallback to thumbnail
  const imageUrl = product.images?.[0] || product.thumbnail;

  return (
    <div className="group relative bg-gray-50 dark:bg-gray-800 rounded-sm shadow-md shadow-gray-400 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

      {/* Image Container */}
      <Link
        href={`/product/${product.id}`}
        className="block relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700"
      >
        <div className="flex justify-center items-center w-full h-64">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-60 h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">

        {/* Category */}
        <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Title */}
        <Link href={`/product/${product.id}`}>
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
            {/* Wishlist Button (placeholder - not functional yet) */}
            <button
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>

            {/* Add to Cart Button */}
            <AddToCartButton product={product} variant="default" />
          </div>
        </div>
      </div>
    </div>
  );
}
