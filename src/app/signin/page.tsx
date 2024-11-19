import GoogleSignIn from "@/app/components/buttons/GoogleSignIn";
import SignInForm from "@/app/components/form/SignInForm";

export default function SignInPage() {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center gap-4 p-12 md:p-24 border border-black rounded-xl -mt-20">
        <SignInForm />
        <p>or</p>
        <GoogleSignIn />
      </div>
    </section>
  );
}
