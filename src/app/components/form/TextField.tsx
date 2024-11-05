type TextFieldProps = {
  title: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  unitOfMeasure?: string;
  error?: string;
};

export default function TextField({
  title,
  defaultValue,
  error,
  name,
  placeholder,
  unitOfMeasure,
}: TextFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <label htmlFor={name}>{title}</label>
        {unitOfMeasure ? (
          <p className="text-slate-500">{unitOfMeasure}</p>
        ) : null}
      </div>
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
