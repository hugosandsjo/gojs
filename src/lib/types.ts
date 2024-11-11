import { z } from "zod";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { Prisma } from "@prisma/client";

export const formFileSchema = z.object({
  size: z
    .number()
    .positive("Add at least 1 image")
    .max(
      MAX_FILE_SIZE,
      `File size should not exceed ${MAX_FILE_SIZE / (1024 * 1024)} MB`
    ),
  type: z.string(),
  name: z.string(),
  lastModified: z.number().optional(),
});

export const productSchema = z.object({
  userId: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  price: z.preprocess((value) => {
    return value === "" ? undefined : parseFloat(value as string);
  }, z.number().positive("Price must be a positive number")),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  quantity: z
    .preprocess((value) => {
      return value === "" ? undefined : parseInt(value as string, 10);
    }, z.number().int().positive())
    .optional(),
  available_stock: z
    .preprocess((value) => {
      return value === "" ? undefined : parseInt(value as string, 10);
    }, z.number().int().nonnegative())
    .optional(),
  height: z
    .preprocess((value) => {
      return value === "" ? undefined : parseFloat(value as string);
    }, z.number().positive())
    .optional(),
  width: z
    .preprocess((value) => {
      return value === "" ? undefined : parseFloat(value as string);
    }, z.number().positive())
    .optional(),
  depth: z
    .preprocess((value) => {
      return value === "" ? undefined : parseFloat(value as string);
    }, z.number().positive())
    .optional(),
  weight: z
    .preprocess((value) => {
      return value === "" ? undefined : parseFloat(value as string);
    }, z.number().positive())
    .optional(),
  images: z.array(formFileSchema).min(1, "At least one image is required"),
});

export type ProductFormData = z.infer<typeof productSchema>;

export type FormFile = File;

export type DealFormState<T> = {
  errors?: StringMap;
  successMsg?: string;
  success?: boolean;
  data?: T;
  blurs?: StringtoBooleanMap;
};

export type StringMap = {
  [key: string]: string;
};

export type StringtoBooleanMap = {
  [key: string]: boolean;
};

export type FormDataValue = string | File;

export type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export default productSchema;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

export type LoginActionResponse = {
  status: "error" | "success";
  errors?: {
    email?: string[];
    password?: string[];
    form?: string;
  };
};

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    form?: string;
  };
  success?: boolean;
};

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        name: true;
        email: true;
        role: true;
      };
    };
    images: true;
    category: true;
  };
}>;

export type LoginFormData = z.infer<typeof loginSchema>;
