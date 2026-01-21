import ProductGallery from "@/components/ProductGallery/ProductGallery";
import { getProductById } from "@/lib/api/products.api";
import { Heart, Star } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-medium">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              {product.ratingsAverage}
            </div>
            <span className="text-sm text-gray-500">(Customer Reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-green-600">
              {product.price} LE
            </span>
            <span className="text-sm text-gray-500">Inclusive of VAT</span>
          </div>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-4">
            <button className="flex-1 flex items-center justify-center bg-blue-950 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition cursor-pointer">
              Add to cart
            </button>

            <button className="w-12 h-12 flex items-center justify-center rounded-xl border border-gray-300 hover:bg-gray-100 transition cursor-pointer">
              <Heart />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
