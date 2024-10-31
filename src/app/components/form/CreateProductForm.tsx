"use client";

import { createProduct } from "@/lib/actions";
import Link from "next/link";
import Dropzone from "@/app/components/DropZone";
import Button from "@/app/components/buttons/Button";
import H2 from "@/app/components/typography/H2";
import TextField from "@/app/components/form/TextField";
import TextArea from "@/app/components/form/TextArea";
import Dropdown from "@/app/components/form/Dropdown";
import NumberPicker from "@/app/components/form/NumberPicker";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { DealFormState, StringMap } from "@/lib/types";
import { useRouter } from "next/navigation";

type CreateProductFormProps = {
  userId: string;
};

const initialState: DealFormState<StringMap> = {};

export default function CreateProductForm({ userId }: CreateProductFormProps) {
  const router = useRouter();
  const [serverState, formAction] = useFormState(createProduct, initialState);

  useEffect(() => {
    console.log(serverState);

    if (serverState.success) {
      router.push("/dashboard");
    }
  }, [serverState, router]);

  return (
    <>
      <section className="flex gap-4 justify-between">
        <Link href="/dashboard">
          <Button type="button">Back</Button>
        </Link>
        <H2>Create Product</H2>
      </section>

      <form action={formAction}>
        <input type="hidden" name="userId" value={userId} />

        <section className="flex gap-4">
          <div className="flex flex-col w-1/2 gap-4">
            <TextField
              title="Title"
              name="title"
              error={serverState.errors?.title}
            />
            <TextField
              title="Price"
              name="price"
              error={serverState.errors?.price}
            />
            <NumberPicker
              title="Quantity"
              name="quantity"
              error={serverState.errors?.quantity}
            />
          </div>
          <div className="flex flex-col w-1/2 gap-4">
            <Dropdown
              title="Category"
              name="category"
              error={serverState.errors?.category}
            />
            <NumberPicker
              title="Available Stock"
              name="available_stock" // Use underscore to match Zod schema
              error={serverState.errors?.available_stock}
            />
          </div>
          <section className="flex gap-4">
            <article className="flex flex-col gap-4">
              <TextField
                title="Height"
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
        </section>

        <div className="flex flex-col max-w-md">
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

        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button type="button">Cancel</Button>
          </Link>
          <Button type="submit">Create Product</Button>
        </div>

        {/* Display general errors */}
        {serverState.errors?.general && (
          <p className="text-red-500">{serverState.errors.general}</p>
        )}
      </form>
    </>
  );
}
