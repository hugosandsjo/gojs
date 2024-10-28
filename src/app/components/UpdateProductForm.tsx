"use client";
import { useEffect, useState } from "react";
import { getCategory, getProduct, updateProduct } from "@/lib/actions";
import Link from "next/link";
import Dropzone from "@/app/components/DropZone";
import { Product, Prisma } from "@prisma/client";

type UpdateProductFormProps = {
  productId: string;
  userId: string;
};

export default function UpdateProductForm({
  productId,
  userId,
}: UpdateProductFormProps) {
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<string[]>([
    "Painting",
    "Sculpture",
    "Digital Art",
  ]);
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
      className="bg-amber-100 flex flex-col gap-4 py-8 p-14"
    >
      <input type="hidden" name="userId" value={userId} />
      <section className="flex gap-8">
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
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              defaultValue={product?.description || ""}
              required
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
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="available_stock">Available Stock:</label>
            <input
              type="number"
              name="available_stock"
              id="available_stock"
              defaultValue={product?.available_stock || ""}
            />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col">
              <label htmlFor="height">Height:</label>
              <input
                type="text"
                name="height"
                id="height"
                defaultValue={product?.height || ""}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="width">Width:</label>
              <input
                type="text"
                name="width"
                id="width"
                defaultValue={product?.width || ""}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="depth">Depth:</label>
              <input
                type="text"
                name="depth"
                id="depth"
                defaultValue={product?.depth || ""}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="weight">Weight:</label>
              <input
                type="text"
                name="weight"
                id="weight"
                defaultValue={product?.weight || ""}
              />
            </div>
          </div>
        </div>
      </section>

      <div>
        <label>
          Select Images:
          <Dropzone />
        </label>
      </div>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <button type="button" className="py-4 px-6 border border-black">
            Cancel
          </button>
        </Link>
        <button type="submit" className="py-4 px-6 border border-black">
          Update product
        </button>
      </div>
    </form>
  );
}
