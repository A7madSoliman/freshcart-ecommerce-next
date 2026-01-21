"use client";

import { useEffect, useState } from "react";
import CategoriesSidebar from "@/components/categories/CategoriesSidebar";
import CategoryHeader from "@/components/categories/CategoryHeader";
import CategoryProducts from "@/components/categories/CategoryProducts";
import { getCategoryById } from "@/lib/api/categories.api";
import { ApiCategory } from "@/types/category";

export default function CategoriesPage() {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [category, setCategory] = useState<ApiCategory | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    getCategoryById(categoryId).then((res) => {
      setCategory(res.data);
    });
  }, [categoryId]);

  return (
    <section className="pt-28 container mx-auto grid grid-cols-12 gap-8 py-10">
      {/* Sidebar */}
      <div className="col-span-12 md:col-span-3">
        <CategoriesSidebar
          activeCategory={categoryId ?? undefined}
          onSelect={setCategoryId}
        />
      </div>

      {/* Content */}
      <div className="col-span-12 md:col-span-9">
        {category ? (
          <>
            <CategoryHeader category={category} />
            <CategoryProducts categoryId={category._id} />
          </>
        ) : (
          <p className="text-gray-500">Please select a category</p>
        )}
      </div>
    </section>
  );
}
