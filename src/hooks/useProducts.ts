// Role: Manages product fetching with pagination support

import { useState, useEffect } from "react";
import { productService } from "@/services/product-service";
import type { Product, ProductsResponse } from "@/types/product";

export function useProducts(limit = 12, skip = 0) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: ProductsResponse = await productService.getAllProducts(limit, skip);
      setProducts(data.products);
      setTotal(data.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [limit, skip]);

  return { products, loading, error, total, refetch: fetchProducts };
}