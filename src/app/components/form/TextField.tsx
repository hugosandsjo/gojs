type TextFieldProps = {
  title: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  unitOfMeasure?: string;
  error?: string | string[];
  type: string;
};

export default function TextField({
  title,
  defaultValue,
  error,
  name,
  placeholder,
  unitOfMeasure,
  type,
}: TextFieldProps) {
  const errorMessage = Array.isArray(error) ? error[0] : error;
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between">
        <label htmlFor={name}>{title}</label>
        {unitOfMeasure ? (
          <p className="text-slate-500">{unitOfMeasure}</p>
        ) : null}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`border px-4 py-3 ${
          errorMessage ? "border-red-500" : "border-black"
        }`}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
