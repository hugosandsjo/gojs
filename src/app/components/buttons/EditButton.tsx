import { Pencil } from "lucide-react";

export default function EditButton() {
  return (
    <button className="p-2 rounded-full bg-white hover:text-white hover:bg-black hover:shadow-lg">
      <Pencil />
    </button>
  );
}
