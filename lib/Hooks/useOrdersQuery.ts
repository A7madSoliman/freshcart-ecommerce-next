import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "@/lib/api/orders.api";
import { getUserIdFromToken } from "@/lib/auth/jwt";

const ordersKey = ["orders"] as const;

export function useUserOrders() {
  const userId = getUserIdFromToken();

  return useQuery({
    queryKey: ordersKey,
    queryFn: () => getUserOrders(userId!),
    enabled: !!userId,
    staleTime: 30_000,
    retry: 0,
  });
}
