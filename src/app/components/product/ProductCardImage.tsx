"use client";

import Image from "next/image";

type ProductCardImageProps = {
  src: string;
  alt: string;
};

export default function ProductCardImage({ src, alt }: ProductCardImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      className="w-32 h-40 object-cover"
    />
  );
}
