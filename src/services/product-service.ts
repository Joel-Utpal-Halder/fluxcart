// API Messenger: Talks to DummyJSON, fetches products, transforms data
// Role: All API calls to DummyJSON - products, search, categories

const API_BASE = "https://dummyjson.com";

export const productService = {
  /* ===== GET ALL PRODUCTS WITH PAGINATION ===== */
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
      images: p.images,
      thumbnail: p.thumbnail,
      rating: {
        rate: p.rating,
        count: p.stock
      }
    }));
    
    return data;
  },

  /* ===== GET SINGLE PRODUCT BY ID ===== */
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

  /* ===== SEARCH PRODUCTS BY NAME ===== */
  // Uses DummyJSON search endpoint: /products/search?q={query}
  searchProducts: async (query: string) => {
    const res = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error("Search failed");
    const data = await res.json();
    
    // Transform data to match Product type
    data.products = data.products.map((p: any) => ({
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
    }));
    
    return data;
  },

  /* ===== GET ALL CATEGORIES ===== */
  getAllCategories: async () => {
  const res = await fetch(`${API_BASE}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
},

  /* ===== GET PRODUCTS BY CATEGORY ===== */
  getProductsByCategory: async (category: string) => {
  const res = await fetch(`${API_BASE}/products/category/${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error(`Failed to fetch ${category} products`);
  const data = await res.json();
    
    // Transform data to match Product type
   data.products = data.products.map((p: any) => ({
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
  }));
  
  return data;
},
};