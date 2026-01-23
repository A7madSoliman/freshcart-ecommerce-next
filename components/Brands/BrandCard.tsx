"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ApiBrand } from "@/types/brands";

export default function BrandCard({
  brand,
  index,
}: {
  brand: ApiBrand;
  index: number;
}) {
  return (
    <Link
      href={`/brands/${brand._id}`}
      className="group w-full rounded-2xl border border-gray-100 bg-white overflow-hidden transition hover:shadow-md"
      data-aos="fade-up"
      data-aos-duration="650"
      data-aos-delay={Math.min(index * 60, 360)}
      data-aos-once="true"
      suppressHydrationWarning
    >
      <div className="p-5 flex items-center gap-4">
        <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center">
          <img
            src={brand.image}
            alt={brand.name}
            className="h-full w-full object-contain p-2 transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {brand.name}
          </h3>
          <p className="mt-1 text-xs text-gray-500">View brand details</p>
        </div>

        <ArrowRight className="h-4 w-4 text-gray-400 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
      </div>
    </Link>
  );
}
