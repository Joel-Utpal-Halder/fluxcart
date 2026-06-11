// Role: Provides pagination controls for product listing

"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  /* ===== GENERATE PAGE NUMBERS TO DISPLAY ===== */
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Show max 5 page numbers
    
    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pages.push("...");
      }
      
      // Add pages in range
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pages.push("...");
      }
      
      // Always show last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  /* ===== DON'T RENDER IF ONLY ONE PAGE ===== */
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors cursor-pointer ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          className={`w-10 h-10 rounded-lg transition-colors cursor-pointer ${
            currentPage === page
              ? "bg-primary text-white"
              : "border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          } ${typeof page !== "number" ? "cursor-default" : ""}`}
          disabled={typeof page !== "number"}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg border border-gray-300 dark:border-gray-600 transition-colors cursor-pointer ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}