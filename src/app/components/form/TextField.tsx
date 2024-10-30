import { capitalizeFirstLetter } from "@/lib/utils";

type TextFieldProps = {
  title: string;
  defaultValue?: string | number;
};

export default function TextField({ title, defaultValue }: TextFieldProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={title}>{capitalizeFirstLetter(title)}:</label>
      <input
        type="text"
        name={title}
        id={title}
        defaultValue={defaultValue}
        required
        className="border border-black p-2"
      />
    </div>
  );
}
