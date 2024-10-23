import { Product } from "@prisma/client";
import ProductParagraph from "@/app/components/typography/ProductParagraph";

type ProductCardProps = Pick<
  Product,
  "title" | "description" | "price" | "quantity" | "height" | "image_url"
>;

export default function ProductCard({
  title,
  price,
  quantity,
  height,
  image_url,
}: ProductCardProps) {
  return (
    <div className=" max-w-40 flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        {image_url ? (
          <img src={image_url} alt={title} className="w-32 h-40 object-cover" />
        ) : (
          <div className="w-32 h-40 bg-lime-300"></div>
        )}
        <p className="font-sans underline-offset-2 underline text-xs">
          {title}
        </p>
        <ProductParagraph>Kreatör: Hugo Sandsjö</ProductParagraph>
      </div>
      <div>
        <ProductParagraph>Price: {price}</ProductParagraph>
        <ProductParagraph>Quantity:{quantity}</ProductParagraph>
        <ProductParagraph>Height: {height}</ProductParagraph>
      </div>
    </div>
  );
}
