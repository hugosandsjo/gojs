type H3Props = {
  children: React.ReactNode;
};

export default function H3({ children }: H3Props) {
  return (
    <>
      <h3 className="font-serif text-2xl">{children}</h3>
    </>
  );
}
