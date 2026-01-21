import Hero from "@/components/Hero/Hero";
import Products from "@/components/Products/Products";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          All Products{" "}
        </h2>
        <Products />
      </section>
    </main>
  );
}
