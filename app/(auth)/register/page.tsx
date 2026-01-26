import { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register",
  description: "Register to manage your cart, wishlist, and orders.",
};

export default function Register() {
  return <RegisterClient />;
}
