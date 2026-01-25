"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  clearCart,
  getCart,
  removeCartItem,
  updateCartQty,
} from "../api/cart.api";
import { getToken } from "@/lib/auth/token";
import { useState } from "react";

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
  const [removingId, setRemovingId] = useState<string | null>(null);
  const qc = useQueryClient();

  const mutation = useMutation({
    mutationFn: (productId: string) => {
      setRemovingId(productId);
      return removeCartItem(productId);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: cartKey }),
    onSettled: () => setRemovingId(null),
  });
  return { removeItem: mutation, removingId };
}

export function useClearCart() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => qc.invalidateQueries({ queryKey: cartKey }),
  });
}
