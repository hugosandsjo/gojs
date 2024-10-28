"use client";
import { useEffect, useState } from "react";
import { getCategory, getProduct, updateProduct } from "@/lib/actions";
import Link from "next/link";
import Dropzone from "@/app/components/DropZone";
import { Product } from "@prisma/client";
import Button from "@/app/components/buttons/Button";

type UpdateProductFormProps = {
  productId: string;
  userId: string;
};

export default function UpdateProductForm({
  productId,
  userId,
}: UpdateProductFormProps) {
  const [product, setProduct] = useState<Product>();
  //Hardcoded for now
  const categories = ["Painting", "Sculpture", "Digital Art"];
  const [currentCategory, setCurrentCategory] = useState<string>("");

  useEffect(() => {
    (async () => {
      const fetchedProduct = await getProduct(productId);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        const fetchedCategory = await getCategory(fetchedProduct.category_id);
        console.log("Fetched category:", fetchedCategory);
        if (fetchedCategory) {
          setCurrentCategory(fetchedCategory.title);
        }
      }
    })();
  }, [productId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    await updateProduct(productId, formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 py-8 p-14 border border-black"
    >
      <input type="hidden" name="userId" value={userId} />
      <section className="flex gap-4">
        {" "}
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={product?.title || ""}
              required
              className="border border-black p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price">Price:</label>

            <input
              type="text"
              name="price"
              id="price"
              defaultValue={product?.price || ""}
              required
              className="border border-black p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              defaultValue={product?.description || ""}
              required
              className="border border-black p-2"
            />
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col">
            <label htmlFor="category">Category:</label>
            {currentCategory && (
              <select
                name="category"
                id="category"
                required
                defaultValue={currentCategory}
                className="border border-black p-2"
              >
                <option value="">Select Category</option>
                {categories.map((formCategory) => (
                  <option key={formCategory} value={formCategory}>
                    {formCategory}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              name="quantity"
              id="quantity"
              defaultValue={product?.quantity || ""}
              className="border border-black p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="available_stock">Available Stock:</label>
            <input
              type="number"
              name="available_stock"
              id="available_stock"
              defaultValue={product?.available_stock || ""}
              className="border border-black p-2"
            />
          </div>
        </div>
      </section>

      <section className="flex gap-4 justify-between">
        <article>
          <div className="flex flex-col">
            <label htmlFor="height">Height:</label>
            <input
              type="text"
              name="height"
              id="height"
              defaultValue={product?.height || ""}
              className="border border-black p-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="width">Width:</label>
            <input
              type="text"
              name="width"
              id="width"
              defaultValue={product?.width || ""}
              className="border border-black p-2"
            />
          </div>
        </article>
        <article>
          <div className="flex flex-col">
            <label htmlFor="depth">Depth:</label>
            <input
              type="text"
              name="depth"
              id="depth"
              defaultValue={product?.depth || ""}
              className="border border-black p-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="weight">Weight:</label>
            <input
              type="text"
              name="weight"
              id="weight"
              defaultValue={product?.weight || ""}
              className="border border-black p-2"
            />
          </div>
        </article>
      </section>

      <div>
        <label>
          Select Images:
          <Dropzone />
        </label>
      </div>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button type="button">Cancel</Button>
        </Link>

        <Button type="submit">Update product</Button>
      </div>
    </form>
  );
}
