"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="h-9 w-9 flex items-center justify-center border border-blueprint-charcoal/15 rounded-sm text-blueprint-charcoal disabled:opacity-30 hover:bg-blueprint-charcoal/5 transition-colors"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`h-9 w-9 flex items-center justify-center rounded-sm text-sm font-mono transition-colors ${
            p === currentPage
              ? "bg-blueprint-ink text-blueprint-paper"
              : "border border-blueprint-charcoal/15 text-blueprint-charcoal hover:bg-blueprint-charcoal/5"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="h-9 w-9 flex items-center justify-center border border-blueprint-charcoal/15 rounded-sm text-blueprint-charcoal disabled:opacity-30 hover:bg-blueprint-charcoal/5 transition-colors"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}