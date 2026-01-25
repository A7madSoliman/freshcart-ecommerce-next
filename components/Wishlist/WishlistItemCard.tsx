"use client";

import Link from "next/link";
import { Heart, Loader2, Star } from "lucide-react";
import type { WishlistProduct } from "@/types/wishlist";
import { formatEGP } from "@/lib/helper/formatCurrency";

export default function WishlistItemCard({
  product,
  onRemove,
  removing,
}: {
  product: WishlistProduct;
  onRemove: () => void;
  removing?: boolean;
}) {
  const category =
    typeof product.category === "string"
      ? product.category
      : (product.category?.name ?? "Category");

  return (
    <div className="group rounded-2xl bg-white border border-gray-100 overflow-hidden transition hover:shadow-md">
      <Link href={`/product-details/${product._id}`} className="block">
        <div className="aspect-4/5 bg-gray-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageCover ?? "/placeholder.png"}
            alt={product.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-gray-500 truncate">{category}</span>

          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{product.ratingsAverage ?? 0}</span>
          </div>
        </div>

        <Link href={`/product-details/${product._id}`} className="block mt-2">
          <h3 className="text-sm font-semibold line-clamp-1 text-gray-900 leading-5 hover:underline">
            {product.title}
          </h3>
        </Link>

        <div className="mt-3 flex items-end justify-between gap-3">
          <span className="text-base font-bold text-gray-900">
            {formatEGP(product.price ?? 0)}
          </span>

          <button
            type="button"
            onClick={onRemove}
            disabled={removing}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 transition hover:bg-gray-50 disabled:opacity-60"
          >
            {removing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Heart className="h-4 w-4 text-red-600 fill-red-600" />
                Remove
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
