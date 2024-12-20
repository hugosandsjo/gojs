import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
  className?: string;
  primary?: boolean;
  onClick?: () => void;
};

export default function Button({
  children,
  type,
  className,
  primary,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={twMerge(
        "py-4 px-6 border border-black hover:shadow-lg rounded-xl",
        primary
          ? "bg-green-300 text-black hover:bg-white hover:text-black"
          : "bg-white text-black hover:bg-black hover:text-white",
        className
      )}
    >
      {children}
    </button>
  );
}
