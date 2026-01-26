import { Metadata } from "next";
import OrdersClient from "./OrdersClient";

export const metadata: Metadata = {
  title: "Orders",
  description: "Track your orders and view purchase history.",
};

export default function OrdersPage() {
  return <OrdersClient />;
}
