import ProductActions from "@/components/ProductActions/ProductActions";
import ProductGallery from "@/components/ProductGallery/ProductGallery";
import { getProductById } from "@/lib/api/products.api";
import { Star } from "lucide-react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Product Details",
  description: "Browse all products, search, and discover new arrivals.",
};

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return notFound();

  if (!id) return notFound();

  const res = await getProductById(id);
  const product = res.data;

  if (!product) return notFound();
  return (
    <section className="min-h-screen pt-28 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Slider */}
        <div className="md:col-span-5">
          <ProductGallery images={product.images ?? []} />
        </div>

        {/* Details */}
        <div className="md:col-span-7 flex flex-col gap-6">
          <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              {product.ratingsAverage}
            </div>
            <span className="text-sm text-gray-500">(Customer Reviews)</span>
          </div>

          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-green-600">
              {product.price} LE
            </span>
            <span className="text-sm text-gray-500">Inclusive of VAT</span>
          </div>

          <hr className="border-gray-200" />

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* ✅ Client actions */}
          <ProductActions productId={product._id} />
        </div>
      </div>
    </section>
  );
}
