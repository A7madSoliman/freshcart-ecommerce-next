// components/Product/ProductCard.tsx
"use client";

import { useState } from "react";
import { ProductCardData } from "@/types/products";
import { formatEGP } from "@/lib/helper/formatCurrency";
import Link from "next/link";

interface Props {
  product: ProductCardData;
}

export default function ProductCard({ product }: Props) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Calculate discount percentage
  const discount =
    product.originalPrice && product.price
      ? Math.round(100 - (product.price / product.originalPrice) * 100)
      : 0;

  return (
    <div className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Discount Badge */}
      {discount > 0 && (
        <span className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discount}%
        </span>
      )}

      {/* Top Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        {/* Wishlist Button */}

        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`p-2 rounded-full bg-white/80 backdrop-blur shadow transition-all hover:scale-110 ${
            isWishlisted ? "text-red-500" : "text-gray-600 hover:text-red-500"
          }`}
          aria-label="Add to Wishlist"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* View Product Button */}
        <Link href={`/product-details/${product.id}`}>
          <button
            onClick={() => console.log("View product:", product.id)}
            className="p-2 rounded-full bg-white/80 backdrop-blur shadow text-gray-600 hover:text-blue-500 transition-all hover:scale-110"
            aria-label="View Product"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </Link>
      </div>

      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-lg font-semibold text-gray-900 truncate mb-1">
          {product.title}
        </h3>

        {/* Category */}
        <span className="inline-block text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded mb-3">
          {product.category}
        </span>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            {/* Discounted Price */}
            <span className="text-lg font-bold text-gray-900">
              {formatEGP(product.price || 0)}
            </span>

            {/* Original Price */}
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatEGP(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => console.log("Add to cart:", product.id)}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
