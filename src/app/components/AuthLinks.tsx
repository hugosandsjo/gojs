"use client";

import { useSession } from "next-auth/react";
import NavbarParagraph from "@/app/components/typography/NavbarParagraph";
import Link from "next/link";

export default function AuthLinks() {
  const { data: session } = useSession();

  return (
    <div className="text-right">
      {session ? (
        <Link href="/dashboard">
          <NavbarParagraph>Dashboard</NavbarParagraph>
        </Link>
      ) : (
        <Link href="/signin">
          <NavbarParagraph>Login</NavbarParagraph>
        </Link>
      )}
    </div>
  );
}
