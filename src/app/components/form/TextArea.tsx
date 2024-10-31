type TextAreaProps = {
  title: string;
  name: string;
  defaultValue?: string | number;
  error?: string;
};

export default function TextArea({
  title,
  defaultValue,
  error,
  name,
}: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name}>{title}:</label>
      <textarea
        name={name}
        id={name}
        defaultValue={defaultValue}
        className={`border p-2 min-h-52 ${
          error ? "border-red-500" : "border-black"
        }`}
      />
    </div>
  );
}
