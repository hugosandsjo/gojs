import crypto from "crypto";
import { IMGIX_DOMAIN } from "@/lib/config";
import { twMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";
import { ZodError } from "zod";
import { StringMap } from "@/lib/types";

// Creates random image name
export const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// Create imgixUrl
export function getImgixUrl(
  key: string,
  params: Record<string, string> = {}
): string {
  const url = new URL(`https://${IMGIX_DOMAIN}/${key}`);

  // Append transformation parameters to the URL
  Object.entries(params).forEach(([param, value]) => {
    url.searchParams.append(param, value);
  });

  return url.toString();
}

// Tailwind function
export function cn(...inputs: ClassValue[]) {
  twMerge(clsx(inputs));
}

// Captilize first letter
export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}
// Convert ZOD-errors
export const convertZodErrors = (error: ZodError): StringMap => {
  return error.errors.reduce((acc: StringMap, issue) => {
    const key = issue.path.join("."); // Join path elements to capture nested errors
    acc[key] = issue.message;
    return acc;
  }, {});
};

export function truncateText(text: string | null, maxLength: number): string {
  if (!text) return ""; // Return an empty string if text is null
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
