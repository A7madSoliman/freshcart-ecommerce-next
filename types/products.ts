// API SHAPE
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

// API RESPONSE
export interface ProductsResponse {
  results: number;
  data: ApiProduct[];
}

// UI SHAPE (ProductCard)
export interface ProductCardData {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number | null;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews?: number;
}

// Props
export interface InitialProductsProps {
  initialProducts: ProductCardData[];
}

export interface ApiProductDetails {
  _id: string;
  title: string;
  description: string;
  price: number;
  priceAfterDiscount?: number;
  ratingsAverage: number;
  images: string[];
  imageCover: string;
  category: {
    name: string;
  };
}
