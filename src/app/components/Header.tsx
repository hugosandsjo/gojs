import SignIn from "@/app/components/SignIn";
import { SignOut } from "@/app/components/SignOut";
import NavbarParagraph from "@/app/components/typography/NavbarParagraph";
import { auth } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const session = await auth();
  return (
    <>
      <header className="flex justify-between items-center py-6 px-6 border-b-2 border-black">
        <div className="flex flex-col">
          <Link href={"/"}>
            <NavbarParagraph>Home</NavbarParagraph>{" "}
          </Link>
          <Link href={"/shop"}>
            {" "}
            <NavbarParagraph>Shop</NavbarParagraph>
          </Link>
          {session ? (
            <Link href={"/dashboard"}>
              {" "}
              <NavbarParagraph>Dashboard </NavbarParagraph>{" "}
            </Link>
          ) : null}

          {session ? <SignOut /> : <SignIn />}
        </div>
        <Link href={"/"}>
          <h1 className="text-6xl font-serif">Gojs</h1>
        </Link>
        <div className="flex">
          {" "}
          <p>Logo</p>
        </div>
      </header>
    </>
  );
}
