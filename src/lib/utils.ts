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

// Format ZOD-errors
// export const convertZodErrors = (error: ZodError): StringMap => {
//   return error.issues.reduce((acc: { [key: string]: string }, issue) => {
//     acc[issue.path[0]] = issue.message;
//     return acc;
//   }, {});
// };

// convertZodErrors.ts
export const convertZodErrors = (error: ZodError): StringMap => {
  return error.errors.reduce((acc: StringMap, issue) => {
    const key = issue.path[0] as string;
    acc[key] = issue.message;
    return acc;
  }, {});
};
