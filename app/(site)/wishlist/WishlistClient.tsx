"use client";

import Link from "next/link";
import { Loader2, HeartOff, Heart } from "lucide-react";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  useWishlistQuery,
  useRemoveFromWishlist,
} from "@/lib/Hooks/useWishlist";
import WishlistItemCard from "@/components/Wishlist/WishlistItemCard";

export default function WishlistClient() {
  const { isLoggedIn } = useAuth();

  const wishlistQuery = useWishlistQuery();
  const removeMutation = useRemoveFromWishlist();

  if (!isLoggedIn) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <Heart className="h-7 w-7 text-gray-800" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Please login to view your wishlist
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Your wishlist is linked to your account.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </section>
    );
  }

  const { data, isLoading, isError } = wishlistQuery;

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 flex items-center gap-3 text-gray-700">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading wishlist...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Wishlist unavailable
          </h1>
          <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
          <Link
            href="/products"
            className="mt-5 inline-flex rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  const products = data?.data ?? [];

  if (products.length === 0) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <HeartOff className="h-7 w-7 text-gray-800" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Your wishlist is empty
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Add products you love and they’ll show up here.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-flex rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Wishlist</h1>
        <p className="text-sm text-gray-500">Your saved items.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((p) => {
          const removing =
            removeMutation.isPending && removeMutation.variables === p._id;

          return (
            <WishlistItemCard
              key={p._id}
              product={p}
              removing={removing}
              onRemove={() => removeMutation.mutate(p._id)}
            />
          );
        })}
      </div>
    </section>
  );
}
