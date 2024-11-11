import { Pencil } from "lucide-react";

type EditButtonProps = {
  children?: React.ReactNode;
};

export default function EditButton({ children }: EditButtonProps) {
  return (
    <button className="p-2 rounded-full bg-white hover:text-white hover:bg-black hover:shadow-lg">
      <Pencil />
      {children}
    </button>
  );
}
