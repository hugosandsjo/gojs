import { Product } from "@prisma/client";
import ProductParagraph from "@/app/components/typography/ProductParagraph";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = Pick<
  Product,
  "id" | "title" | "description" | "price" | "quantity" | "height" | "image_key"
>;

export default function ProductCard({
  id,
  title,
  price,
  quantity,
  height,
  image_key,
}: ProductCardProps) {
  return (
    <Link href={`shop/${id}`}>
      <div className=" max-w-40 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {image_key ? (
            <Image
              src={image_key}
              alt={title}
              width={400}
              height={400}
              className="w-32 h-40 object-cover"
            />
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
    </Link>
  );
}
