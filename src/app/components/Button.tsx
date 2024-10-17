type ButtonProps = {
  children: React.ReactNode;
};

export default function Button({ children }: ButtonProps) {
  return <button className="py-4 px-6 border border-black">{children}</button>;
}
