// Product Fetching Hook
// Custom hook that encapsulates product fetching logic
// This hook will work EXACTLY the same when switch to the backend

import { useState, useEffect } from "react";
import { productService } from "@/services/product-service";
import type { Product, ProductsResponse } from "@/types/product";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  refetch: () => void;
}

export function useProducts(limit = 12): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: ProductsResponse = await productService.getAllProducts(limit);
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
  }, [limit]);

  return { products, loading, error, total, refetch: fetchProducts };
}