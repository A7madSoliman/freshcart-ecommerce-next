"use client";

import Link from "next/link";
import { Loader2, PackageSearch } from "lucide-react";
import { useUserOrders } from "@/lib/Hooks/useOrdersQuery";
import type { ApiOrder, OrderCartItem, OrderProduct } from "@/types/orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
  description: "Track your orders and view purchase history.",
};

function isProductObject(p: OrderCartItem["product"]): p is OrderProduct {
  return typeof p === "object" && p !== null;
}
export default function OrdersPage() {
  const { data, isLoading, isError } = useUserOrders();

  const orders: ApiOrder[] = Array.isArray(data) ? data : (data?.data ?? []);

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 flex items-center gap-3 text-gray-700">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading orders...
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Orders unavailable
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

  if (orders.length === 0) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
            <PackageSearch className="h-7 w-7 text-gray-800" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900">
            No orders yet
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Once you place an order, it will show up here.
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
        <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
        <p className="text-sm text-gray-500">
          Track what you’ve purchased and order status.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => {
          const cartItems: OrderCartItem[] = order.cartItems ?? [];

          return (
            <div
              key={order._id}
              className="rounded-2xl border border-gray-100 bg-white p-6"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-semibold text-gray-900 break-all">
                    {order._id}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-gray-50 border border-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                    {order.paymentMethodType ?? "payment"}
                  </span>

                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs font-semibold border",
                      order.isPaid
                        ? "bg-green-50 border-green-100 text-green-700"
                        : "bg-yellow-50 border-yellow-100 text-yellow-700",
                    ].join(" ")}
                  >
                    {order.isPaid ? "Paid" : "Not paid"}
                  </span>

                  <span
                    className={[
                      "rounded-full px-3 py-1 text-xs font-semibold border",
                      order.isDelivered
                        ? "bg-blue-50 border-blue-100 text-blue-700"
                        : "bg-gray-50 border-gray-100 text-gray-700",
                    ].join(" ")}
                  >
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>
              </div>

              {/* Summary cards */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">Items</p>
                  <p className="text-lg font-bold text-gray-900">
                    {cartItems.length}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">Total</p>
                  <p className="text-lg font-bold text-gray-900">
                    {order.totalOrderPrice ?? 0} LE
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4">
                  <p className="text-xs text-gray-500">Created</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>

              {/* Items preview */}
              {cartItems.length > 0 && (
                <div className="mt-5">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    Items
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cartItems.slice(0, 4).map((ci, idx) => {
                      const p = isProductObject(ci.product) ? ci.product : null;

                      return (
                        <div
                          key={ci._id ?? p?._id ?? `item-${order._id}-${idx}`}
                          className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p?.imageCover ?? "/placeholder.png"}
                            alt={p?.title ?? "Product"}
                            className="h-12 w-12 rounded-xl object-cover border border-gray-100"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {p?.title ?? "Product"}
                            </p>
                            <p className="text-xs text-gray-500">
                              Qty: {ci.count} • {ci.price} LE
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {cartItems.length > 4 && (
                    <p className="mt-2 text-xs text-gray-500">
                      +{cartItems.length - 4} more items
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
