export interface ApiCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface CategoriesResponse {
  results: number;
  data: ApiCategory[];
}
