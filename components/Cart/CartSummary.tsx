"use client";

import Link from "next/link";
import { Loader2, ShoppingBag } from "lucide-react";

export default function CartSummary({
  total,
  itemsCount,
  onClear,
  clearing,
}: {
  total: number;
  itemsCount: number;
  onClear: () => void;
  clearing?: boolean;
}) {
  return (
    <aside className="rounded-2xl border border-gray-100 bg-white p-6 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

      <div className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between text-gray-600">
          <span>Items</span>
          <span className="font-semibold text-gray-900">{itemsCount}</span>
        </div>

        <div className="flex items-center justify-between text-gray-600">
          <span>Total</span>
          <span className="font-bold text-gray-900">{total} LE</span>
        </div>

        <p className="pt-2 text-xs text-gray-500">
          Taxes and shipping are calculated at checkout.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          href="/checkout"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
        >
          <ShoppingBag className="h-4 w-4" />
          Proceed to Checkout
        </Link>

        <button
          type="button"
          onClick={onClear}
          disabled={clearing}
          className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 disabled:opacity-60"
        >
          <span className="inline-flex w-full items-center justify-center gap-2">
            {clearing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Clearing...
              </>
            ) : (
              "Clear Cart"
            )}
          </span>
        </button>
      </div>
    </aside>
  );
}
