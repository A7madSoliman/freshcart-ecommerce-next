// app/(orders)/checkout/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, CreditCard, Banknote } from "lucide-react";

import { useAuth } from "@/lib/auth/AuthContext";
import { useCartQuery, useClearCart } from "@/lib/Hooks/useCart";
import {
  useCreateCashOrder,
  useCreateCheckoutSession,
} from "@/lib/Hooks/useOrders";
import type { ShippingAddress } from "@/types/orders";

export default function CheckoutPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const cartQuery = useCartQuery();
  const clearCart = useClearCart();

  const cashOrder = useCreateCashOrder();
  const onlineSession = useCreateCheckoutSession();

  const [shipping, setShipping] = useState<ShippingAddress>({
    details: "",
    phone: "",
    city: "",
  });

  const { data, isLoading, isError } = cartQuery;

  const cart = data?.data;
  const cartId = cart?._id;
  const items = cart?.products ?? [];
  const total = cart?.totalCartPrice ?? 0;

  const busy =
    cashOrder.isPending || onlineSession.isPending || clearCart.isPending;

  const canSubmit = useMemo(() => {
    return (
      !!cartId &&
      items.length > 0 &&
      shipping.details.trim().length >= 3 &&
      shipping.city.trim().length >= 2 &&
      shipping.phone.trim().length >= 8
    );
  }, [cartId, items.length, shipping.details, shipping.city, shipping.phone]);

  if (!isLoggedIn) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Please login to checkout
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            You need an account to place orders.
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

  if (isLoading) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <div className="flex items-center gap-3 text-gray-700">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading checkout...
          </div>
        </div>
      </section>
    );
  }

  if (isError || !cart) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Checkout unavailable
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

  if (items.length === 0) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Add items first, then come back to checkout.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex rounded-2xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  async function handleCashOrder() {
    if (!canSubmit || !cartId) return;

    try {
      await cashOrder.mutateAsync({
        cartId,
        shippingAddress: shipping,
      });

      toast.success("Order placed successfully (Cash).");
      await clearCart.mutateAsync();
      router.push("/orders");
    } catch (e: any) {
      toast.error(e?.message || "Failed to place order.");
    }
  }

  async function handleOnlinePayment() {
    if (!canSubmit || !cartId) return;

    try {
      const siteUrl =
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000";

      const res = await onlineSession.mutateAsync({
        cartId,
        shippingAddress: shipping,
        url: siteUrl,
      });

      const redirectUrl = res?.session?.url;

      if (!redirectUrl) {
        console.log("checkout-session response:", res);
        toast.error("No checkout URL returned. Check console.");
        return;
      }

      window.location.href = redirectUrl;
    } catch (e: any) {
      toast.error(e?.message || "Failed to start online payment.");
    }
  }

  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
        <p className="text-sm text-gray-500">
          Enter shipping info, then choose payment method.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left */}
        <div className="lg:col-span-8 space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">
              Shipping Address
            </h2>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Address details
                </label>
                <input
                  value={shipping.details}
                  onChange={(e) =>
                    setShipping((s) => ({ ...s, details: e.target.value }))
                  }
                  placeholder="Street, building, apartment..."
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  City
                </label>
                <input
                  value={shipping.city}
                  onChange={(e) =>
                    setShipping((s) => ({ ...s, city: e.target.value }))
                  }
                  placeholder="Cairo"
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700">
                  Phone
                </label>
                <input
                  value={shipping.phone}
                  onChange={(e) =>
                    setShipping((s) => ({ ...s, phone: e.target.value }))
                  }
                  placeholder="010..."
                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {!canSubmit && (
                <p className="md:col-span-2 text-xs text-gray-500">
                  Fill address details, city, and phone to enable checkout.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-lg font-bold text-gray-900">Payment</h2>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleCashOrder}
                disabled={!canSubmit || busy}
                className="rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left hover:bg-gray-50 transition disabled:opacity-60"
              >
                <div className="flex items-center gap-3">
                  {cashOrder.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin text-gray-700" />
                  ) : (
                    <Banknote className="h-5 w-5 text-gray-800" />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-gray-500">
                      Place order and pay when delivered.
                    </p>
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={handleOnlinePayment}
                disabled={!canSubmit || busy}
                className="rounded-2xl bg-blue-600 px-4 py-4 text-left hover:bg-blue-700 transition text-white disabled:opacity-60"
              >
                <div className="flex items-center gap-3">
                  {onlineSession.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin text-white" />
                  ) : (
                    <CreditCard className="h-5 w-5 text-white" />
                  )}
                  <div>
                    <p className="font-semibold">Pay Online</p>
                    <p className="text-xs text-white/80">
                      Redirect to secure checkout session.
                    </p>
                  </div>
                </div>
              </button>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Online payment uses checkout-session endpoint with url query
              param.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 sticky top-28">
            <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Items</span>
                <span className="font-semibold text-gray-900">
                  {items.length}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Total</span>
                <span className="font-bold text-gray-900">{total} LE</span>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => clearCart.mutate()}
                  disabled={busy}
                  className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition disabled:opacity-60"
                >
                  {clearCart.isPending ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Clearing...
                    </span>
                  ) : (
                    "Clear Cart"
                  )}
                </button>

                <Link
                  href="/cart"
                  className="mt-3 block text-center text-sm font-semibold text-blue-600 hover:underline"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
