"use client";
import H2 from "@/app/components/typography/H2";
import { Audio } from "react-loader-spinner";

export default function Loading() {
  return (
    <main className="text-center">
      <H2>Loading...</H2>
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
      />
    </main>
  );
}
