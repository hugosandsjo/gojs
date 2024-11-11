"use client";
import H2 from "@/app/components/typography/H2";
import NavbarParagraph from "@/app/components/typography/NavbarParagraph";
import { Audio } from "react-loader-spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <main className="text-center">
      <H2>Loading...</H2>
      <NavbarParagraph>Hopefully done soon</NavbarParagraph>
      <main className="text-center">
        <H2>Loading...</H2>
        <Audio
          height="80"
          width="80"
          radius="9"
          color="blue"
          ariaLabel="loading"
        />
      </main>
    </main>
  );
}
