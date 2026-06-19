"use client";

import { Filter, Search } from "lucide-react";

type ProductFiltersProps = {
  categories: string[];
  query: string;
  selectedCategory: string;
  onQueryChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
};

export function ProductFilters({
  categories,
  query,
  selectedCategory,
  onQueryChange,
  onCategoryChange
}: ProductFiltersProps) {
  return (
    <div className="glass grid gap-4 rounded-[2rem] p-4 md:grid-cols-[1fr_auto] md:items-center">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search products"
          className="w-full rounded-full border border-slate-200 bg-white/80 py-4 pl-12 pr-4 text-sm font-semibold outline-none transition focus:border-dogify-cyan"
        />
      </label>
      <div className="flex flex-wrap items-center gap-2">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-dogify-blue">
          <Filter className="h-4 w-4" />
        </span>
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            className={`min-h-10 rounded-full px-4 text-sm font-black transition ${
              selectedCategory === category
                ? "bg-dogify-blue text-white shadow-lg shadow-blue-900/15"
                : "bg-white/75 text-slate-600 hover:text-dogify-blue"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
