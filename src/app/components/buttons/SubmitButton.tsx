"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={`py-4 px-6 border border-black hover:text-white hover:shadow-lg ${
        pending
          ? "bg-gray-300 opacity-30"
          : "bg-black text-white hover:bg-black"
      }`}
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
}
