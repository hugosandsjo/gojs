"use server";

import prisma from "@/lib/db";
export async function createProduct(formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const category_id = formData.get("category_id") as string;

    if (!title || !price || !description || !category_id) {
      throw new Error("All fields are required.");
    }

    // Optional fields
    const quantity = formData.get("quantity")
      ? parseInt(formData.get("quantity") as string, 10)
      : null;
    const image_url = (formData.get("image_url") as string) || null;
    const available_stock = formData.get("available_stock")
      ? parseInt(formData.get("available_stock") as string, 10)
      : null;

    const data: any = {
      title,
      price,
      description,
      category_id,
    };

    // Add optional fields only if they are not null
    if (quantity !== null) data.quantity = quantity;
    if (image_url !== null) data.image_url = image_url;
    if (available_stock !== null) data.available_stock = available_stock;

    const product = await prisma.product.create({
      data,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}
