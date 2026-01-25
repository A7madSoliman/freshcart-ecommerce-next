"use client";

import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  useAddToWishlist,
  useRemoveFromWishlist,
  useWishlistQuery,
} from "@/lib/Hooks/useWishlist";

export default function WishlistToggleButton({
  productId,
}: {
  productId: string;
}) {
  const { isLoggedIn } = useAuth();

  const wishlist = useWishlistQuery();
  const add = useAddToWishlist();
  const remove = useRemoveFromWishlist();

  const ids = new Set((wishlist.data?.data ?? []).map((p) => p._id));
  const inWishlist = ids.has(productId);

  const adding = add.isPending && add.variables === productId;
  const removing = remove.isPending && remove.variables === productId;
  const busy = adding || removing;

  const handleClick = () => {
    if (!isLoggedIn) {
      toast.error("Please login first");
      return;
    }
    if (inWishlist) remove.mutate(productId);
    else add.mutate(productId);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={busy}
      className="h-10 w-10 rounded-full bg-white/90 backdrop-blur border border-gray-200 shadow-sm flex items-center justify-center transition hover:bg-white disabled:opacity-60"
      aria-label="Toggle wishlist"
    >
      {busy ? (
        <Loader2 className="h-5 w-5 animate-spin text-gray-700" />
      ) : (
        <Heart
          className={
            inWishlist
              ? "h-5 w-5 text-red-600 fill-red-600"
              : "h-5 w-5 text-gray-700"
          }
        />
      )}
    </button>
  );
}
