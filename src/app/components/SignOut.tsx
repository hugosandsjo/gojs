import { signOut } from "@/lib/auth";
import NavbarParagraph from "@/app/components/typography/NavbarParagraph";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/dashboard" });
      }}
    >
      <button type="submit">
        {" "}
        <NavbarParagraph>Sign Out </NavbarParagraph>
      </button>
    </form>
  );
}
