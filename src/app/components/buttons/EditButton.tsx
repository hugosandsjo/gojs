type EditButtonProps = {
  children: React.ReactNode;
};

export default function EditButton({ children }: EditButtonProps) {
  return (
    <button className="py-2 px-4 border border-black hover:text-white hover:bg-black hover:shadow-lg">
      {children}
    </button>
  );
}
