import ProductList from "@/app/components/ProductList";
import { getImgixUrl } from "@/lib/utils";
import { Category } from "@prisma/client";

type ProductImage = {
  id: number;
  image_key: string;
  productId: string;
};

type ProductUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type ProductFromDB = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  quantity: number | null;
  height: number | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "UNAVAILABLE";
  category: Category;
  images: ProductImage[];
  user: ProductUser;
  userId: string;
};

type ProductListGridProps = {
  products: ProductFromDB[];
  user: ProductUser;
};

export default function ProductListGrid({ products }: ProductListGridProps) {
  const productsWithUrls = products?.map((product) => {
    const imageUrls = product.images.map((image) =>
      getImgixUrl(image.image_key, {
        w: "400",
        h: "400",
        fit: "crop",
        auto: "format",
        q: "75",
      })
    );

    return {
      ...product,
      imageUrls,
      user: product.user?.name,
    };
  });

  const publishedProducts = productsWithUrls?.filter(
    (product) => product.status === "PUBLISHED"
  );
  const draftProducts = productsWithUrls?.filter(
    (product) => product.status === "DRAFT"
  );
  const archivedProducts = productsWithUrls?.filter(
    (product) => product.status === "ARCHIVED"
  );
  return (
    <>
      <ProductList products={publishedProducts} status="PUBLISHED" />
      <ProductList products={draftProducts} status="DRAFT" />
      <ProductList products={archivedProducts} status="ARCHIVED" />
    </>
  );
}
