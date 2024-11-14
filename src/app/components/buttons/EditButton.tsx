import { Pencil } from "lucide-react";
import Link from "next/link";

type EditButtonProps = {
  id: string;
};

export default function EditButton({ id }: EditButtonProps) {
  return (
    <Link href={`/dashboard/${id}`}>
      <button className="p-2 rounded bg-white hover:text-white hover:bg-gray-100 hover:shadow-lg shadow-[0_4px_14px_0_rgb(0,0,0,0.2)]">
        <Pencil className="w-5 h-5 text-gray-600" />
      </button>
    </Link>
  );
}
