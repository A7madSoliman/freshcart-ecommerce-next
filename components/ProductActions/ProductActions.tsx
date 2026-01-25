"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { useAddToCart } from "@/lib/Hooks/useCart";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function ProductActions({ productId }: { productId: string }) {
  const { isLoggedIn } = useAuth();
  const addMutation = useAddToCart();

  const handleAdd = () => {
    if (!isLoggedIn) {
      toast.error("Please login first to add items");
      return;
    }

    addMutation.mutate(productId, {
      onSuccess: () => toast.success("Added to cart"),
      onError: (e: any) => toast.error(e?.message || "Failed to add to cart"),
    });
  };

  const adding = addMutation.isPending;

  return (
    <div className="flex items-center gap-4 mt-4">
      <button
        onClick={handleAdd}
        disabled={adding}
        className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-900 transition disabled:opacity-70"
      >
        {adding ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
        {adding ? "Adding..." : "Add to cart"}
      </button>
    </div>
  );
}
