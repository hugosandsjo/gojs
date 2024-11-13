"use client";

import { updateProduct } from "@/lib/actions";
import { Product, Image, Category } from "@prisma/client";
import { DealFormState, StringMap } from "@/lib/types";
import H2 from "@/app/components/typography/H2";
import { getImgixUrl } from "@/lib/utils";
import { useMemo, useState, useCallback, useEffect } from "react";
import BackButton from "@/app/components/buttons/BackButton";
import { useFormState } from "react-dom";
import { toast } from "react-hot-toast";
import FormFields from "@/app/components/form/FormFields";
import AlertModal from "@/app/components/AlertModal";
import { useRouter } from "next/navigation";
import DeleteButton from "@/app/components/buttons/DeleteButton";

type UpdateProductFormProps = {
  productId: string;
  userId: string;
  product: ProductWithImages;
  category: Category;
};

type ProductWithImages = Product & { images: Image[] };

const initialState: DealFormState<StringMap> = {};

export default function UpdateProductForm({
  productId,
  userId,
  product,
  category,
}: UpdateProductFormProps) {
  const router = useRouter();
  const updateProductWithId = useCallback(
    async (state: DealFormState<StringMap>, formData: FormData) => {
      return updateProduct(state, formData, productId);
    },
    [productId]
  );

  const [serverState, formAction] = useFormState(
    updateProductWithId,
    initialState
  );
  const [selectedFiles, setSelectedFiles] = useState<Map<string, File>>(
    new Map()
  );
  const [removedImages, setRemovedImages] = useState<Set<string>>(new Set());
  const [alertState, setAlertState] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  const defaultImages = useMemo(() => {
    return product?.images.map((img) => ({
      name: String(img.id),
      preview: getImgixUrl(img.image_key),
    }));
  }, [product]);

  useEffect(() => {
    if (serverState.errors) {
      Object.entries(serverState.errors).forEach(([field, message]) => {
        toast.error(`${field}: ${message}`);
      });
    }
  }, [serverState.errors]);

  const handleFilesChange = useCallback((files: File[]) => {
    setSelectedFiles((prev) => {
      const newMap = new Map(prev);
      files.forEach((file) => {
        const fileId = file.name;
        if (!newMap.has(fileId)) {
          newMap.set(fileId, file);
        }
      });
      return newMap;
    });
  }, []);

  const handleImageRemove = useCallback((imageId: string) => {
    setRemovedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(imageId);
      return newSet;
    });

    setSelectedFiles((prev) => {
      const newMap = new Map(prev);
      newMap.delete(imageId);
      return newMap;
    });
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

    removedImages.forEach((id) => {
      newFormData.append("removedImages", id);
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

  const showDeleteAlert = () => {
    // No need to handle deletion here anymore since DeleteButton handles it
    // Just pass the DeleteButton component where needed
    return <DeleteButton id={productId} />;
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
      <section className="flex flex-col gap-10">
        <section className="w-full flex justify-between px-2">
          <BackButton size={12} />
          <H2>Update product</H2>
          <div></div>
        </section>

        <form
          action={handleFormAction}
          className="flex flex-col gap-8 py-14 px-20 border rounded-xl border-black"
        >
          <FormFields
            userId={userId}
            showCancelAlert={showCancelAlert}
            showDeleteAlert={showDeleteAlert}
            handleFilesChange={handleFilesChange}
            defaultValues={{
              title: product?.title,
              quantity: product?.quantity,
              price: product?.price,
              status: product?.status,
              category: category.title,
              height: product?.height,
              width: product?.width,
              depth: product?.depth,
              weight: product?.weight,
              description: product?.description,
            }}
            defaultImages={defaultImages}
            onImageRemove={handleImageRemove}
            productId={productId}
            serverState={serverState}
          />
        </form>
      </section>
      <div className="flex gap-4">
        <button onClick={showCancelAlert}>Cancel</button>
        <DeleteButton id={productId} />
      </div>
    </>
  );
}
