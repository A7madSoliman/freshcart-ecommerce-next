import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartQty,
} from "../api/cart.api";
import { getToken } from "@/lib/auth/token";

const cartKey = ["cart"] as const;

export function useCartQuery() {
  const token = getToken();

  return useQuery({
    queryKey: cartKey,
    queryFn: getCart,
    enabled: !!token,
    staleTime: 30_000,
    retry: 0,
  });
}

export function useAddToCart() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => addToCart(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: cartKey }),
  });
}

export function useUpdateQty() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (vars: { productId: string; count: number }) =>
      updateCartQty(vars.productId, vars.count),
    onSuccess: () => qc.invalidateQueries({ queryKey: cartKey }),
  });
}

export function useRemoveItem() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => removeCartItem(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: cartKey }),
  });
}

export function useClearCart() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => qc.invalidateQueries({ queryKey: cartKey }),
  });
}
