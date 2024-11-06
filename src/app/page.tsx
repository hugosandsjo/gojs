import H2 from "@/app/components/typography/H2";
import Button from "@/app/components/buttons/Button";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex w-full justify-center items-center  h-96">
      <div className="flex flex-col items-center gap-4">
        <H2>Welcome to gojs</H2>
        <Link href="/signin">
          <Button type="button">Login</Button>
        </Link>
      </div>
    </section>
  );
}
