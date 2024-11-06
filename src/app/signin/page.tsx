import { redirect } from "next/navigation";
import { signIn, providerMap } from "@/lib/auth";
import { AuthError } from "next-auth";
import Button from "@/app/components/buttons/Button";
import { SIGNIN_ERROR_URL } from "@/lib/config";

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <section className="flex justify-center h-full">
      <div className="flex flex-col items-center gap-2 p-20 border border-black ">
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
          {/* <label htmlFor="email">
          Email
          <input name="email" id="email" />
        </label>

        <label htmlFor="password">
          Password
          <input name="password" id="password" />
        </label>
        <Button type="submit">Sign in</Button> */}
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
            <Button type="submit">
              <span>Sign in with {provider.name}</span>
            </Button>
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

        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", formData);
          }}
        >
          <label>
            Email
            <input name="email" type="email" placeholder="enter email" />
          </label>
          <label>
            Password
            <input name="password" type="password" />
          </label>
          <button type="submit">Sign In</button>
        </form>
      </div>
    </section>
  );
}
