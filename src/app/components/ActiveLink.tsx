"use client";

import NavbarParagraph from "@/app/components/typography/NavbarParagraph";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export function ActiveLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = href === "/" ? segment === null : segment === href.slice(1);

  return (
    <Link href={href}>
      <NavbarParagraph
        className={isActive ? "underline underline-offset-4" : ""}
      >
        {children}
      </NavbarParagraph>
    </Link>
  );
}
