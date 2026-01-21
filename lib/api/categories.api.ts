import { ApiCategory, CategoriesResponse } from "@/types/category";
import { apiFetch } from "../fetcher";

export const getCategories = () => apiFetch<CategoriesResponse>("/categories");

export const getCategoryById = (id: string) =>
  apiFetch<{ data: ApiCategory }>(`/categories/${id}`);
