"use client";

import Products from "../Products/Products";

export default function CategoryProducts({
  categoryId,
}: {
  categoryId: string;
}) {
  return <Products categoryId={categoryId} />;
}
