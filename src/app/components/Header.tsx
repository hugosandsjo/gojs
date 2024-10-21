import SignIn from "@/app/components/SignIn";
import Link from "next/link";

export default function Header() {
  console.log();
  return (
    <>
      <header className="flex justify-between bg-slate-400 py-6">
        <div className="flex flex-col">
          <Link href={"/"}>Home</Link>
          <Link href={"/shop"}>Shop</Link>
          <Link href={"/dashboard"}>Dashboard</Link>
          <Link href={"/about"}></Link>
          <SignIn />
        </div>
        <Link href={"/"}>
          <h1 className="text-6xl font-serif">Gojs app</h1>
        </Link>
        <div className="flex">
          {" "}
          <p>Logo</p>
        </div>
      </header>
    </>
  );
}
