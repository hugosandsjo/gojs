"use client";

import { useState } from "react";
import { createProduct } from "@/lib/actions";

export default function CreateProductPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(event.target as HTMLFormElement);

    try {
      await createProduct(formData);
      setSuccess(true);
    } catch (err) {
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Create a New Product</h1>
      <form
        action={createProduct}
        className="bg-fuchsia-300 flex flex-col gap-4 py-4"
      >
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" id="title" required />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" id="price" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea name="description" id="description" required />
        </div>
        <div>
          <label htmlFor="category_id">Category ID:</label>
          <input type="text" name="category_id" id="category_id" required />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input type="number" name="quantity" id="quantity" />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input type="text" name="image_url" id="image_url" />
        </div>
        <div>
          <label htmlFor="available_stock">Available Stock:</label>
          <input type="number" name="available_stock" id="available_stock" />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p style={{ color: "green" }}>Product created successfully!</p>
      )}
    </div>
  );
}
