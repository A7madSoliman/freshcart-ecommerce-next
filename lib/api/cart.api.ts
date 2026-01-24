import { CartResponse } from "@/types/cart";
import { getToken } from "../auth/token";
import { apiFetch } from "../fetcher";

function authHeaders(extra: HeadersInit = {}) {
  const token = getToken();
  return {
    ...extra,
    ...(token ? { token } : {}),
  };
}

export const getCart = () =>
  apiFetch<CartResponse>("/cart", {
    headers: authHeaders(),
    cache: "no-store",
  });

export const addToCart = (productId: string) =>
  apiFetch<CartResponse>("/cart", {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ productId }),
  });

export const updateCartQty = (productId: string, count: number) =>
  apiFetch<CartResponse>(`/cart/${productId}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ count }),
  });

export const removeCartItem = (produdctId: string) =>
  apiFetch<CartResponse>(`/cart/${produdctId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });

export const clearCart = () =>
  apiFetch<CartResponse>("/cart", {
    method: "DELETE",
    headers: authHeaders(),
  });
