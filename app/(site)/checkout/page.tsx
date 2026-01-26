import { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Enter shipping details and choose a payment method.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
