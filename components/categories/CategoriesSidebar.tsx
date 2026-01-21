"use client";

import { useEffect, useState } from "react";
import { ApiCategory } from "@/types/category";
import { getCategories } from "@/lib/api/categories.api";

interface Props {
  activeCategory?: string;
  onSelect: (id: string) => void;
}

export default function CategoriesSidebar({ activeCategory, onSelect }: Props) {
  const [categories, setCategories] = useState<ApiCategory[]>([]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  return (
    <aside className="space-y-2">
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => onSelect(cat._id)}
          className={`w-full text-left px-4 py-2 rounded transition
            ${
              activeCategory === cat._id
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
        >
          {cat.name}
        </button>
      ))}
    </aside>
  );
}
