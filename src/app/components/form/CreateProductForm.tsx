"use client";

import { createProduct } from "@/lib/actions";
import { useFormState } from "react-dom";
import { DealFormState, StringMap } from "@/lib/types";
import { toast } from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";
import BackButton from "@/app/components/buttons/BackButton";
import H2 from "@/app/components/typography/H2";
import AlertModal from "@/app/components/AlertModal";
import { useRouter } from "next/navigation";
import FormFields from "@/app/components/form/FormFields";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import Button from "@/app/components/buttons/Button";

type CreateProductFormProps = {
  userId: string;
};

const initialState: DealFormState<StringMap> = {};

export default function CreateProductForm({ userId }: CreateProductFormProps) {
  const router = useRouter();
  const [serverState, formAction] = useFormState(createProduct, initialState);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    if (serverState.errors) {
      Object.entries(serverState.errors).forEach(([field, message]) => {
        toast.error(`${field}: ${message}`);
      });
    }
  }, [serverState.errors, serverState.success]);

  const handleFilesChange = useCallback((files: File[]) => {
    setSelectedFiles(files);
  }, []);

  const handleFormAction = async (formData: FormData) => {
    const newFormData = new FormData();

    for (const [key, value] of formData.entries()) {
      if (key !== "images") {
        newFormData.append(key, value);
      }
    }
    selectedFiles.forEach((file) => {
      newFormData.append("images", file);
    });

    formAction(newFormData);
  };

  const showCancelAlert = () => {
    setAlertState({
      isOpen: true,
      title: "Confirm Navigation",
      message:
        "Are you sure you want to leave? Any unsaved changes will be lost.",
    });
  };

  const handleNavigate = () => {
    router.push("/dashboard");
  };

  const closeAlert = useCallback(() => {
    setAlertState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return (
    <>
      <AlertModal
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        onConfirm={handleNavigate}
        title={alertState.title}
        message={alertState.message}
      />
      <section className="flex flex-col gap-10 w-full">
        <div className="flex justify-between w-full">
          <BackButton size={12} />
          <H2>Create Product</H2>
          <div></div>
        </div>
        <form
          action={handleFormAction}
          className="flex flex-col gap-8 py-14 px-8 sm:px-8 md:px-20 border border-black rounded-xl max-w-4xl overflow-hidden"
        >
          <FormFields
            userId={userId}
            showCancelAlert={showCancelAlert}
            handleFilesChange={handleFilesChange}
            serverState={serverState}
          />
          <div className="flex justify-between">
            <Button type="button" onClick={showCancelAlert}>
              Cancel
            </Button>

            <div className="flex gap-4">
              <SubmitButton />
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
