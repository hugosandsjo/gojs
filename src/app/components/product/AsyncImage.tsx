"use client";

import Image from "next/image";
import { useState } from "react";

type AsyncImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
};

export default function AsyncImage({
  src,
  alt,
  fill,
  className,
  sizes,
}: AsyncImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && (
        <div className={`animate-pulse bg-gray-200 rounded absolute inset-0`} />
      )}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        sizes={sizes}
        onLoad={() => setIsLoading(false)}
      />
    </>
  );
}
