import { Metadata } from "next";
import ForgotpasswordClient from "./ForgetpasswordClient";

export const metadata: Metadata = {
  title: "Forget Password",
  description: "Reset your password to manage your cart, wishlist, and orders.",
};

export default function ForgotPassword() {
  return <ForgotpasswordClient />;
}
