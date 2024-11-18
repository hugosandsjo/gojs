import { getProduct } from "@/lib/actions";
import { getImgixUrl } from "@/lib/utils";
import SingleProductParagraph from "@/app/components/typography/SingleProductParagraph";
import BackButton from "@/app/components/buttons/BackButton";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function SingleProduct({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const imageUrls = product.images.map((image) =>
    getImgixUrl(image.image_key, {
      w: "1200",
      // h: "1400",
      // fit: "contain",
      auto: "format",
      q: "75",
    })
  );

  return (
    <section className="flex flex-col justify-center p-10 w-full h-auto gap-10">
      <div className="flex">
        <BackButton size={12} />
      </div>

      <section className="flex flex-col w-full items-center bg-pink-600 min-h-screen">
        <div className="md:p-10 md:flex-row flex flex-col justify-center gap-8 w-full bg-orange-300">
          <div className="flex flex-col gap-4 h-full relative bg-gray-400">
            {imageUrls.length > 0 ? (
              <Image
                src={imageUrls[0]}
                alt={product.title}
                // fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={true}
                width={400}
                height={400}
              />
            ) : (
              <div className="w-80 h-80 flex items-center justify-center">
                <span>No Image Available</span>
              </div>
            )}
            <div className="flex gap-4">
              {imageUrls.map((url, index) => (
                <Image
                  key={index}
                  src={url}
                  alt={`${product.title} ${index + 1}`}
                  width={100}
                  height={100}
                  className="object-contain"
                />
              ))}
            </div>
          </div>

          <section className="text-lg flex md:flex-col justify-between gap-2">
            <div>
              <div className="mb-2 underline-offset-2 underline">
                <SingleProductParagraph>{product.title}</SingleProductParagraph>
              </div>

              <SingleProductParagraph>
                {product.category.title}
              </SingleProductParagraph>
              <Link href={`/artists/${product.user.id}`}>
                <SingleProductParagraph>
                  {product.user.name}
                </SingleProductParagraph>
              </Link>
              <SingleProductParagraph>
                {product.price} kr
              </SingleProductParagraph>
              <SingleProductParagraph>
                {product.quantity || "N/A"} st
              </SingleProductParagraph>
            </div>
            <div className="max-w-96">
              <SingleProductParagraph>
                {product.description || "No description available"}
              </SingleProductParagraph>
            </div>

            <div>
              <SingleProductParagraph>
                {product.height ? `Height: ${product.height} mm` : null}
              </SingleProductParagraph>
              <SingleProductParagraph>
                {product.weight ? `Weight: ${product.weight} kg` : null}
              </SingleProductParagraph>
              <SingleProductParagraph>
                {product.depth ? `Depth: ${product.depth} mm` : null}
              </SingleProductParagraph>
              <SingleProductParagraph>
                {product.width ? `Width: ${product.width} mm` : null}
              </SingleProductParagraph>
            </div>
          </section>
        </div>
      </section>
    </section>
  );
}
