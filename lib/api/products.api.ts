import { ProductsResponse } from "@/types/products";
import { apiFetch } from "../fetcher";

interface GetProductsParams {
  page?: number;
  limit?: number;
}

export const getProducts = ({ page = 1, limit = 12 }) =>
  apiFetch<ProductsResponse>(`/products?page=${page}&limit=${limit}`);
