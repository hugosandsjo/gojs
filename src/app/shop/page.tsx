import ProductGrid from "@/app/components/ProductGrid";
import H2 from "@/app/components/typography/H2";

export default function Shop() {
  return (
    <section className="flex flex-col w-full items-center gap-8 p-10">
      <H2>Shop</H2>
      <ProductGrid />
    </section>
  );
}
