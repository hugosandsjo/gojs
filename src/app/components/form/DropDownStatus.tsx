import { capitalizeFirstLetter } from "@/lib/utils";

type DropdownProps = {
  title: string;
  name: string;
  defaultValue?: string | number;
  error?: string;
};

const statusOptions = ["DRAFT", "PUBLISHED", "ARCHIVED"]; //Hardcoded for now

export default function DropdownStatus({
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
        className={`border py-3.5 px-6 ${
          error ? "border-red-500" : "border-black"
        }`}
      >
        {statusOptions.map((formStatus) => (
          <option key={formStatus} value={formStatus}>
            {capitalizeFirstLetter(formStatus.toLowerCase())}{" "}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
