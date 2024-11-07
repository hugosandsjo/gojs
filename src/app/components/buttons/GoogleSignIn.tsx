import Button from "@/app/components/buttons/Button";
import { signIn } from "@/lib/auth";

export default function GoogleSignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit">Signin with Google</Button>
    </form>
  );
}
