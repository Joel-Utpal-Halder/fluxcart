// File: src/services/product-service.ts

const API_BASE = "https://dummyjson.com";

export const productService = {
  getAllProducts: async (limit = 12, skip = 0) => {
    const res = await fetch(`${API_BASE}/products?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    
    // Transform DummyJSON data to match our Product type
    data.products = data.products.map((p: any) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      images: p.images,  // Array of real images
      thumbnail: p.thumbnail,
      rating: {
        rate: p.rating,
        count: p.stock
      }
    }));
    
    return data;
  },

  getProductById: async (id: number) => {
    const res = await fetch(`${API_BASE}/products/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
    const p = await res.json();
    
    return {
      id: p.id,
      title: p.title,
      price: p.price,
      description: p.description,
      category: p.category,
      images: p.images,
      thumbnail: p.thumbnail,
      rating: {
        rate: p.rating,
        count: p.stock
      }
    };
  },
};