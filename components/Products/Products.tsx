"use client";

import { useEffect, useRef, useState } from "react";
import {
  ApiProduct,
  ProductCardData,
  ProductsResponse,
} from "@/types/products";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api/products.api";

export default function Products() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prevent double fetch in React Strict Mode (dev only)
  const didFetch = useRef(false);

  const fetchProducts = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      setError(null);

      const currentPage = page;

      const response: ProductsResponse = await getProducts({
        page: currentPage,
        limit: 15,
      });

      const newProducts: ProductCardData[] = response.data.map(
        (product: ApiProduct) => ({
          id: product._id,
          title: product.title,
          image: product.imageCover,
          category: product.category.name,
          price: product.priceAfterDiscount || product.price,
          originalPrice: product.priceAfterDiscount ? product.price : undefined,
          rating: product.ratingsAverage,
          reviews: Math.floor(Math.random() * 200) + 1, // mock
        }),
      );

      // ✅ Merge with deduplication by id
      setProducts((prev) => {
        const merged = [...prev, ...newProducts];
        return Array.from(new Map(merged.map((p) => [p.id, p])).values());
      });

      if (newProducts.length < 15) {
        setHasMore(false);
      }

      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch first page once
  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="col-span-full text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Product List */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* Load More Button */}
      {hasMore && (
        <div className="col-span-full flex justify-center mt-8">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="px-8 py-3 bg-linear-to-r from-gray-800 to-gray-900 text-white font-semibold rounded-full hover:from-gray-900 hover:to-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Loading...
              </span>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}

      {/* No More Products */}
      {!hasMore && products.length > 0 && (
        <div className="col-span-full text-center py-4 text-gray-500">
          No more products
        </div>
      )}
    </>
  );
}
