// Role: Displays list of categories and filters products by selected category

"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CategoryFilterProps {
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

interface Category {
  slug: string;
  name: string;
  url: string;
}

export function CategoryFilter({ onSelectCategory, selectedCategory }: CategoryFilterProps) {
  /* ===== STATE DECLARATIONS ===== */
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false); // For mobile collapsible

  /* ===== FETCH CATEGORIES ON MOUNT ===== */
  useEffect(() => {
    // Action: Fetch all categories from DummyJSON
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  /* ===== HANDLE CATEGORY SELECTION ===== */
  const handleCategoryClick = (category: string) => {
    // Action: Set selected category or clear if already selected
    if (selectedCategory === category) {
      onSelectCategory(null); // Deselect if same category clicked
    } else {
      onSelectCategory(category);
    }
  };

  /* ===== LOADING STATE ===== */
  if (loading) {
    return (
      <div className="space-y-2">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
      </div>
    );
  }

  /* ===== RENDER CATEGORY FILTER ===== */
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      {/* Header with mobile toggle */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Categories
        </h3>
        
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          aria-label="Toggle categories"
        >
          {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>
      </div>

      {/* Category List - Desktop always visible, Mobile collapsible */}
      <div className={`space-y-1 ${isOpen ? "block" : "hidden md:block"}`}>
        {/* All Products Option */}
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-3 py-2 rounded-lg transition-colors cursor-pointer ${
            selectedCategory === null
              ? "bg-primary text-white"
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          All Products
        </button>

        {/* Category List - Fixed with proper return */}
        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => handleCategoryClick(category.name)}
            className={`w-full text-left px-3 py-2 rounded-lg capitalize transition-colors cursor-pointer ${
              selectedCategory === category.name
                ? "bg-primary text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}