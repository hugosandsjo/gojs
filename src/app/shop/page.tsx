import ProductGrid from "@/app/components/ProductGrid";

export default function Shop() {
  return (
    <section className="flex flex-col w-full items-center gap-8 p-10">
      <h1 className="text-6xl font-serif">Shop</h1>
      <ProductGrid />
    </section>
  );
}
