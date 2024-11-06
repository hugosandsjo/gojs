// app/signin/page.tsx
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export default function SignInPage() {
  return (
    <section className="flex justify-center h-full">
      <div className="flex flex-col items-center gap-2 p-20 border border-black">
        <form
          action={async (formData) => {
            "use server";

            const email = formData.get("email");
            const password = formData.get("password");

            try {
              const result = await signIn("credentials", {
                email,
                password,
                redirectTo: "/dashboard",
                redirect: true,
              });

              // Optional: handle the result
              console.log("Sign in result:", result);
            } catch (error) {
              if (error instanceof AuthError) {
                return redirect(`/signin?error=${error.type}`);
              }
              throw error;
            }
          }}
        >
          <div className="flex flex-col gap-4">
            <label className="flex flex-col">
              Email
              <input
                name="email"
                type="email"
                required
                className="border p-2"
              />
            </label>
            <label className="flex flex-col">
              Password
              <input
                name="password"
                type="password"
                required
                className="border p-2"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
