import { getProduct } from "@/lib/actions";
import { getImgixUrl } from "@/lib/utils";
import SingleProductParagraph from "@/app/components/typography/SingleProductParagraph";
import BackButton from "@/app/components/buttons/BackButton";
import AsyncImage from "@/app/components/AsyncImage";
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
      auto: "format",
      q: "75",
    })
  );

  return (
    <section className="flex flex-col justify-center p-10 w-full h-auto gap-10">
      <div className="flex">
        <BackButton size={12} />
      </div>

      <section className="flex flex-col w-full items-center min-h-screen">
        <div className="md:p-10 md:flex-row flex flex-col justify-center gap-8 w-full">
          <div className="flex justify-start flex-col gap-8">
            {/* Main Image */}
            <div className="w-[400px] h-[400px] relative">
              {imageUrls.length > 0 ? (
                <AsyncImage
                  src={imageUrls[0]}
                  alt={product.title}
                  fill
                  className="object-contain object-left md:object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span>No Image Available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4 flex-wrap">
              {imageUrls.map((url, index) => (
                <div key={index} className="relative w-24 h-24">
                  <AsyncImage
                    src={url}
                    alt={`${product.title} ${index + 1}`}
                    fill
                    className="object-contain object-left"
                    sizes="100px"
                  />
                </div>
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
