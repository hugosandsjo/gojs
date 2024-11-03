type TextFieldProps = {
  title: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  error?: string;
};

export default function TextField({
  title,
  defaultValue,
  error,
  name,
  placeholder,
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{title}:</label>
      <input
        type="text"
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`border px-3 py-2 ${
          error ? "border-red-500" : "border-black"
        }`}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
