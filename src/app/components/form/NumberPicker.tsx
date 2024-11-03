type NumberPickerProps = {
  title: string;
  name: string;
  defaultValue?: string | number;
  error?: string;
};

export default function NumberPicker({
  title,
  defaultValue,
  error,
  name,
}: NumberPickerProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{title}</label>
      <input
        type="number"
        name={name}
        id={name}
        min="0"
        defaultValue={defaultValue ? defaultValue : 1}
        className={`border px-3 py-2 ${
          error ? "border-red-500" : "border-black"
        }`}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
