type TextFieldProps = {
  title: string;
  name: string;
  defaultValue?: string | number;
  error?: string;
};

export default function TextField({
  title,
  defaultValue,
  error,
  name,
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{title}:</label>
      <input
        type="text"
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={`border p-2 ${error ? "border-red-500" : "border-black"}`}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
