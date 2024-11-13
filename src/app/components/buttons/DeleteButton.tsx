"use client";

import { deleteProduct } from "@/lib/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AlertModal from "@/app/components/AlertModal";

type DeleteButtonProps = {
  id: string;
};

export default function DeleteButton({ id }: DeleteButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      await deleteProduct(id);
      router.push("/dashboard");
    } catch (err) {
      setError("Failed to delete product");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const showAlert = () => {
    setAlertState({
      isOpen: true,
      title: "Delete Product",
      message: "Are you sure you want to delete this product?",
    });
  };

  const closeAlert = () => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  };
  return (
    <>
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        onConfirm={handleDelete}
        title={alertState.title}
        message={alertState.message}
      />
      <button
        onClick={showAlert}
        disabled={isDeleting}
        className="py-4 px-6 border border-black hover:text-white hover:bg-red-600 hover:shadow-lg hover:border-red-600 rounded-xl"
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </>
  );
}
