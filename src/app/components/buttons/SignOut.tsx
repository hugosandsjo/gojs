import { handleSignOut } from "@/lib/actions";
import NavbarParagraph from "@/app/components/typography/NavbarParagraph";
import Button from "@/app/components/buttons/Button";

export function SignOut() {
  return (
    <form action={handleSignOut}>
      <Button type="submit">
        <NavbarParagraph>Sign Out</NavbarParagraph>
      </Button>
    </form>
  );
}
