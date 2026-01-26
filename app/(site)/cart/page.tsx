import { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your cart, update quantities, and proceed to checkout.",
};

export default function CartPage() {
  return <CartClient />;
}
