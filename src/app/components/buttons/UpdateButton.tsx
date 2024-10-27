"use client";
import { useState } from "react";
import { updateProduct } from "@/lib/actions";

type UpdateButtonProps = {
  id: string;
};

export default function UpdateButton({ id }: UpdateButtonProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateClick = async () => {
    try {
      setIsUpdating(true);
      setError(null);

      await updateProduct(id);
    } catch (err) {
      setError("Failed to update product");
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div>
      <button
        onClick={handleUpdateClick}
        disabled={isUpdating}
        className="px-4 py-2 bg-emerald-200 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
      >
        {isUpdating ? "Updating" : "Update"}
      </button>
      {error && <p className="text-sm mt-1">{error}</p>}
    </div>
  );
}
