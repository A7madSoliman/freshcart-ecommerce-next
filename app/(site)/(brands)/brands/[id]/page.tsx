import { getBrandById } from "@/lib/api/brands.api";
import BrandEmptyState from "@/components/empty/BrandEmptyState";
import { notFound } from "next/navigation";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return notFound(); // ده بس للـ route الغلط

  // 1) هات بيانات البراند
  let brand: any = null;
  try {
    const res = await getBrandById(id);
    brand = res.data;
  } catch {
    // لو حتى البراند نفسه مش بييجي
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <BrandEmptyState
          title="Brand unavailable"
          description="We couldn’t load this brand right now (API issue). Try again later."
        />
      </section>
    );
  }

  if (!brand) {
    return (
      <section className="max-w-6xl mx-auto py-10 px-4">
        <BrandEmptyState
          title="Brand unavailable"
          description="We couldn’t load this brand right now (API data is missing)."
        />
      </section>
    );
  }

  // 2) هنا: اعرض Header بتاع البراند
  return (
    <section className="max-w-6xl mx-auto py-10 px-4">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center">
          <img
            src={brand.image}
            alt={brand.name}
            className="h-full w-full object-contain p-2"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{brand.name}</h1>
          <p className="text-sm text-gray-500">Brand page</p>
        </div>
      </div>

      <BrandEmptyState
        title="No products found for this brand"
        description="This brand doesn’t have products available right now (API is incomplete)."
      />
    </section>
  );
}
