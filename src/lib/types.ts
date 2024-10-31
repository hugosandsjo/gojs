import { z } from "zod";

export const productSchema = z.object({
  userId: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  price: z.preprocess(
    (value) => parseFloat(value as string),
    z.number().positive("Price must be a positive number")
  ),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  quantity: z
    .preprocess(
      (value) => (value ? parseInt(value as string, 10) : undefined),
      z.number().int().positive()
    )
    .optional(),
  available_stock: z
    .preprocess(
      (value) => (value ? parseInt(value as string, 10) : undefined),
      z.number().int().nonnegative()
    )
    .optional(),
  height: z
    .preprocess(
      (value) => (value ? parseFloat(value as string) : undefined),
      z.number().positive()
    )
    .optional(),
  width: z
    .preprocess(
      (value) => (value ? parseFloat(value as string) : undefined),
      z.number().positive()
    )
    .optional(),
  depth: z
    .preprocess(
      (value) => (value ? parseFloat(value as string) : undefined),
      z.number().positive()
    )
    .optional(),
  weight: z
    .preprocess(
      (value) => (value ? parseFloat(value as string) : undefined),
      z.number().positive()
    )
    .optional(),
  // Add any other fields you need to validate from the form
});

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

export default productSchema;
