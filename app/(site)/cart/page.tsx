"use client";

import loading from "@/app/loading";
import CartItemRow from "@/components/Cart/CartItemRow";
import CartSummary from "@/components/Cart/CartSummary";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  useCartQuery,
  useClearCart,
  useRemoveItem,
  useUpdateQty,
} from "@/lib/Hooks/useCart";
import { ShoppingCart } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart, update quantities, and proceed to checkout.",
};

export default function CartPage() {
  const { isLoggedIn } = useAuth();

  const { removeItem, removingId } = useRemoveItem();
  const cartQuery = useCartQuery();
  const updateQty = useUpdateQty();
  const clear = useClearCart();

  if (!isLoggedIn) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <ShoppingCart className="h-7 w-7 text-gray-800" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Please login to view your cart
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Your cart is linked to your account.
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

  const { data, isLoading, isError } = cartQuery;

  if (isLoading) return loading();

  if (isError || !data?.data) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Cart unavailable</h1>
          <p className="mt-2 text-sm text-gray-500">Please try again later.</p>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  const cart = data.data;
  const items = cart.products ?? [];
  const total = cart.totalCartPrice ?? 0;

  if (items.length === 0) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <ShoppingCart className="h-7 w-7 text-gray-800" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Add products to your cart to see them here.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  const busy = updateQty.isPending || removeItem.isPending || clear.isPending;

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
          <p className="text-sm text-gray-500">
            Review items, adjust quantities, then checkout.
          </p>
        </div>
        <p className="text-sm text-gray-600">
          Items: <span className="font-semibold">{data.numOfCartItems}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item, idx) => {
            const productId =
              typeof item.product === "string"
                ? item.product
                : item.product?._id;
            const rowKey = item._id ?? productId ?? String(idx);
            const canEdit = !!productId;
            return (
              <CartItemRow
                key={rowKey}
                item={item}
                busy={busy}
                removing={removingId === productId}
                onInc={() => {
                  if (!canEdit) return;
                  updateQty.mutate({ productId, count: item.count + 1 });
                }}
                onDec={() => {
                  if (!canEdit) return;
                  updateQty.mutate({
                    productId,
                    count: Math.max(1, item.count - 1),
                  });
                }}
                onRemove={() => {
                  if (!canEdit) return;
                  removeItem.mutate(productId);
                }}
              />
            );
          })}
        </div>

        {/* Right */}
        <div className="lg:col-span-4">
          <CartSummary
            total={total}
            itemsCount={data.numOfCartItems}
            clearing={clear.isPending}
            onClear={() => clear.mutate()}
          />
        </div>
      </div>
    </section>
  );
}
