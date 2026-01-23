import Link from "next/link";
import { BadgeAlert } from "lucide-react";

export default function BrandNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4 px-4">
      <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
        <BadgeAlert className="h-7 w-7 text-gray-800" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        Brand Not Found
      </h1>

      <p className="text-gray-500 max-w-md">
        This brand may have been removed, or we couldn’t load its details right
        now.
      </p>

      <div className="mt-2 flex flex-col sm:flex-row gap-3">
        <Link
          href="/brands"
          className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
        >
          Back to Brands
        </Link>

        <Link
          href="/products"
          className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
