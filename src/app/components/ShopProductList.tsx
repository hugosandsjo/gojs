import ProductCard from "@/app/components/ProductCard";
import { getImgixUrl } from "@/lib/utils";
import Link from "next/link";
import { truncateText } from "@/lib/utils";
import { getPublishedProducts } from "@/lib/actions";

export default async function ShopProductList() {
  const products = await getPublishedProducts();

  const productsWithUrls = products.map((product) => {
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
      shortDescription: truncateText(product.description || "", 90),
    };
  });

  return productsWithUrls.map((product) => (
    <Link key={product.id} href={`shop/${product.id}`}>
      <ProductCard
        key={product.id}
        id={product.id}
        title={product.title}
        description={product.shortDescription}
        price={product.price}
        category={product.category.title}
        quantity={product.quantity}
        imageUrls={product.imageUrls}
        user={product.user}
      />
    </Link>
  ));
}
