import H3 from "@/app/components/typography/H3";
import EditButton from "@/app/components/buttons/EditButton";
import ProductCard from "@/app/components/ProductCard";
import Link from "next/link";
import { Category } from "@prisma/client";
import { truncateText } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";

type ProductWithUrls = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  quantity: number | null;
  height: number | null;
  imageUrls: string[];
  user: string | undefined;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "UNAVAILABLE";
  category: Category;
};

type ProductListProps = {
  products: ProductWithUrls[] | undefined;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
};

function getStatusColor(status: ProductListProps["status"]) {
  switch (status) {
    case "DRAFT":
      return "bg-blue-300";
    case "PUBLISHED":
      return "bg-green-300";
    case "ARCHIVED":
      return "bg-red-400";
    default:
      return "bg-gray-300";
  }
}

export default function ProductList({ products, status }: ProductListProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });
  console.log("Status:", status);
  return (
    <section
      id={status}
      className={`flex flex-col border border-black rounded-xl py-12 px-16 gap-8 
        ${isOver ? "bg-slate-200" : null}`}
      ref={setNodeRef}
    >
      <div className="flex items-center gap-2">
        <div
          className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}
          aria-label={`${status} status indicator`}
        ></div>
        <H3>{status}</H3>
      </div>
      <article className="flex gap-8">
        {!products || products.length === 0 ? (
          <p className="text-gray-500">No {status.toLowerCase()} products</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="flex flex-col gap-4">
              <ProductCard
                id={product.id}
                title={product.title}
                description={truncateText(product.description, 90)}
                price={product.price}
                quantity={product.quantity}
                category={product.category.title}
                imageUrls={product.imageUrls}
                user={product.user}
              />
              <Link href={`/dashboard/${product.id}`}>
                <EditButton>Edit</EditButton>
              </Link>
            </div>
          ))
        )}
      </article>
    </section>
  );
}
