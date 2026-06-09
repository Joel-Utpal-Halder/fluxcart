// Role: Homepage displaying product grid with category filtering

"use client";

import { useState, useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryFilter } from "@/components/ui/CategoryFilter";
import Container from "@/components/layout/Container";
import { productService } from "@/services/product-service";
import type { Product } from "@/types/product";

export default function Home() {
  /* ===== STATE DECLARATIONS ===== */
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  
  // Fetch all products (used when no category selected)
  const { products, loading, error, total } = useProducts(12);

  /* ===== FETCH PRODUCTS WHEN CATEGORY CHANGES ===== */
  useEffect(() => {
    // Action: Fetch products by category when selectedCategory changes
    const fetchCategoryProducts = async () => {
      if (selectedCategory) {
        setCategoryLoading(true);
        try {
          const data = await productService.getProductsByCategory(selectedCategory);
          setCategoryProducts(data.products);
        } catch (error) {
          console.error("Failed to fetch category products:", error);
          setCategoryProducts([]);
        } finally {
          setCategoryLoading(false);
        }
      }
    };

    fetchCategoryProducts();
  }, [selectedCategory]);

  /* ===== DETERMINE WHICH PRODUCTS TO DISPLAY ===== */
  const displayProducts = selectedCategory ? categoryProducts : products;
  const isLoading = selectedCategory ? categoryLoading : loading;

  return (
    <Container>
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to <span className="text-primary">FluxCart</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Discover amazing products at unbeatable prices. Shop the latest trends with fast shipping worldwide.
        </p>
      </section>

      {/* Products Section with Sidebar */}
      <section className="py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar: Category Filter */}
          <div className="md:w-64 flex-shrink-0">
            <CategoryFilter
              onSelectCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
            />
          </div>

          {/* Main Content: Products Grid */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {selectedCategory ? `${selectedCategory}` : "Featured Products"}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {displayProducts.length} products
              </span>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !selectedCategory && (
              <div className="text-center py-12">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover cursor-pointer"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && !error && (
              <>
                {displayProducts.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 dark:text-gray-400">
                      No products found in this category.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </Container>
  );
}