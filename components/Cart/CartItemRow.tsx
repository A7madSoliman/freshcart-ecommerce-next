"use client";

import type { ApiCartItem, ApiCartProduct } from "@/types/cart";
import { Minus, Plus, Trash2, ImageOff } from "lucide-react";

function isProductObject(p: ApiCartItem["product"]): p is ApiCartProduct {
  return typeof p === "object" && p !== null;
}

export default function CartItemRow({
  item,
  onInc,
  onDec,
  onRemove,
  busy,
}: {
  item: ApiCartItem;
  onInc: () => void;
  onDec: () => void;
  onRemove: () => void;
  busy?: boolean;
}) {
  const p = isProductObject(item.product) ? item.product : null;

  const title = p?.title ?? "Product";
  const image = p?.imageCover ?? "";
  const unitPrice = p?.price ?? null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 flex gap-4">
      {image ? (
        <img
          src={image}
          alt={title}
          className="h-20 w-20 rounded-2xl object-cover border border-gray-100"
        />
      ) : (
        <div className="h-20 w-20 rounded-2xl border border-gray-100 bg-gray-50 flex items-center justify-center">
          <ImageOff className="h-5 w-5 text-gray-400" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 truncate">{title}</h3>

        <p className="mt-1 text-sm text-gray-500">
          {unitPrice !== null ? `${unitPrice} LE` : `${item.price} LE`}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <button
              type="button"
              onClick={onDec}
              disabled={busy || item.count <= 1}
              className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>

            <div className="h-10 min-w-12 px-3 flex items-center justify-center text-sm font-semibold">
              {item.count}
            </div>

            <button
              type="button"
              onClick={onInc}
              disabled={busy}
              className="h-10 w-10 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={onRemove}
            disabled={busy}
            className="inline-flex items-center gap-2 rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4 text-red-600" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
