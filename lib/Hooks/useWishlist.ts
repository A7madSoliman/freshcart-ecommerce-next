import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../api/wishlist.api";
import { getToken } from "../auth/token";

const wishlistKey = ["wishlist"] as const;

export function useWishlistQuery() {
  const token = getToken();
  return useQuery({
    queryKey: wishlistKey,
    queryFn: getWishlist,
    enabled: !!token,
  });
}

export function useAddToWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => addToWishlist(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: wishlistKey }),
  });
}

export function useRemoveFromWishlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) => removeFromWishlist(productId),
    onSuccess: () => qc.invalidateQueries({ queryKey: wishlistKey }),
  });
}
