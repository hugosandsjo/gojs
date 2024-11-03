type SingleProductParagraphProps = {
  children: React.ReactNode;
};

export default function SingleProductParagraph({
  children,
}: SingleProductParagraphProps) {
  return (
    <>
      <p className="text-sm">{children}</p>
    </>
  );
}
