type H3Props = {
  children: React.ReactNode;
};

export default function H3({ children }: H3Props) {
  return (
    <>
      <h3 className="font-serif md:text-3xl">{children}</h3>
    </>
  );
}
