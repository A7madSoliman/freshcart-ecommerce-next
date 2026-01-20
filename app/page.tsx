// app/page.tsx
import Hero from "@/components/Hero/Hero";
import Products from "@/components/Product/Products";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          All Products{" "}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <Products />
        </div>
      </section>
    </main>
  );
}
