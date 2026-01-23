export type ApiBrand = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

export type BrandsResponse = {
  results: number;
  metadata?: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
  };
  data: ApiBrand[];
};

export type BrandResponse = {
  data: ApiBrand;
};
