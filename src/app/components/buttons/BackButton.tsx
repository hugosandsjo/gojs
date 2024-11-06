import Image from "next/image";

type BackButtonProps = {
  size: 12 | 16;
};

export default function BackButton({ size }: BackButtonProps) {
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "/";
    }
  };
  return (
    <>
      <div className="flex justify-center items-center hover:opacity-50 px-3 py-2">
        <button onClick={handleBack}>
          {" "}
          <Image src="/images/back.svg" alt="Back" width={size} height={size} />
        </button>{" "}
      </div>
    </>
  );
}
