"use client";

import { updateProduct } from "@/lib/actions";
import Dropzone from "@/app/components/form/DropZone";
import { Product, Image, Category, ProductStatus } from "@prisma/client";
import { DealFormState, StringMap } from "@/lib/types";
import DeleteButton from "@/app/components/buttons/DeleteButton";
import H2 from "@/app/components/typography/H2";
import { getImgixUrl } from "@/lib/utils";
import { useMemo, useState, useCallback, useEffect } from "react";
import TextField from "@/app/components/form/TextField";
import TextArea from "@/app/components/form/TextArea";
import Dropdown from "@/app/components/form/Dropdown";
import NumberPicker from "@/app/components/form/NumberPicker";
import BackButton from "@/app/components/buttons/BackButton";
import DropdownStatus from "@/app/components/form/DropDownStatus";
import { useFormState } from "react-dom";
import { toast } from "react-hot-toast";
import { bytesToMB } from "@/lib/utils";
import { MAX_FILE_SIZE } from "@/lib/constants";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import H3 from "@/app/components/typography/H3";

type UpdateProductFormProps = {
  productId: string;
  userId: string;
  product: ProductWithImages;
  category: Category;
  status?: ProductStatus;
};

const initialState: DealFormState<StringMap> = {};

type ProductWithImages = Product & { images: Image[] };

export default function UpdateProductForm({
  productId,
  userId,
  product,
  category,
}: UpdateProductFormProps) {
  const updateProductWithId = useCallback(
    async (state: DealFormState<StringMap>, formData: FormData) => {
      return updateProduct(state, formData, productId);
    },
    [productId]
  );

  // Use the wrapped version in useFormState
  const [serverState, formAction] = useFormState(
    updateProductWithId,
    initialState
  );

  const [selectedFiles, setSelectedFiles] = useState<Map<string, File>>(
    new Map()
  );
  const [removedImages, setRemovedImages] = useState<Set<string>>(new Set());

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

  return (
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
        <input type="hidden" name="userId" value={userId} />
        <H3>INFO</H3>
        <section className="flex flex-wrap gap-4 w-full">
          <article className="w-full flex gap-6">
            <div className="flex flex-col gap-2 w-2/3">
              <TextField
                title="Title"
                name="title"
                type="text"
                defaultValue={product?.title || ""}
                error={serverState.errors?.title}
              />
              <div className="flex gap-4">
                <NumberPicker
                  title="Quantity"
                  name="quantity"
                  defaultValue={product?.quantity || ""}
                  error={serverState.errors?.quantity}
                />
                <TextField
                  title="Price"
                  name="price"
                  type="text"
                  defaultValue={product?.price || ""}
                  error={serverState.errors?.price}
                />
                <DropdownStatus
                  title="Status"
                  name="status"
                  defaultValue={product?.status || ""}
                  error={serverState.errors?.status}
                />
              </div>
            </div>

            <div className="w-1/3">
              <Dropdown
                title="Category"
                name="category"
                defaultValue={category.title}
                error={serverState.errors?.category}
              />
            </div>
          </article>
        </section>

        <p className="font-sans text-3xl">Properties</p>

        <section className="flex gap-4">
          <article className="flex gap-4">
            <TextField
              title="Height"
              name="height"
              type="text"
              defaultValue={product?.height || ""}
              error={serverState.errors?.height}
            />
            <TextField
              title="Width"
              name="width"
              type="text"
              defaultValue={product?.width || ""}
              error={serverState.errors?.width}
            />
          </article>
          <article className="flex gap-4">
            <TextField
              title="Depth"
              name="depth"
              type="text"
              defaultValue={product?.depth || ""}
              error={serverState.errors?.depth}
            />
            <TextField
              title="Weight"
              name="weight"
              type="text"
              defaultValue={product?.weight || ""}
              error={serverState.errors?.weight}
            />
          </article>
        </section>

        <div className="flex flex-col">
          <TextArea
            title="Description"
            name="description"
            defaultValue={product?.description || ""}
            error={serverState.errors?.description}
          />
        </div>

        <div>
          <label>
            <div className="flex justify-between">
              <div>Select Images</div>
              <div>Max {bytesToMB(MAX_FILE_SIZE)}</div>
            </div>
            <Dropzone
              defaultImages={defaultImages}
              onFilesChange={handleFilesChange}
              onImageRemove={handleImageRemove}
            />
          </label>
        </div>
        <div className="flex gap-4 justify-end">
          {product?.id && <DeleteButton id={product.id} />}
          <SubmitButton />
        </div>
      </form>
    </section>
  );
}
