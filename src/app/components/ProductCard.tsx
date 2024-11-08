import ProductParagraph from "@/app/components/typography/ProductParagraph";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  quantity?: number | null;
  imageUrls: string[];
  user: string | undefined;
  category: string;
};

export default function ProductCard({
  title,
  price,
  quantity,
  imageUrls,
  description,
  user,
  category,
}: ProductCardProps) {
  return (
    <div className=" max-w-40 flex flex-col gap-4 hover:text-yellow-700 bg-slate-300">
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
        <ProductParagraph>{user} </ProductParagraph>
      </div>
      <div>
        <ProductParagraph>{price} kr</ProductParagraph>

        <ProductParagraph>{quantity} st</ProductParagraph>
        <ProductParagraph>{category}</ProductParagraph>
      </div>
      <div>
        <ProductParagraph>{description}</ProductParagraph>
      </div>
    </div>
  );
}
