type TextAreaProps = {
  title: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  error?: string;
};

export default function TextArea({
  title,
  defaultValue,
  error,
  name,
  placeholder,
}: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{title}:</label>
      <textarea
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`border p-2 min-h-52 ${
          error ? "border-red-500" : "border-black"
        }`}
      />
    </div>
  );
}
