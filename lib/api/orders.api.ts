import { apiFetch } from "@/lib/fetcher";
import type {
  CheckoutSessionResponse,
  CreateCashOrderResponse,
  OrdersListResponse,
  ShippingAddress,
} from "@/types/orders";
import { getToken } from "@/lib/auth/token";

function authHeaders(extra: HeadersInit = {}) {
  const token = getToken();
  return {
    ...extra,
    ...(token ? { token } : {}),
  };
}

export function createCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress,
) {
  return apiFetch<CreateCashOrderResponse>(`/orders/${cartId}`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ shippingAddress }),
  });
}

export function createCheckoutSession(
  cartId: string,
  shippingAddress: ShippingAddress,
  url: string,
) {
  const qs = new URLSearchParams({ url });
  return apiFetch<CheckoutSessionResponse>(
    `/orders/checkout-session/${cartId}?${qs.toString()}`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ shippingAddress }),
    },
  );
}

export function getAllOrders() {
  return apiFetch<OrdersListResponse>(`/orders`, {
    headers: authHeaders(),
  });
}

export function getUserOrders(userId: string) {
  return apiFetch<OrdersListResponse>(`/orders/user/${userId}`, {
    headers: authHeaders(),
  });
}
