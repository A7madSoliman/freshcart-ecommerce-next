import ProductsClient from "@/components/Products/ProductsClient";
import { getProducts } from "@/lib/api/products.api";
import { ApiProduct } from "@/types/products";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const res = await getProducts({ page: 1, limit: 200 });
  const apiProducts = res.data ?? [];

  const products = apiProducts.map((p: ApiProduct) => ({
    id: p._id,
    title: p.title,
    image: p.imageCover,
    category: p.category?.name ?? "",
    rating: p.ratingsAverage ?? 0,
    price: p.priceAfterDiscount ?? p.price ?? 0,
    originalPrice: p.priceAfterDiscount ? p.price : undefined,
  }));

  return <ProductsClient products={products} />;
}
