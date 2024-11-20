import { ActiveLink } from "./ActiveLink";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Header() {
  headers();
  const session = await auth();

  return (
    <header className="flex justify-between items-center py-6 px-8 md:px-20">
      <div className="flex flex-col">
        <ActiveLink href="/shop">Shop</ActiveLink>
        <ActiveLink href="/artists">Artists</ActiveLink>
      </div>
      <Link href="/">
        <h1 className="text-6xl font-serif">Gojs</h1>
      </Link>
      <div className="text-right">
        {session ? (
          <ActiveLink href="/dashboard">Dashboard</ActiveLink>
        ) : (
          <ActiveLink href="/signin">Login</ActiveLink>
        )}
      </div>
    </header>
  );
}
