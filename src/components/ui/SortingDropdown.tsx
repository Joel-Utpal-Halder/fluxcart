// Role: Provides sorting options for products (price, rating)

"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export type SortOption = {
  label: string;
  value: string;
  sortFn: (a: any, b: any) => number;
};

interface SortingDropdownProps {
  onSort: (option: SortOption) => void;
  currentSort: SortOption;
}

/* ===== AVAILABLE SORT OPTIONS ===== */
export const sortOptions: SortOption[] = [
  {
    label: "Default",
    value: "default",
    sortFn: (a, b) => a.id - b.id,
  },
  {
    label: "Price: Low to High",
    value: "price_asc",
    sortFn: (a, b) => a.price - b.price,
  },
  {
    label: "Price: High to Low",
    value: "price_desc",
    sortFn: (a, b) => b.price - a.price,
  },
  {
    label: "Rating: Highest First",
    value: "rating_desc",
    sortFn: (a, b) => b.rating.rate - a.rating.rate,
  },
];

export function SortingDropdown({ onSort, currentSort }: SortingDropdownProps) {
  /* ===== STATE DECLARATIONS ===== */
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ===== CLOSE DROPDOWN WHEN CLICKING OUTSIDE ===== */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===== HANDLE SORT OPTION SELECTION ===== */
  const handleSelect = (option: SortOption) => {
    onSort(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Sort Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:border-primary transition-colors cursor-pointer"
      >
        <span>Sort by: {currentSort.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`w-full text-left px-4 py-2 transition-colors cursor-pointer ${
                currentSort.value === option.value
                  ? "bg-primary text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}