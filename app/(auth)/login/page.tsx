import { Metadata } from "next";
import LoginClient from "./LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to manage your cart, wishlist, and orders.",
};

export default function Login() {
  return <LoginClient />;
}
