import { capitalizeFirstLetter } from "@/lib/utils";

type DropdownProps = {
  title: string;
  defaultValue?: string | number;
};

const categories = ["Painting", "Sculpture", "Digital Art"]; //Hardcoded for now

export default function Dropdown({ title, defaultValue }: DropdownProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={title}>{capitalizeFirstLetter(title)}</label>
      <select
        name={title}
        id={title}
        required
        defaultValue={defaultValue}
        className="border border-black p-2.5"
      >
        <option value="">Select Category</option>
        {categories.map((formCategory) => (
          <option key={formCategory} value={formCategory}>
            {formCategory}
          </option>
        ))}
      </select>
    </div>
  );
}
