import ProductParagraph from "@/app/components/typography/ProductParagraph";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  quantity?: number | null;
  height?: number | null;
  imageUrls: string[];
};

export default function ProductCard({
  id,
  title,
  price,
  quantity,
  height,
  imageUrls,
  description,
}: ProductCardProps) {
  return (
    <Link href={`shop/${id}`}>
      <div className=" max-w-40 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          {imageUrls ? (
            <Image
              src={imageUrls[0]}
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
          <ProductParagraph>Description{description}</ProductParagraph>
        </div>
      </div>
    </Link>
  );
}
