export type WishlistProduct = {
  _id: string;
  title: string;
  imageCover?: string;
  price?: number;
  ratingsAverage?: number;
  category?: { name?: string } | string;
  brand?: { name?: string } | string;
};

export type WishlistResponse = {
  status?: string;
  count?: number;
  data?: WishlistProduct[];
};

export type WishlistMutationResponse = {
  status?: string;
  message?: string;
  data?: string[];
};
