type ButtonProps = {
  children: React.ReactNode;
  type: "submit" | "reset" | "button";
};

export default function Button({ children, type }: ButtonProps) {
  return (
    <button
      type={type}
      className="py-4 px-6 border border-black hover:text-white hover:bg-black hover:border-green-800 hover:shadow-lg"
    >
      {children}
    </button>
  );
}
