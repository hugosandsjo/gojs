import { capitalizeFirstLetter } from "@/lib/utils";

type TextAreaProps = {
  title: string;
  defaultValue?: string | number;
};

export default function TextArea({ title, defaultValue }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={title}>{capitalizeFirstLetter(title)}:</label>
      <textarea
        name={title}
        id={title}
        defaultValue={defaultValue}
        required
        className="border border-black p-2 min-h-52"
      />
    </div>
  );
}
