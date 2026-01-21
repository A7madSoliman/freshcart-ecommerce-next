import { ApiCategory } from "@/types/category";

export default function CategoryHeader({
  category,
}: {
  category: ApiCategory;
}) {
  return (
    <div className="flex items-center gap-6 mb-8">
      <img
        src={category.image}
        alt={category.name}
        className="w-24 h-24 object-cover rounded-lg"
      />

      <div>
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-gray-500 text-sm">
          Browse all products in this category
        </p>
      </div>
    </div>
  );
}
