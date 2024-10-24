"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomImageName } from "@/lib/utils";
import { Category, Prisma } from "@prisma/client";

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
    const category = formData.get("category") as string;

    if (!title || !price || !description || !category) {
      throw new Error("All fields are required.");
    }

    const pickedCategory: Category | null = await prisma.category.findUnique({
      where: { title: category },
    });

    if (!pickedCategory) {
      throw new Error(`Category with title "${category}" not found.`);
    }

    // Optional fields
    const quantity = formData.get("quantity")
      ? parseInt(formData.get("quantity") as string, 10)
      : null;
    const available_stock = formData.get("available_stock")
      ? parseInt(formData.get("available_stock") as string, 10)
      : null;
    const height = formData.get("height")
      ? parseInt(formData.get("height") as string, 10)
      : null;

    const width = formData.get("width")
      ? parseInt(formData.get("width") as string, 10)
      : null;

    const depth = formData.get("depth")
      ? parseInt(formData.get("depth") as string, 10)
      : null;

    const weight = formData.get("weight")
      ? parseFloat(formData.get("weight") as string)
      : null;

    const data: Prisma.ProductCreateInput = {
      title,
      price,
      description,
      category: {
        connect: { id: pickedCategory.id },
      },
    };

    // Add optional fields only if they are not null
    if (quantity !== null) data.quantity = quantity;
    if (available_stock !== null) data.available_stock = available_stock;
    if (height !== null) data.height = height;
    if (width !== null) data.width = width;
    if (depth !== null) data.depth = depth;
    if (weight !== null) data.weight = weight;

    const product = await prisma.product.create({
      data,
    });

    // Now, handle image uploads and associate them with the product
    const imageFiles = formData.getAll("image") as File[];

    for (const imageFile of imageFiles) {
      if (imageFile.size > 0) {
        const imageName = randomImageName();
        const arrayBuffer = await imageFile.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const params = {
          Bucket: bucketName,
          Key: imageName,
          Body: buffer,
          ContentType: imageFile.type,
        };

        const command = new PutObjectCommand(params);
        await s3.send(command);

        // Create an Image record associated with the product
        await prisma.image.create({
          data: {
            image_key: imageName,
            product: {
              connect: { id: product.id },
            },
          },
        });
      }
    }

    console.log("Product created with images:", product);
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
    include: {
      images: true,
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
