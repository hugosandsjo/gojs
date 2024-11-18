import { twMerge } from "tailwind-merge";

type NavbarParagraphProps = {
  children: React.ReactNode;
  className?: string;
};

export default function NavbarParagraph({
  children,
  className,
}: NavbarParagraphProps) {
  return (
    <>
      {/* <p className="text-sm hover:opacity-40">{children}</p> */}
      <p className={twMerge("text-sm hover:opacity-40", className)}>
        {children}
      </p>
    </>
  );
}
