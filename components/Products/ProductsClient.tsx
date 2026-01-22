"use client";

import { useMemo, useState } from "react";
import { ProductCardData } from "@/types/products";
import ProductCard from "./ProductCard";

export default function ProductsClient({
  products,
}: {
  products: ProductCardData[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;

    return products.filter((p) => {
      return (
        (p.title ?? "").toLowerCase().includes(q) ||
        (p.category ?? "").toLowerCase().includes(q)
      );
    });
  }, [products, query]);

  return (
    <section className="max-w-6xl mx-auto mt-4 py-8 px-4">
      {/* Search */}
      <div className="flex flex-col items-center mb-10">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white px-5 py-3 text-center outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-3 text-sm text-gray-500 text-center">
          Showing <span className="font-medium">{filtered.length}</span> of{" "}
          <span className="font-medium">{products.length}</span>
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((p, idx) => (
          <div
            key={p.id}
            data-aos="fade-up"
            data-aos-duration="650"
            data-aos-delay={Math.min(idx * 60, 360)} // max delay 360ms
            data-aos-once="true"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </section>
  );
}
