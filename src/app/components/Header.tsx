import { SignOut } from "@/app/components/buttons/SignOut";
import NavbarParagraph from "@/app/components/typography/NavbarParagraph";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <header className="flex justify-between items-center py-6 px-16 ">
      <div className="flex flex-col">
        <Link href={"/shop"}>
          {" "}
          <NavbarParagraph>Shop</NavbarParagraph>
        </Link>
      </div>
      <Link href={"/"}>
        <h1 className="text-6xl font-serif">Gojs</h1>
      </Link>

      {session ? (
        <div className="text-right">
          <Link href={"/dashboard"}>
            {" "}
            <NavbarParagraph>Dashboard</NavbarParagraph>{" "}
          </Link>
          <SignOut />
        </div>
      ) : (
        <Link href={"/signin"}>
          {" "}
          <NavbarParagraph>Login</NavbarParagraph>
        </Link>
      )}
    </header>
  );
}
