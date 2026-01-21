"use client";

import { ApiCategory } from "@/types/category";

export default function CategoryCard({
  category,
  active,
  onClick,
}: {
  category: ApiCategory;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "group w-full text-left rounded-2xl border bg-white overflow-hidden transition hover:shadow-md",
        active ? "border-blue-600" : "border-gray-100",
      ].join(" ")}
    >
      <div className="relative">
        <div className="aspect-4/3 bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={category.image}
            alt={category.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>

        {active && (
          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white">
            Selected
          </span>
        )}
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
