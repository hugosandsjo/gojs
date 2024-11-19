import ProductGrid from "@/app/components/product/ProductGrid";

export default async function Shop() {
  return (
    <section className="flex flex-col w-full justify-center items-center gap-8 p-10">
      <ProductGrid />
    </section>
  );
}
