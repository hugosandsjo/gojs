import { DealFormState, StringMap } from "@/lib/types";
import Dropzone from "@/app/components/form/DropZone";
import TextField from "@/app/components/form/TextField";
import TextArea from "@/app/components/form/TextArea";
import Dropdown from "@/app/components/form/Dropdown";
import NumberPicker from "@/app/components/form/NumberPicker";
import H3 from "@/app/components/typography/H3";
import DropdownStatus from "@/app/components/form/DropDownStatus";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { bytesToMB } from "@/lib/utils";

type FormFieldsProps = {
  userId: string;
  showCancelAlert?: () => void;
  showDeleteAlert?: () => void;
  handleFilesChange: (files: File[]) => void;
  defaultValues?: {
    title?: string | null;
    quantity?: number | null;
    price?: number | null;
    status?: string | null;
    category?: string | null;
    height?: number | null;
    width?: number | null;
    depth?: number | null;
    weight?: number | null;
    description?: string | null;
  };
  defaultImages?: Array<{ name: string; preview: string }>;
  onImageRemove?: (imageId: string) => void;
  productId?: string;
  serverState: DealFormState<StringMap>;
};

export default function FormFields({
  userId,
  handleFilesChange,
  defaultValues = {},
  defaultImages,
  onImageRemove,
  serverState,
}: FormFieldsProps) {
  const {
    title,
    quantity,
    price,
    status,
    category,
    height,
    width,
    depth,
    weight,
    description,
  } = defaultValues;

  return (
    <>
      <input type="hidden" name="userId" value={userId} />
      <H3>INFO</H3>
      <section className="flex flex-wrap gap-4 w-full">
        <article className="w-full flex flex-wrap gap-6">
          <div className="flex flex-col flex-wrap gap-2 w-full">
            <TextField
              title="Title"
              name="title"
              placeholder="Choose a title"
              type="text"
              defaultValue={title || ""}
              error={serverState.errors?.title}
            />
            <div className="flex flex-wrap gap-4">
              <TextField
                title="Price"
                name="price"
                placeholder="kr"
                type="text"
                defaultValue={price || ""}
                error={serverState.errors?.price}
              />
              <NumberPicker
                title="Quantity"
                name="quantity"
                defaultValue={quantity || ""}
                error={serverState.errors?.quantity}
              />
              <DropdownStatus
                title="Status"
                name="status"
                defaultValue={status || "Draft"}
                error={serverState.errors?.status}
              />
              <Dropdown
                title="Category"
                name="category"
                defaultValue={category || ""}
                error={serverState.errors?.category}
              />
            </div>

            {/* <div className="flex flex-wrap gap-4">
            
            </div> */}
          </div>
        </article>
      </section>

      <H3>PROPERTIES</H3>
      <section className="flex flex-wrap gap-4">
        <article className="flex flex-wrap gap-4">
          <TextField
            title="Height"
            name="height"
            placeholder="mm"
            type="text"
            defaultValue={height || ""}
            error={serverState.errors?.height}
          />
          <TextField
            title="Width"
            name="width"
            placeholder="mm"
            type="text"
            defaultValue={width || ""}
            error={serverState.errors?.width}
          />
        </article>
        <article className="flex gap-4">
          <TextField
            title="Depth"
            name="depth"
            placeholder="mm"
            type="text"
            defaultValue={depth || ""}
            error={serverState.errors?.depth}
          />
          <TextField
            title="Weight"
            name="weight"
            placeholder="kg"
            type="text"
            defaultValue={weight || ""}
            error={serverState.errors?.weight}
          />
        </article>
      </section>

      <div className="flex flex-col w-full">
        <TextArea
          title="Description"
          name="description"
          placeholder="Write something about your artwork"
          defaultValue={description || ""}
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
            onFilesChange={handleFilesChange}
            defaultImages={defaultImages}
            onImageRemove={onImageRemove}
          />
        </label>
        {serverState.errors?.images && (
          <p className="text-red-500">{serverState.errors.images}</p>
        )}
      </div>
      {serverState.errors?.general && (
        <p className="text-red-500">{serverState.errors.general}</p>
      )}
    </>
  );
}
