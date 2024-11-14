// app/sign-in/error.tsx
"use client";

import { useEffect } from "react";

export default function SignInError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to your error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-red-600">
          {error.message || "Something went wrong while signing in!"}
        </h2>
        <button
          onClick={reset}
          className="rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
