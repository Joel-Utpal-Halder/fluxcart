// Role: Generates dynamic sitemap.xml for search engines

import { productService } from "@/services/product-service";

export default async function sitemap() {
  const baseUrl = "https://fluxcart.com";
  
  try {
    // Fetch all products from DummyJSON
    const { products } = await productService.getAllProducts(100, 0);
    
    // Static routes (always present)
    const staticRoutes = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      },
    ];
    
    // Dynamic product routes (one for each product)
    const productRoutes = products.map((product: any) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
    
    return [...staticRoutes, ...productRoutes];
  } catch (error) {
    // Fallback: Return only static routes if products fail to load
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/products`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.8,
      },
    ];
  }
}