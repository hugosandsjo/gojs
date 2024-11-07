import ProductGrid from "@/app/components/ProductGrid";

export default async function Shop() {
  return (
    <section className="flex flex-col w-full items-center gap-8 p-10">
      <ProductGrid />
    </section>
  );
}
