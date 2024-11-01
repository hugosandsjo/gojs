"use client";

import { createProduct } from "@/lib/actions";
import Link from "next/link";
import Dropzone from "@/app/components/form/DropZone";
import Button from "@/app/components/buttons/Button";
import H2 from "@/app/components/typography/H2";
import TextField from "@/app/components/form/TextField";
import TextArea from "@/app/components/form/TextArea";
import Dropdown from "@/app/components/form/Dropdown";
import NumberPicker from "@/app/components/form/NumberPicker";
import { useFormState } from "react-dom";
import { DealFormState, StringMap } from "@/lib/types";
import BackButton from "@/app/components/buttons/BackButton";
import H3 from "@/app/components/typography/H3";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

type CreateProductFormProps = {
  userId: string;
};

const initialState: DealFormState<StringMap> = {};

export default function CreateProductForm({ userId }: CreateProductFormProps) {
  const [serverState, formAction] = useFormState(createProduct, initialState);

  useEffect(() => {
    if (serverState.errors) {
      Object.entries(serverState.errors).forEach(([field, message]) => {
        toast.error(`${field}: ${message}`);
      });
    }
  }, [serverState.errors, serverState.success]);

  return (
    <section className="flex flex-col gap-6">
      <section className="w-full flex gap-4 justify-between px-2">
        <BackButton />
        <H2>Create Product</H2>
        <div></div>
      </section>

      <form
        action={formAction}
        className="flex flex-col gap-8 py-8 p-14 border border-black"
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
                  error={serverState.errors?.price}
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
        {/* <div className="flex flex-col w-1/2 gap-4">
          <NumberPicker
            title="Available Stock"
            name="available_stock" // Use underscore to match Zod schema
            error={serverState.errors?.available_stock}
          />
        </div> */}
        <section className="flex gap-4">
          <article className="flex flex-col gap-4">
            <TextField
              title="Height (mm)"
              name="height"
              error={serverState.errors?.height}
            />
            <TextField
              title="Width"
              name="width"
              error={serverState.errors?.width}
            />
          </article>
          <article className="flex flex-col gap-4">
            <TextField
              title="Depth"
              name="depth"
              error={serverState.errors?.depth}
            />
            <TextField
              title="Weight"
              name="weight"
              error={serverState.errors?.weight}
            />
          </article>
        </section>
        <div className="flex flex-col w-full">
          <TextArea
            title="Description"
            name="description"
            error={serverState.errors?.description}
          />
        </div>

        <div>
          <label>
            Select Images:
            <Dropzone />
          </label>
        </div>

        <div className="flex gap-4 justify-end">
          <Link href="/dashboard">
            <Button type="button">Cancel</Button>
          </Link>
          <SubmitButton />
        </div>

        {serverState.errors?.general && (
          <p className="text-red-500">{serverState.errors.general}</p>
        )}
      </form>
    </section>
  );
}
