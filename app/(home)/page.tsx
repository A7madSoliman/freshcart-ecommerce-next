import Hero from "@/components/Hero/Hero";
import Products from "@/components/Products/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Shop curated fashion and electronics at the best prices.",
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div
          className="text-center aos-init aos-animate"
          data-aos="fade-up"
          data-aos-duration="700"
          data-aos-once="true"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            All Products
          </h2>
          <p className="mt-3 text-gray-500 mb-6">
            Browse our latest picks in fashion and tech.
          </p>
        </div>
        <Products />
      </section>
    </main>
  );
}
