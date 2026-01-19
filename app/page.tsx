import Hero from "@/components/Hero/Hero";
import Products from "@/components/Product/Products";
import { getProducts } from "@/lib/api/products.api";
import { mapProductToCard } from "@/lib/helper/product.mapper";

export default async function Home() {
  const res = await getProducts({ page: 1, limit: 12 });
  const initialProducts = res.data.map(mapProductToCard);
  return (
    <div>
      <Hero />
      <Products initialProducts={initialProducts} />
    </div>
  );
}
