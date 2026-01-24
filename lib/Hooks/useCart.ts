import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  clearCart,
  getCart,
  removeCartItem,
  updateCartQty,
} from "../api/cart.api";

const cartKey = ["cart"] as const;

export function useCartQuery() {
  return useQuery({
    queryKey: cartKey,
    queryFn: getCart,
  });
}

export function useUpdateQty() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: { prodctId: string; count: number }) =>
      updateCartQty(vars.prodctId, vars.count),
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
