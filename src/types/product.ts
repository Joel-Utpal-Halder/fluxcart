// File: src/types/product.ts

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];  // Changed from 'image' to 'images' (array)
  thumbnail: string;  // Added thumbnail
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface CartItem extends Product {
  quantity: number;
}