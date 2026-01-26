import { Metadata } from "next";
import WishlistClient from "./WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Save your favorite items and shop later.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
