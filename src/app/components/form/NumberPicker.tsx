import { capitalizeFirstLetter } from "@/lib/utils";

type NumberPickerProps = {
  title: string;
  defaultValue?: string | number;
};

export default function NumberPicker({
  title,
  defaultValue,
}: NumberPickerProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={title}>{capitalizeFirstLetter(title)}</label>
      <input
        type="number"
        name={title}
        id={title}
        defaultValue={defaultValue}
        className="border border-black p-2"
      />
    </div>
  );
}
