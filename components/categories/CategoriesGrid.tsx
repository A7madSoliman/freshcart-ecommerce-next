"use client";

import { useEffect, useMemo, useState } from "react";
import { getCategories } from "@/lib/api/categories.api";
import { ApiCategory } from "@/types/category";
import CategoryCard from "@/components/categories/CategoryCard";

export default function CategoriesGrid({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (id: string) => void;
}) {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, query]);

  return (
    <div>
      {/* Header + Search */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">
            Pick a category to view products
          </p>
        </div>

        <div className="w-full md:w-95">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-2 text-xs text-gray-500">
            Showing {filtered.length} of {categories.length}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((cat) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            active={value === cat._id}
            onClick={() => onChange(cat._id)}
          />
        ))}
      </div>
    </div>
  );
}
