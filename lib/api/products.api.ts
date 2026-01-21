import { ApiProductDetails, ProductsResponse } from "@/types/products";
import { apiFetch } from "../fetcher";

export const getProducts = ({
  page = 1,
  limit = 16,
  categoryId,
  keyword,
}: {
  page?: number;
  limit?: number;
  categoryId?: string;
  keyword?: string;
}) => {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));

  if (keyword?.trim()) params.set("keyword", keyword.trim());
  if (categoryId) params.set("category[in]", categoryId);

  return apiFetch<ProductsResponse>(`/products?${params.toString()}`);
};

export const getProductById = (id: string) =>
  apiFetch<{ data: ApiProductDetails }>(`/products/${id}`);
