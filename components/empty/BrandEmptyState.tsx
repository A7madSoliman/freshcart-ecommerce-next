import Link from "next/link";
import { BadgeAlert } from "lucide-react";

export default function BrandEmptyState({
  title = "No products available",
  description = "This brand doesn’t have products available right now (API data is incomplete).",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-8 flex flex-col items-center justify-center text-center gap-4">
      <div className="h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
        <BadgeAlert className="h-7 w-7 text-gray-800" />
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-md">{description}</p>
      </div>

      <div className="mt-2 flex flex-col sm:flex-row gap-3">
        <Link
          href="/brands"
          className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition"
        >
          Back to Brands
        </Link>

        <Link
          href="/all-products"
          className="rounded-xl bg-blue-950 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-900 transition"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}
