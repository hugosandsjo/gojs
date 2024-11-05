import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/lib/auth";
import { AuthError } from "next-auth";
import Button from "@/app/components/buttons/Button";
import { SIGNIN_ERROR_URL } from "@/lib/config";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="flex flex-col gap-2 bg-slate-400 p-20">
      <form
        action={async (formData) => {
          "use server";
          try {
            await signIn("credentials", formData);
          } catch (error) {
            if (error instanceof AuthError) {
              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
            }
            throw error;
          }
        }}
      >
        {/* <TextField name="email" title="Email" /> */}
        <label htmlFor="email">
          Email
          <input name="email" id="email" />
        </label>
        {/* <TextField name="password" title="Password " /> */}
        <label htmlFor="password">
          Password
          <input name="password" id="password" />
        </label>
        <Button type="submit">Sign in</Button>
        {/* <input type="submit" value="Sign In" /> */}
      </form>
      {Object.values(providerMap).map((provider) => (
        <form
          key={provider.id}
          action={async () => {
            "use server";
            try {
              await signIn(provider.id, {
                redirectTo: props.searchParams?.callbackUrl ?? "",
              });
            } catch (error) {
              // Signin can fail for a number of reasons, such as the user
              // not existing, or the user not having the correct role.
              // In some cases, you may want to redirect to a custom error
              if (error instanceof AuthError) {
                return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`);
              }

              // Otherwise if a redirects happens Next.js can handle it
              // so you can just re-thrown the error and let Next.js handle it.
              // Docs:
              // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
              throw error;
            }
          }}
        >
          <button type="submit">
            <span>
              <Button type="button">Sign in with {provider.name}</Button>{" "}
            </span>
          </button>
        </form>
      ))}
      <form
        action={async (formData) => {
          "use server";
          await signIn("resend", formData);
        }}
      >
        <input type="text" name="email" placeholder="Email" />
        <button type="submit">Signin with Resend</button>
      </form>
    </div>
  );
}
