"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  size: 12 | 16;
};

export default function BackButton({ size = 12 }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 hover:underline"
    >
      <Image src="/images/back.svg" alt="Back" width={size} height={size} />
    </button>
  );
}
