"use client";
import { updateProduct } from "@/lib/actions";
import Link from "next/link";
import Dropzone from "@/app/components/DropZone";
import { Product, Image, Category } from "@prisma/client";
import Button from "@/app/components/buttons/Button";
import DeleteButton from "@/app/components/buttons/DeleteButton";
import H2 from "@/app/components/typography/H2";
import { getImgixUrl } from "@/lib/utils";
import { useMemo } from "react";
import TextField from "@/app/components/form/TextField";
import TextArea from "@/app/components/form/TextArea";
import Dropdown from "@/app/components/form/Dropdown";
import NumberPicker from "@/app/components/form/NumberPicker";

type UpdateProductFormProps = {
  productId: string;
  userId: string;
  product: ProductWithImages;
  category: Category;
};

type ProductWithImages = Product & { images: Image[] };

export default function UpdateProductForm({
  productId,
  userId,
  product,
  category,
}: UpdateProductFormProps) {
  const defaultImages = useMemo(() => {
    return product?.images.map((img) => ({
      name: String(img.id),
      preview: getImgixUrl(img.image_key),
    }));
  }, [product]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    await updateProduct(productId, formData);
  };

  return (
    <>
      <section className="flex gap-4 justify-between">
        <Link href="/dashboard">
          <Button type="button">Back</Button>
        </Link>
        <H2>Update product</H2>
      </section>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 py-8 p-14 border border-black "
      >
        <input type="hidden" name="userId" value={userId} />

        <section className="flex gap-4">
          {" "}
          <div className="flex flex-col w-1/2">
            <TextField
              title="title"
              name="title"
              defaultValue={product?.title || ""}
            />
            <TextField
              title="price"
              name="price"
              defaultValue={product?.price || ""}
            />
            <NumberPicker
              title="quantity"
              name="quantity"
              defaultValue={product?.quantity || ""}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <Dropdown
              title="category"
              name="category"
              defaultValue={category.title}
            />
            <NumberPicker
              title="Available stock"
              name="available_stock"
              defaultValue={product?.available_stock || ""}
            />
          </div>
          <section className="flex gap-4">
            <article>
              <TextField
                title="height"
                name="height"
                defaultValue={product?.height || ""}
              />
              <TextField
                title="width"
                name="width"
                defaultValue={product?.width || ""}
              />
            </article>
            <article>
              <TextField
                title="depth"
                name="depth"
                defaultValue={product?.depth || ""}
              />
              <TextField
                title="weight"
                name="weight"
                defaultValue={product?.weight || ""}
              />
            </article>
          </section>
        </section>

        <div className="flex flex-col">
          <TextArea
            title="description"
            name="description"
            defaultValue={product?.description || ""}
          />
        </div>

        <div>
          <label>
            Select Images:
            <Dropzone defaultImages={defaultImages} />
          </label>
        </div>
        <div className="flex gap-4">
          {product?.id && <DeleteButton id={product.id} />}
          <Button type="submit">Update product</Button>
        </div>
      </form>
    </>
  );
}
