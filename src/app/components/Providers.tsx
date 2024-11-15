"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children} <Toaster position="top-center" />
    </SessionProvider>
  );
}
