import { z } from "zod";

export const ProductSchema = z.object({
  userId: z.string(),
  title: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(15, { message: "Maximum of 15 characters long" }),
  price: z.number({ invalid_type_error: "Price must be a number" }),
  description: z.string().optional(),
  quantity: z.number({ invalid_type_error: "Quantity must be a number" }),
  category: z.string(),
  height: z
    .number({ invalid_type_error: "Height must be a valid number" })
    .optional()
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Height must be a valid number",
    }),
  width: z
    .number({ invalid_type_error: "Width must be a valid number" })
    .optional()
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Width must be a valid number",
    }),
  depth: z
    .number({ invalid_type_error: "Depth must be a valid number" })
    .optional()
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Depth must be a valid number",
    }),
  weight: z
    .number({ invalid_type_error: "Weight must be a valid number" })
    .optional()
    .refine((val) => val === undefined || !isNaN(val), {
      message: "Weight must be a valid number",
    }),
  available_stock: z
    .number({ invalid_type_error: "Available stock must be a number" })
    .optional(),
});

// Create a type from the schema
export type ProductSchemaType = z.infer<typeof ProductSchema>;
