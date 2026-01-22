"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ApiProduct,
  ProductCardData,
  ProductsResponse,
} from "@/types/products";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/api/products.api";

interface ProductsProps {
  categoryId?: string;
  keyword?: string;
}

const PAGE_SIZE = 16;

export default function Products({ categoryId, keyword }: ProductsProps) {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapToCard = (product: ApiProduct): ProductCardData => ({
    id: product._id,
    title: product.title,
    image: product.imageCover,
    category: product.category?.name ?? "",
    price: product.priceAfterDiscount || product.price,
    originalPrice: product.priceAfterDiscount ? product.price : undefined,
    rating: product.ratingsAverage,
    reviews: Math.floor(Math.random() * 200) + 1, // mock
  });

  const fetchPage = async (targetPage: number, mode: "replace" | "append") => {
    if (loading) return;

    try {
      setLoading(true);
      setError(null);

      const response: ProductsResponse = await getProducts({
        page: targetPage,
        limit: PAGE_SIZE,
        categoryId,
        keyword,
      });

      const newProducts = response.data.map(mapToCard);

      setProducts((prev) => {
        const base = mode === "replace" ? [] : prev;
        const merged = [...base, ...newProducts];
        return Array.from(new Map(merged.map((p) => [p.id, p])).values());
      });

      setHasMore(newProducts.length === PAGE_SIZE);
      setPage(targetPage + 1);
    } catch (err) {
      console.error(err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
    fetchPage(1, "replace");
  }, [categoryId, keyword]);

  const canLoadMore = useMemo(
    () => hasMore && !loading && !error,
    [hasMore, loading, error],
  );

  if (error) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => fetchPage(1, "replace")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p, idx) => (
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

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => fetchPage(page, "append")}
            disabled={!canLoadMore}
            className="px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}

      {!hasMore && products.length > 0 && (
        <div className="text-center py-6 text-gray-500">No more products</div>
      )}
    </div>
  );
}
