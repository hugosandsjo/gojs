"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { convertZodErrors, randomImageName } from "@/lib/utils";
import { Category, Prisma, ProductStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { productSchema, DealFormState, StringMap } from "@/lib/types";
import crypto from "crypto";
import { Hash } from "crypto";
import { compare } from "bcryptjs";

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
    const formDataObject: Record<string, unknown> = {};

    const imageFiles: File[] = [];

    formData.getAll("images").forEach((item) => {
      if (item instanceof File) {
        imageFiles.push(item);
      }
    });

    formDataObject.images = imageFiles;

    formData.forEach((value, key) => {
      if (key !== "images") {
        formDataObject[key] = value === "" ? undefined : value;
      }
    });

    console.log("formDataObject:", formDataObject);

    // Validate data
    const validated = productSchema.safeParse(formDataObject);

    if (!validated.success) {
      const errors = convertZodErrors(validated.error);
      return { errors };
    }

    const data = validated.data;

    const {
      userId,
      title,
      price,
      status,
      description,
      category,
      quantity,
      available_stock,
      height,
      width,
      depth,
      weight,
    } = data;

    const pickedCategory: Category | null = await prisma.category.findUnique({
      where: { title: category },
    });

    if (!pickedCategory) {
      throw new Error(`Category with title "${category}" not found.`);
    }

    // Prepare product data
    const productData: Prisma.ProductCreateInput = {
      title,
      price,
      description,
      status,
      category: {
        connect: { id: pickedCategory.id },
      },
      user: {
        connect: { id: userId },
      },
      quantity,
      available_stock,
      height,
      width,
      depth,
      weight,
    };

    // Create product
    const product = await prisma.product.create({
      data: productData,
    });

    // Handle image uploads and associate them with the product
    for (const imageFile of imageFiles) {
      if (imageFile instanceof File && imageFile.size > 0) {
        try {
          const imageName = randomImageName();

          // Convert to buffer
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

          await prisma.image.create({
            data: {
              image_key: imageName,
              product: {
                connect: { id: product.id },
              },
            },
          });
        } catch (imageError) {
          if (imageError instanceof Error) {
            throw new Error(`Failed to upload image: ${imageError.message}`);
          } else {
            throw new Error("Failed to upload image due to an unknown error.");
          }
        }
      }
    }

    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error creating product:", error);
    return { errors: { general: "Failed to create product." } };
  }
  redirect("/dashboard");
}

export async function getProduct(productId: string) {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      images: true,
      category: true,
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
      category: true,
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

export async function getUserFromDb(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || !user.password) {
    throw new Error("Invalid credentials.");
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}

export async function updateProduct(productId: string, formData: FormData) {
  try {
    const removedImageIds = formData.getAll("removedImages") as string[];
    console.log("formData provided:", formData);
    const userId = formData.get("userId") as string;
    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as string;

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
      status: status.toUpperCase() as ProductStatus,
      category: {
        connect: { id: pickedCategory.id },
      },
      user: {
        connect: { id: userId },
      },
    };

    console.log("Data updated:", data);

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

    await prisma.image.deleteMany({
      where: {
        id: { in: removedImageIds.map((id) => parseInt(id, 10)) },
        productId: productId,
      },
    });
    const imageFiles: File[] = formData.getAll("images") as File[];

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
