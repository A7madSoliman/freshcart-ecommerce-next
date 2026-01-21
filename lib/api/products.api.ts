import { ApiProductDetails, ProductsResponse } from "@/types/products";
import { apiFetch } from "../fetcher";

interface GetProductsParams {
  page?: number;
  limit?: number;
  categoryId?: string;
}

export const getProducts = ({
  page = 1,
  limit = 15,
  categoryId,
}: GetProductsParams) => {
  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (categoryId) {
    query.append("category", categoryId);
  }

  return apiFetch<ProductsResponse>(`/products?${query.toString()}`);
};

export const getProductById = (id: string) =>
  apiFetch<{ data: ApiProductDetails }>(`/products/${id}`);
