import { useMutation } from "@tanstack/react-query";
import { createCashOrder, createCheckoutSession } from "@/lib/api/orders.api";
import type { ShippingAddress } from "@/types/orders";

export function useCreateCashOrder() {
  return useMutation({
    mutationFn: (vars: { cartId: string; shippingAddress: ShippingAddress }) =>
      createCashOrder(vars.cartId, vars.shippingAddress),
  });
}

export function useCreateCheckoutSession() {
  return useMutation({
    mutationFn: (vars: {
      cartId: string;
      shippingAddress: ShippingAddress;
      url: string;
    }) => createCheckoutSession(vars.cartId, vars.shippingAddress, vars.url),
  });
}
