import { getBrandById } from "@/lib/api/brands.api";
import { notFound } from "next/navigation";

export default async function BrandDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return notFound();

  try {
    const res = await getBrandById(id);
    const brand = res.data;

    if (!brand) return notFound();

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
      </section>
    );
  } catch {
    return notFound();
  }
}
