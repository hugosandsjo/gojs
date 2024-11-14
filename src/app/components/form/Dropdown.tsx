import { CATEGORIES } from "@/lib/constants";

type DropdownProps = {
  title: string;
  name: string;
  defaultValue?: string | number;
  error?: string;
};

export default function Dropdown({
  title,
  defaultValue,
  error,
  name,
}: DropdownProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{title}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={`border py-3.5 px-6 max-w-80 ${
          error ? "border-red-500" : "border-black"
        }`}
      >
        <option value="">Select Category</option>
        {CATEGORIES.map((formCategory) => (
          <option key={formCategory} value={formCategory}>
            {formCategory}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
