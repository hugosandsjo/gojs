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
  const { fieldErrors, formErrors } = error.flatten();

  const errors: StringMap = {};

  // Map field errors
  Object.entries(fieldErrors).forEach(([key, messages]) => {
    if (messages && messages.length > 0) {
      errors[key] = messages[0];
    }
  });

  if (formErrors && formErrors.length > 0) {
    errors["general"] = formErrors[0];
  }

  return errors;
};

export function truncateText(text: string | null, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function bytesToMB(bytes: number): string {
  const megabytes = bytes / (1024 * 1024);
  return `${megabytes.toFixed(1)} MB`;
}

// export function saltAndHashPassword(password: string): string {
//   const salt = crypto.randomBytes(16).toString("hex");
//   const hash = crypto
//     .pbkdf2Sync(password, salt, 1000, 64, "sha512")
//     .toString("hex");
//   return `${salt}:${hash}`;
// }
