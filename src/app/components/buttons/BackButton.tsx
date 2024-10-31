import Image from "next/image";
import Link from "next/link";
type BackButtonProps = {};

export default function BackButton() {
  return (
    <>
      <div className="flex justify-center items-center hover:opacity-50 px-3 py-2">
        <Link href="/dashboard">
          {" "}
          <Image src="/images/back.svg" alt="Back" width={16} height={16} />
        </Link>
      </div>
    </>
  );
}
