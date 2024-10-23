"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import crypto from "crypto";
import { Product } from "@prisma/client";
dotenv.config();

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey!,
    secretAccessKey: secretAccessKey!,
  },
  region: bucketRegion!,
});

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

    type ProductInput = Pick<
      Product,
      "title" | "price" | "description" | "category_id"
    > & {
      quantity?: number | null;
      image_url?: string | null;
      available_stock?: number | null;
    };

    const data: ProductInput = {
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
    console.log("Product created:", product);
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
}

export async function getProduct(productId: string) {
  const product = prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  return product;
}

export async function getUser(userId: string | undefined) {
  if (!userId) return null;
  const user = prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  revalidatePath("/dashboard");
  return user;
}

export async function uploadImage(formData: FormData): Promise<void> {
  const imageFile = formData.get("image") as File;

  if (!imageFile) {
    throw new Error("No file uploaded");
  }
  console.log("Random image name:", randomImageName());

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const params = {
    Bucket: bucketName,
    Key: randomImageName(),
    Body: buffer,
    ContentType: imageFile.type,
  };

  // Upload the image to S3
  const command = new PutObjectCommand(params);
  await s3.send(command);
}
