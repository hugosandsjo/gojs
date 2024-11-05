import { signIn } from "@/lib/auth";
import NavbarParagraph from "@/app/components/typography/NavbarParagraph";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/dashboard" });
      }}
    >
      <button type="submit">
        {" "}
        <NavbarParagraph>Sign in</NavbarParagraph>
      </button>
    </form>
  );
}
