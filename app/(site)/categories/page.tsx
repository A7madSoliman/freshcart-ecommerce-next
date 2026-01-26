import { Metadata } from "next";
import CategoriesClient from "./CategoriesClient";

export const metadata: Metadata = {
  title: "Categories",
  description: "Explore categories and browse products by type.",
};

export default function CategoriesPage() {
  return <CategoriesClient />;
}
