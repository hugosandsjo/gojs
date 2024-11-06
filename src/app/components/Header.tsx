import { SignOut } from "@/app/components/buttons/SignOut";
import NavbarParagraph from "@/app/components/typography/NavbarParagraph";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <>
      <header className="flex justify-between items-center py-6 px-6 ">
        <div className="flex flex-col">
          <Link href={"/shop"}>
            {" "}
            <NavbarParagraph>Shop</NavbarParagraph>
          </Link>
          {session ? (
            <Link href={"/dashboard"}>
              {" "}
              <NavbarParagraph>Dashboard</NavbarParagraph>{" "}
            </Link>
          ) : null}
        </div>
        <Link href={"/"}>
          <h1 className="text-6xl font-serif">Gojs</h1>
        </Link>

        {session ? (
          <SignOut />
        ) : (
          <Link href={"/signin"}>
            {" "}
            <NavbarParagraph>Login </NavbarParagraph>
          </Link>
        )}
      </header>
    </>
  );
}
