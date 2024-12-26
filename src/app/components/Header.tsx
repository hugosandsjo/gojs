import { ActiveLink } from "./ActiveLink";
import Link from "next/link";
import { headers } from "next/headers";
import { unstable_noStore } from "next/cache";

export const dynamic = "force-dynamic";

export default async function Header() {
  unstable_noStore();
  headers();

  return (
    <header className="flex justify-between items-center py-6 px-8 md:px-20">
      <div className="flex flex-col">
        <ActiveLink href="/shop">Shop</ActiveLink>
        <ActiveLink href="/artists">Artists</ActiveLink>
      </div>
      <Link href="/">
        <h1 className="text-6xl font-serif">Gojs</h1>
      </Link>
      <div></div>
    </header>
  );
}
