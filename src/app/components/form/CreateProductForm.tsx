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

type CreateProductFormProps = {
  userId: string;
};

export default function CreateProductForm({ userId }: CreateProductFormProps) {
  return (
    <>
      <section className="flex gap-4 justify-between">
        <Link href="/dashboard">
          <Button type="button">Back</Button>
        </Link>
        <H2>Create Product</H2>
      </section>

      <form
        action={createProduct}
        className="flex flex-col gap-8 py-8 p-14 border border-black"
      >
        <input type="hidden" name="userId" value={userId} />

        <section className="flex gap-4">
          <div className="flex flex-col w-1/2 gap-4">
            <TextField title="title" />
            <TextField title="price" />
            <NumberPicker title="quantity" />
          </div>
          <div className="flex flex-col w-1/2 gap-4">
            <Dropdown title="category" />
            <NumberPicker title="Available stock" />
          </div>
          <section className="flex gap-4">
            <article className="flex flex-col gap-4">
              <TextField title="height" />
              <TextField title="width" />
            </article>
            <article className="flex flex-col gap-4">
              <TextField title="depth" />
              <TextField title="weight" />
            </article>
          </section>
        </section>

        <div className="flex flex-col max-w-md">
          <TextArea title="description" />
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
      </form>
    </>
  );
}
