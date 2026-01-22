"use client";

import { useEffect, useMemo, useState } from "react";
import { getCategories, getCategoryById } from "@/lib/api/categories.api";
import { ApiCategory } from "@/types/category";
import CategoryProducts from "@/components/categories/CategoryProducts";

function CategoryCard({
  category,
  active,
  onClick,
  aosDelay = 0,
}: {
  category: ApiCategory;
  active: boolean;
  onClick: () => void;
  aosDelay?: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-aos="fade-up"
      data-aos-duration="650"
      data-aos-delay={aosDelay}
      data-aos-once="true"
      className={[
        "group w-full text-left rounded-2xl border bg-white overflow-hidden transition hover:shadow-md",
        active ? "border-blue-600" : "border-gray-100",
      ].join(" ")}
    >
      <div className="aspect-[4/3] bg-gray-50 overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900 line-clamp-1">
          {category.name}
        </h3>
        <p className="mt-1 text-xs text-gray-500">Browse products</p>
      </div>
    </button>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [category, setCategory] = useState<ApiCategory | null>(null);

  useEffect(() => {
    getCategories().then((res) => setCategories(res.data));
  }, []);

  useEffect(() => {
    if (!categoryId) return;
    getCategoryById(categoryId).then((res) => setCategory(res.data));
  }, [categoryId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, query]);

  return (
    <section className="max-w-6xl mx-auto py-8">
      {/* Header + Search */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div data-aos="fade-up" data-aos-duration="700" data-aos-once="true">
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">
            Pick a category to view products
          </p>
        </div>

        <div
          className="w-full md:w-95"
          data-aos="fade-left"
          data-aos-duration="700"
          data-aos-delay="150"
          data-aos-once="true"
        >
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

      {/* Categories Grid */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((cat, idx) => (
          <CategoryCard
            key={cat._id}
            category={cat}
            active={categoryId === cat._id}
            onClick={() => setCategoryId(cat._id)}
            aosDelay={Math.min(idx * 60, 360)}
          />
        ))}
      </div>

      {/* Selected Category + Products */}
      {categoryId ? (
        <div className="mt-10">
          {category && (
            <div
              className="mb-5 flex items-center gap-3"
              data-aos="fade-up"
              data-aos-duration="650"
              data-aos-once="true"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-10 w-10 rounded-xl object-cover"
              />
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {category.name}
                </h2>
                <p className="text-xs text-gray-500">
                  Products in this category
                </p>
              </div>
            </div>
          )}

          <div
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="150"
            data-aos-once="true"
          >
            <CategoryProducts categoryId={categoryId} />
          </div>
        </div>
      ) : (
        <p
          className="mt-8 text-sm text-gray-500"
          data-aos="fade-up"
          data-aos-duration="650"
          data-aos-delay="150"
          data-aos-once="true"
        >
          Select a category to see products.
        </p>
      )}
    </section>
  );
}
