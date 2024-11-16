import NavbarParagraph from "@/app/components/typography/NavbarParagraph";
import Link from "next/link";
import { auth } from "@/lib/auth";

export default async function Header() {
  const session = await auth();
  return (
    <header className="flex justify-between items-center py-6 px-8 md:px-12">
      <div className="flex flex-col">
        <Link href={"/shop"}>
          {" "}
          <NavbarParagraph>Shop</NavbarParagraph>
        </Link>
        <Link href={"/artists"}>
          <NavbarParagraph>Artists</NavbarParagraph>
        </Link>
      </div>
      <Link href={"/"}>
        <h1 className="text-6xl font-serif">Gojs</h1>
      </Link>
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
    </header>
  );
}
