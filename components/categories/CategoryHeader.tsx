import { ApiCategory } from "@/types/category";

export default function CategoryHeader({
  category,
}: {
  category: ApiCategory;
}) {
  return (
    <div className="mt-10 mb-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img
          src={category.image}
          alt={category.name}
          className="h-10 w-10 rounded-xl object-cover"
        />
        <div>
          <h2 className="text-lg font-bold text-gray-900">{category.name}</h2>
          <p className="text-xs text-gray-500">Products in this category</p>
        </div>
      </div>
    </div>
  );
}
