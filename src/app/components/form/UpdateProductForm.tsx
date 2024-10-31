"use client";
import { updateProduct } from "@/lib/actions";
import Dropzone from "@/app/components/form/DropZone";
import { Product, Image, Category } from "@prisma/client";
import Button from "@/app/components/buttons/Button";
import DeleteButton from "@/app/components/buttons/DeleteButton";
import H2 from "@/app/components/typography/H2";
import H3 from "@/app/components/typography/H3";
import { getImgixUrl } from "@/lib/utils";
import { useMemo } from "react";
import TextField from "@/app/components/form/TextField";
import TextArea from "@/app/components/form/TextArea";
import Dropdown from "@/app/components/form/Dropdown";
import NumberPicker from "@/app/components/form/NumberPicker";
import BackButton from "@/app/components/buttons/BackButton";

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
    <section className="flex flex-col gap-6">
      <section className="flex flex-col gap-6"></section>
      <section className="w-full flex gap-4 justify-between px-2">
        <BackButton />
        <H2>Update product</H2>
        <div></div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 py-8 p-14 border border-black"
      >
        <input type="hidden" name="userId" value={userId} />
        <H3>INFO</H3>
        <section className="flex flex-wrap gap-4 w-full">
          <article className="w-full flex gap-6">
            <div className="flex flex-col gap-2 w-2/3">
              <TextField
                title="Title"
                name="title"
                defaultValue={product?.title || ""}
              />
              <div className="flex gap-4">
                <NumberPicker
                  title="Quantity"
                  name="quantity"
                  defaultValue={product?.quantity || ""}
                />
                <TextField
                  title="Price"
                  name="price"
                  defaultValue={product?.price || ""}
                />
              </div>
            </div>

            <div className="w-1/3">
              <Dropdown
                title="Category"
                name="category"
                defaultValue={category.title}
              />
            </div>
          </article>
        </section>
        <H3>PROPERTIES</H3>
        {/* <NumberPicker
              title="Available stock"
              name="available_stock"
              defaultValue={product?.available_stock || ""}
            /> */}
        <section className="flex gap-4">
          <article className="flex flex-col gap-4">
            <TextField
              title="Height"
              name="height"
              defaultValue={product?.height || ""}
            />
            <TextField
              title="Width"
              name="width"
              defaultValue={product?.width || ""}
            />
          </article>
          <article className="flex flex-col gap-4">
            <TextField
              title="Depth"
              name="depth"
              defaultValue={product?.depth || ""}
            />
            <TextField
              title="Weight"
              name="weight"
              defaultValue={product?.weight || ""}
            />
          </article>
        </section>

        <div className="flex flex-col">
          <TextArea
            title="Description"
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
    </section>
  );
}
