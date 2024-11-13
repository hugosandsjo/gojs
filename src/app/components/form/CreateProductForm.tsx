"use client";

import { createProduct } from "@/lib/actions";
import Link from "next/link";
import Dropzone from "@/app/components/form/DropZone";
import Button from "@/app/components/buttons/Button";
import TextField from "@/app/components/form/TextField";
import TextArea from "@/app/components/form/TextArea";
import Dropdown from "@/app/components/form/Dropdown";
import NumberPicker from "@/app/components/form/NumberPicker";
import { useFormState } from "react-dom";
import { DealFormState, StringMap } from "@/lib/types";
import H3 from "@/app/components/typography/H3";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import { toast } from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";
import DropdownStatus from "@/app/components/form/DropDownStatus";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { bytesToMB } from "@/lib/utils";
import BackButton from "@/app/components/buttons/BackButton";
import H2 from "@/app/components/typography/H2";
import AlertModal from "@/app/components/AlertModal";
import { useRouter } from "next/navigation";

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
  const [isDisabled, setIsDisabled] = useState(false);

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

  const showAlert = () => {
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
      <section className="flex flex-col gap-10 max-w-screen-lg">
        <div className="flex justify-between w-full">
          <BackButton size={12} />
          <H2>Create Product</H2>
          <div></div>
        </div>
        <form
          action={handleFormAction}
          className="flex flex-col gap-8 py-14 px-20 border border-black rounded-xl"
        >
          <input type="hidden" name="userId" value={userId} />
          <H3>INFO</H3>
          <section className="flex flex-wrap gap-4 w-full">
            <article className="w-full flex gap-6">
              {" "}
              <div className="flex flex-col gap-2 w-2/3">
                <TextField
                  title="Title"
                  name="title"
                  placeholder="Choose a title"
                  type="text"
                  error={serverState.errors?.title}
                />{" "}
                <div className="flex gap-4">
                  <NumberPicker
                    title="Quantity"
                    name="quantity"
                    error={serverState.errors?.quantity}
                  />
                  <TextField
                    title="Price"
                    name="price"
                    placeholder="kr"
                    type="text"
                    error={serverState.errors?.price}
                  />
                  <DropdownStatus
                    title="Status"
                    name="status"
                    defaultValue="Draft"
                    error={serverState.errors?.status}
                  />
                </div>
              </div>
              <div className="w-1/3">
                <Dropdown
                  title="Category"
                  name="category"
                  error={serverState.errors?.category}
                />
              </div>
            </article>

            <div className="w-full flex gap-4"></div>
          </section>
          <H3>PROPERTIES</H3>
          <section className="flex gap-4">
            <article className="flex gap-4">
              <TextField
                title="Height"
                name="height"
                placeholder="mm"
                type="text"
                error={serverState.errors?.height}
              />
              <TextField
                title="Width"
                name="width"
                placeholder="mm"
                type="text"
                error={serverState.errors?.width}
              />
            </article>
            <article className="flex gap-4">
              <TextField
                title="Depth"
                name="depth"
                placeholder="mm"
                type="text"
                error={serverState.errors?.depth}
              />
              <TextField
                title="Weight"
                name="weight"
                placeholder="kg"
                type="text"
                error={serverState.errors?.weight}
              />
            </article>
          </section>
          <div className="flex flex-col w-full">
            <TextArea
              title="Description"
              name="description"
              placeholder="Write something about your artwork"
              error={serverState.errors?.description}
            />
          </div>

          <div>
            <label>
              <div className="flex justify-between">
                <div>Select Images</div>
                <div>Max {bytesToMB(MAX_FILE_SIZE)}</div>
              </div>
              <Dropzone onFilesChange={handleFilesChange} />
            </label>
            {serverState.errors?.images && (
              <p className="text-red-500">{serverState.errors.images}</p>
            )}

            {(serverState.errors ?? {})["images[0].image_key"] && (
              <p className="text-red-500">
                {(serverState.errors ?? {})["images[0].image_key"]}
              </p>
            )}
          </div>

          <div className="flex gap-4 justify-end">
            {/* <Link href="/dashboard"> */}
            {/* <Button type="button" onclick={showAlert}>
                Cancel
              </Button> */}
            <button type="button" onClick={showAlert}>
              Cancel
            </button>
            {/* </Link> */}
            <SubmitButton />
          </div>

          {serverState.errors?.general && (
            <p className="text-red-500">{serverState.errors.general}</p>
          )}
        </form>
      </section>
    </>
  );
}
