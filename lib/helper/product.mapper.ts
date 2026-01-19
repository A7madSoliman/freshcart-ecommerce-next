import { ApiProduct, ProductCardData } from "@/types/products";

export function mapProductToCard(product: ApiProduct): ProductCardData {
  return {
    id: product._id,
    image: product.imageCover,
    category: product.category.name,
    name: product.title,
    price: product.price,
    priceAfterDiscount: product.priceAfterDiscount,
    ratingsAverage: product.ratingsAverage,
  };
}
