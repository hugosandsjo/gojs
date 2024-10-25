"use client";
import { deleteProduct } from "@/lib/actions";
import { useState } from "react";

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteClick = async () => {
    try {
      setIsDeleting(true);
      setError(null);

      if (window.confirm("Are you sure you want to delete this product?")) {
        await deleteProduct(id);
      }
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
