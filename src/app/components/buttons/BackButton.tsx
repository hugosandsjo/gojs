import Image from "next/image";
import Link from "next/link";

type BackButtonProps = {
  destination: string;
  size: 12 | 16;
};

export default function BackButton({ size, destination }: BackButtonProps) {
  return (
    <>
      <div className="flex justify-center items-center hover:opacity-50 px-3 py-2">
        <Link href={destination}>
          {" "}
          <Image src="/images/back.svg" alt="Back" width={size} height={size} />
        </Link>
      </div>
    </>
  );
}
