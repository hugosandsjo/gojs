import { z } from "zod";

export const productSchema = z.object({
  userId: z.string().cuid(),
  title: z.string().min(1, "Title is required"),
  price: z.preprocess((value) => {
    console.log("Preprocess price:", value);
    return value === "" ? undefined : parseFloat(value as string);
  }, z.number().positive("Price must be a positive number")),
  description: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  status: z
    .enum(["Draft", "Published", "Archived"])
    .transform((val) => val.toUpperCase() as ProductStatus),
  quantity: z
    .preprocess((value) => {
      console.log("Preprocess quantity:", value);
      return value === "" ? undefined : parseInt(value as string, 10);
    }, z.number().int().positive())
    .optional(),
  available_stock: z
    .preprocess((value) => {
      console.log("Preprocess available_stock:", value);
      return value === "" ? undefined : parseInt(value as string, 10);
    }, z.number().int().nonnegative())
    .optional(),
  height: z
    .preprocess((value) => {
      console.log("Preprocess height:", value);
      return value === "" ? undefined : parseFloat(value as string);
    }, z.number().positive())
    .optional(),
  width: z
    .preprocess((value) => {
      console.log("Preprocess width:", value);
      return value === "" ? undefined : parseFloat(value as string);
    }, z.number().positive())
    .optional(),
  depth: z
    .preprocess((value) => {
      console.log("Preprocess depth:", value);
      return value === "" ? undefined : parseFloat(value as string);
    }, z.number().positive())
    .optional(),
  weight: z
    .preprocess((value) => {
      console.log("Preprocess weight:", value);
      return value === "" ? undefined : parseFloat(value as string);
    }, z.number().positive())
    .optional(),
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

export type FormDataValue = string | File;

type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export default productSchema;
