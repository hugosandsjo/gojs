"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { convertZodErrors, randomImageName } from "@/lib/utils";
import { Category, Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  productSchema,
  DealFormState,
  StringMap,
  FormDataValue,
} from "@/lib/types";

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

export async function createProduct(
  prevState: DealFormState<StringMap>,
  formData: FormData
): Promise<DealFormState<StringMap>> {
  try {
    const formDataObject: Record<string, FormDataValue> = {};

    formData.forEach((value, key) => {
      if (typeof value === "string" || value instanceof File) {
        formDataObject[key] = value;
      }
    });
    console.log("formDataObject", formDataObject);
    // Convert all empty strings in formDataObject to undefined
    const cleanedData = Object.fromEntries(
      Object.entries(formDataObject).map(([key, value]) => [
        key,
        value === "" ? undefined : value,
      ])
    );
    // Validate data
    const validated = productSchema.safeParse(cleanedData);

    if (!validated.success) {
      const errors = convertZodErrors(validated.error);
      return { errors };
    } else {
      const {
        userId,
        title,
        price,
        description,
        category,
        quantity,
        available_stock,
        height,
        width,
        depth,
        weight,
      } = validated.data;

      const pickedCategory: Category | null = await prisma.category.findUnique({
        where: { title: category },
      });

      if (!pickedCategory) {
        throw new Error(`Category with title "${category}" not found.`);
      }

      const data: Prisma.ProductCreateInput = {
        title,
        price,
        description,
        category: {
          connect: { id: pickedCategory.id },
        },
        user: {
          connect: { id: userId },
        },
      };

      if (quantity !== undefined) data.quantity = quantity;
      if (available_stock !== undefined) data.available_stock = available_stock;
      if (height !== undefined) data.height = height;
      if (width !== undefined) data.width = width;
      if (depth !== undefined) data.depth = depth;
      if (weight !== undefined) data.weight = weight;

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
    }

    revalidatePath("/dashboard");
    // return { success: true };
  } catch (error) {
    console.error("Error creating product:", error);
    return { errors: { general: "Failed to create product." } };
  }
  redirect("/dashboard");
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

export async function getCategory(categoryId: string) {
  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });
  return category;
}

export async function getUser(userId: string | undefined) {
  if (!userId) return null;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  revalidatePath("/dashboard");
  return user;
}

export async function getUserProducts(id: string | undefined) {
  if (!id) return null;
  const products = await prisma.product.findMany({
    where: { userId: id },
    include: {
      images: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return products;
}

export async function deleteProduct(productId: string) {
  try {
    await prisma.image.deleteMany({
      where: {
        productId: productId,
      },
    });

    await prisma.product.delete({
      where: {
        id: productId,
      },
    });

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;

    if (!userId || !title || !price || !description || !category) {
      throw new Error("All required fields must be filled.");
    }

    const pickedCategory = await prisma.category.findUnique({
      where: { title: category },
    });

    if (!pickedCategory) {
      throw new Error(`Category with title "${category}" not found.`);
    }

    // Optional fields with type conversion
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

    const data: Prisma.ProductUpdateInput = {
      title,
      price,
      description,
      category: {
        connect: { id: pickedCategory.id },
      },
      user: {
        connect: { id: userId },
      },
    };

    // Add optional fields only if they are not null
    if (quantity !== null) data.quantity = quantity;
    if (available_stock !== null) data.available_stock = available_stock;
    if (height !== null) data.height = height;
    if (width !== null) data.width = width;
    if (depth !== null) data.depth = depth;
    if (weight !== null) data.weight = weight;

    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data,
    });

    // Handle image updates
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

        // Create new image record
        await prisma.image.create({
          data: {
            image_key: imageName,
            product: {
              connect: { id: updatedProduct.id },
            },
          },
        });
      }
    }
  } catch (error) {
    console.error("Error updating product:", error);
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}
