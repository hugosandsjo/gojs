"use client";

import { useState } from "react";

type TextFieldProps = {
  title: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  error?: string | string[];
  type: string;
  unit?: string;
};

export default function TextField({
  title,
  defaultValue,
  error,
  name,
  placeholder,
  type,
  unit,
}: TextFieldProps) {
  const [value, setValue] = useState(defaultValue);
  const errorMessage = Array.isArray(error) ? error[0] : error;
  return (
    <div className="flex flex-col gap-1 min-w-0 w-full">
      <div className="flex justify-between">
        <label htmlFor={name}>{title}</label>
      </div>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={`border px-4 py-3 w-full ${
            errorMessage ? "border-red-500" : "border-black"
          } ${unit ? "pr-12" : ""}`}
        />
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {unit}
          </span>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
