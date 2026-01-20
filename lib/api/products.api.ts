import { ApiProductDetails, ProductsResponse } from "@/types/products";
import { apiFetch } from "../fetcher";

export const getProducts = ({ page = 1, limit = 15 }) =>
  apiFetch<ProductsResponse>(`/products?page=${page}&limit=${limit}`);

export const getProductById = (id: string) =>
  apiFetch<{ data: ApiProductDetails }>(`/products/${id}`);
