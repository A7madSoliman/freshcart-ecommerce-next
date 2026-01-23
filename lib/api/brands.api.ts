import { apiFetch } from "@/lib/fetcher";
import { BrandResponse, BrandsResponse } from "@/types/brands";

export const getBrands = ({
  page = 1,
  limit = 40,
  keyword = "",
}: {
  page?: number;
  limit?: number;
  keyword?: string;
} = {}) => {
  const qs = new URLSearchParams();
  qs.set("page", String(page));
  qs.set("limit", String(limit));
  if (keyword.trim()) qs.set("keyword", keyword.trim());

  return apiFetch<BrandsResponse>(`/brands?${qs.toString()}`);
};

export const getBrandById = (id: string) =>
  apiFetch<BrandResponse>(`/brands/${id}`);
