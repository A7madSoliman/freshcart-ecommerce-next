export interface ApiProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  imageCover: string;
  category: {
    _id: string;
    name: string;
  };
}

export interface ProductsResponse {
  results: number;
  data: ApiProduct[];
}

export interface ProductCardData {
  id: string;
  image: string;
  category: string;
  name: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
}
