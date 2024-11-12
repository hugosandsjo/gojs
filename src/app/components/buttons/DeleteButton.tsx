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
    <>
      <button
        onClick={handleDeleteClick}
        disabled={isDeleting}
        className="py-4 px-6 border border-black hover:text-white hover:bg-red-600 hover:shadow-lg hover:border-red-600 rounded-xl"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
}
