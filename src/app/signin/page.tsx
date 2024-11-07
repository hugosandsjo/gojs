"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TextField from "@/app/components/form/TextField";
import { useFormState } from "react-dom";
import { loginAction } from "@/lib/actions";
import { LoginFormState } from "@/lib/types";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import BackButton from "@/app/components/buttons/BackButton";

const initialState = {
  errors: {},
  success: false,
};

export default function SignInPage() {
  const router = useRouter();
  const [serverState, formAction] = useFormState<LoginFormState, FormData>(
    loginAction,
    initialState
  );

  useEffect(() => {
    if (serverState.success) {
      router.push("/dashboard");
    }
  }, [serverState.success, router]);

  return (
    <section className="flex justify-center h-full">
      <div className="flex flex-col items-center gap-2 p-32 border border-black">
        <BackButton size={16} />
        <form action={formAction}>
          <div className="flex flex-col gap-4">
            <TextField
              title="Email"
              name="email"
              type="email"
              error={serverState.errors?.email?.[0]}
            />

            <TextField
              title="Password"
              name="password"
              type="password"
              error={serverState.errors?.password?.[0]}
            />
            <SubmitButton></SubmitButton>
          </div>
        </form>
      </div>
    </section>
  );
}
