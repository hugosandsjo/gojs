import crypto from "crypto";
import { IMGIX_DOMAIN } from "@/lib/config";

export const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

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
