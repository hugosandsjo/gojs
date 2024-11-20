import { Eye } from "lucide-react";
import Link from "next/link";

interface PreviewButtonProps {
  id: string;
}

export default function PreviewtButton({ id }: PreviewButtonProps) {
  return (
    <Link href={`/shop/${id}`}>
      <button className="p-2 rounded bg-white hover:text-white shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] hover:shadow-lg hover:bg-gray-100">
        <Eye className="w-5 h-5 text-gray-600" />
      </button>
    </Link>
  );
}
