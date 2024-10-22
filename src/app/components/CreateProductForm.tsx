import { createProduct } from "@/lib/actions";
import Link from "next/link";
export default function CreateProductForm() {
  return (
    <form
      action={createProduct}
      className="bg-lime-300 flex flex-col gap-4 py-8 p-14"
    >
      <section className="flex gap-8">
        {" "}
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col">
            <label htmlFor="title">Title:</label>
            <input type="text" name="title" id="title" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="price">Price:</label>

            <input type="text" name="price" id="price" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description:</label>
            <textarea name="description" id="description" required />
          </div>
        </div>
        <div className="flex flex-col w-1/2">
          <div className="flex flex-col">
            <label htmlFor="category_id">Category ID:</label>
            <input type="text" name="category_id" id="category_id" required />
          </div>
          <div className="flex flex-col">
            <label htmlFor="quantity">Quantity:</label>
            <input type="number" name="quantity" id="quantity" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="available_stock">Available Stock:</label>
            <input type="number" name="available_stock" id="available_stock" />
          </div>
        </div>
      </section>

      <div>
        <label>
          Select Image:
          <input type="file" name="image" accept="image/*" />
        </label>
      </div>
      <div className="flex gap-4">
        <Link href="/dashboard">
          {" "}
          <button className="py-4 px-6 border border-black">Cancel</button>
        </Link>
        <button className="py-4 px-6 border border-black">
          Create Product
        </button>
      </div>
    </form>
  );
}
