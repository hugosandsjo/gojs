// ProductsSection.tsx
import ProductListGrid from "@/app/components/ProductListGrid";
import { getUser, getUserProducts } from "@/lib/actions";
import H3 from "@/app/components/typography/H3";

type ProductsSectionProps = {
  userId: string;
};

export async function ProductsSection({ userId }: ProductsSectionProps) {
  const user = await getUser(userId);
  const products = await getUserProducts(userId);

  if (!products || !user) {
    return (
      <section className="flex flex-col w-full gap-8">
        <H3>My artwork:</H3>
        <div>No products available</div>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full gap-8">
      <H3>My artwork:</H3>
      <ProductListGrid products={products} user={user} />
    </section>
  );
}
