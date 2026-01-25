import { WishlistMutationResponse, WishlistResponse } from "@/types/wishlist";
import { getToken } from "../auth/token";
import { apiFetch } from "../fetcher";

function authHeaders(extra: HeadersInit = {}) {
  const token = getToken();
  return {
    ...extra,
    ...(token ? { token } : {}),
  };
}

export function getWishlist() {
  return apiFetch<WishlistResponse>("/wishlist", {
    headers: authHeaders(),
    cache: "no-cache",
  });
}

export function addToWishlist(productId: string) {
  return apiFetch<WishlistMutationResponse>("/wishlist", {
    headers: authHeaders(),
    method: "POST",
    body: JSON.stringify({ productId }),
  });
}

export function removeFromWishlist(productId: string) {
  return apiFetch<WishlistMutationResponse>(`/wishlist/${productId}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}
