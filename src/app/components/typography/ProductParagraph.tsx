type ProductParagraphProps = {
  children: React.ReactNode;
};

export default function ProductParagraph({ children }: ProductParagraphProps) {
  return (
    <>
      <p className="text-xs">{children}</p>
    </>
  );
}
