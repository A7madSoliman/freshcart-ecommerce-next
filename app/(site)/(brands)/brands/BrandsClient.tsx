"use client";

import { useEffect, useMemo, useState } from "react";
import { getBrands } from "@/lib/api/brands.api";
import { ApiBrand } from "@/types/brands";
import BrandCard from "@/components/Brands/BrandCard";

export default function BrandsClient() {
  const [brands, setBrands] = useState<ApiBrand[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getBrands({ limit: 100 }).then((res) => setBrands(res.data));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return brands;
    return brands.filter((b) => b.name.toLowerCase().includes(q));
  }, [brands, query]);

  return (
    <section className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div
          className="text-left"
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-once="true"
          suppressHydrationWarning
        >
          <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
          <p className="text-sm text-gray-500">
            Discover brands for fashion and tech
          </p>
        </div>

        <div
          className="w-full md:w-95"
          data-aos="fade-left"
          data-aos-duration="700"
          data-aos-delay="150"
          data-aos-once="true"
          suppressHydrationWarning
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brands..."
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="mt-2 text-xs text-gray-500">
            Showing {filtered.length} of {brands.length}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filtered.map((b, idx) => (
          <BrandCard key={b._id} brand={b} index={idx} />
        ))}
      </div>
    </section>
  );
}
