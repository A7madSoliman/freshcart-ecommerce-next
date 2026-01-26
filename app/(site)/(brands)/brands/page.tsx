import { Metadata } from "next";
import BrandsClient from "./BrandsClient";

export const metadata: Metadata = {
  title: "Brands",
  description: "Browse brands and discover collections.",
};

export default function BrandsPage() {
  return <BrandsClient />;
}
