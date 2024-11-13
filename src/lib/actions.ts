"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { convertZodErrors, randomImageName } from "@/lib/utils";
import { Category, Prisma, ProductStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import {
  DealFormState,
  StringMap,
  loginSchema,
  LoginActionResponse,
  LoginFormState,
  updateProductSchema,
  createProductSchema,
} from "@/lib/types";
import { bucketName, s3 } from "@/lib/s3";
import { compare } from "bcryptjs";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

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

    // Validate data
    const validated = createProductSchema.safeParse(formDataObject);

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
      user: true,
    },
  });
  return product;
}

export async function getArtist(artistId: string) {
  const artist = await prisma.user.findUnique({
    where: {
      id: artistId,
    },
  });

  return artist;
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

export async function getUserFromDb(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
      },
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error("Error in getUserFromDb:", error);
    return null;
  }
}

export async function getPublishedProducts() {
  const publishedProducts = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
    },
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

  return publishedProducts;
}

export async function getAllArtists() {
  const allArtists = await prisma.user.findMany();
  return allArtists;
}

export async function loginAction(
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginActionResponse> {
  // Validate fields
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      status: "error",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const user = await getUserFromDb(email, password);

  if (!user) {
    return {
      status: "error",
      errors: {
        form: "Invalid email or password",
      },
    };
  }

  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    return {
      status: "error",
      errors: {
        form: "Authentication failed",
      },
    };
  }

  if (result instanceof AuthError) {
    return {
      status: "error",
      errors: {
        form: `Authentication error: ${result.type}`,
      },
    };
  }

  redirect("/dashboard");
}

export async function getUserProducts(id: string | undefined) {
  if (!id) return null;
  const products = await prisma.product.findMany({
    where: { userId: id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      images: true,
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
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProductStatus(
  productId: string,
  newStatus: ProductStatus
) {
  await prisma.product.update({
    where: { id: productId },
    data: {
      status: newStatus,
    },
  });

  revalidatePath("/shop");
}

export async function updateProduct(
  prevState: DealFormState<StringMap>,
  formData: FormData,
  productId: string
): Promise<DealFormState<StringMap>> {
  try {
    const formDataObject: Record<string, unknown> = {};

    const imageFiles: File[] = [];
    formData.getAll("images").forEach((item) => {
      if (item instanceof File) {
        imageFiles.push(item);
      }
    });

    if (imageFiles.length > 0) {
      formDataObject.images = imageFiles;
    }

    formData.forEach((value, key) => {
      if (key !== "images" && key !== "removedImages") {
        formDataObject[key] = value === "" ? undefined : value;
      }
    });

    const removedImageIds = formData.getAll("removedImages") as string[];

    const currentImages = await prisma.image.count({
      where: { productId: productId },
    });

    if (removedImageIds.length >= currentImages && imageFiles.length === 0) {
      return {
        errors: {
          images: "At least one image is required",
        },
      };
    }

    // Validate data
    const validated = updateProductSchema.safeParse(formDataObject);

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
    const productData: Prisma.ProductUpdateInput = {
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

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: productData,
    });

    // Handle removed images
    if (removedImageIds.length > 0) {
      await prisma.image.deleteMany({
        where: {
          id: { in: removedImageIds.map((id) => parseInt(id, 10)) },
          productId: productId,
        },
      });
    }

    // Handle image uploads
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
                connect: { id: updatedProduct.id },
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
    console.error("Error updating product:", error);
    return { errors: { general: "Failed to update product." } };
  }
  redirect("/dashboard");
}
