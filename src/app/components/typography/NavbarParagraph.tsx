type NavbarParagraphProps = {
  children: React.ReactNode;
};

export default function NavbarParagraph({ children }: NavbarParagraphProps) {
  return (
    <>
      <p className="text-sm hover:opacity-40">{children}</p>
    </>
  );
}
