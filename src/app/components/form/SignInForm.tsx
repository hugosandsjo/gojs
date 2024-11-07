"use client";

import TextField from "@/app/components/form/TextField";
import SubmitButton from "@/app/components/buttons/SubmitButton";
import { useFormState } from "react-dom";
import { loginAction } from "@/lib/actions";
import { LoginActionResponse } from "@/lib/types";

type SignInFormProps = {};

export default function SignInForm({}: SignInFormProps) {
  const [serverState, formAction] = useFormState<LoginActionResponse, FormData>(
    loginAction,
    { status: "error" }
  );
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-6">
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
        <SubmitButton />
      </div>
    </form>
  );
}
