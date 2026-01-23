export default function ProductNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-3xl font-bold text-gray-900">Product Not Found</h1>
      <p className="text-gray-500">
        This product may have been removed, or the link is incorrect.
      </p>

      <a
        href="/"
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
      >
        Back to Home
      </a>
    </div>
  );
}
