"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ProductCardData } from "@/types/products";
import { formatEGP } from "@/lib/helper/formatCurrency";
import { Heart, Eye, Star, Loader2, Check } from "lucide-react";
import { toast } from "sonner";
import { useAddToCart } from "@/lib/Hooks/useCart";
import { useAuth } from "@/lib/auth/AuthContext";

interface Props {
  product: ProductCardData;
}

export default function ProductCard({ product }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { isLoggedIn } = useAuth();

  const addMutation = useAddToCart();

  const discount = useMemo(() => {
    if (!product.originalPrice || !product.price) return 0;
    return Math.round(100 - (product.price / product.originalPrice) * 100);
  }, [product.originalPrice, product.price]);

  const productId = (product as any)._id ?? product.id;

  const handleAdd = () => {
    if (!isLoggedIn) {
      toast.error("Please login first to add items to cart");
      return;
    }

    addMutation.mutate(productId, {
      onSuccess: () => {
        toast.success("Added to cart");
      },
      onError: (err: any) => {
        toast.error(err?.message || "Failed to add to cart");
      },
    });
  };

  const isAdding = addMutation.isPending;

  return (
    <div className="group rounded-2xl bg-white border border-gray-100 overflow-hidden transition hover:shadow-md">
      {/* Image */}
      <div className="relative">
        <Link href={`/product-details/${productId}`} className="block">
          <div className="aspect-4/5 bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Discount badge */}
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2.5 py-1 text-xs font-semibold text-white">
            -{discount}%
          </span>
        )}

        {/* Hover actions */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-y-1 transition group-hover:opacity-100 group-hover:translate-y-0">
          {/* Wishlist */}
          <button
            type="button"
            onClick={() => setIsWishlisted((v) => !v)}
            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-sm flex items-center justify-center transition hover:bg-white"
            aria-label="Add to wishlist"
          >
            <Heart
              size={18}
              className={
                isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
              }
            />
          </button>

          {/* View */}
          <Link
            href={`/product-details/${productId}`}
            className="h-10 w-10 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-sm flex items-center justify-center transition hover:bg-white"
            aria-label="View product"
          >
            <Eye size={18} className="text-gray-700" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category + Rating */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs text-gray-500 truncate">
            {product.category}
          </span>

          <div className="flex items-center gap-1 text-xs text-gray-600">
            <Star size={14} className="text-yellow-500 fill-yellow-500" />
            <span className="font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/product-details/${productId}`} className="block mt-2">
          <h3 className="text-sm font-semibold text-gray-900 leading-5 line-clamp-2 hover:underline">
            {product.title}
          </h3>
        </Link>

        {/* Price + Add */}
        <div className="mt-3 flex items-end justify-between gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-gray-900">
              {formatEGP(product.price || 0)}
            </span>

            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatEGP(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={isAdding}
            className={[
              "rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-800 transition",
              "hover:bg-gray-50 active:scale-[0.98]",
              "disabled:opacity-60 disabled:cursor-not-allowed",
            ].join(" ")}
          >
            {isAdding ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding
              </span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <Check className="h-4 w-4" />
                Add
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
