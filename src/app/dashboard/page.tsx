import { getUser } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  unstable_noStore();

  const session = await auth();

  const user = await getUser(session?.user?.id);

  if (!session) {
    redirect("/");
  }

  console.log(user);
  return (
    <>
      <h1 className="text-6xl font-serif">Dashboard</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
    </>
  );
}
