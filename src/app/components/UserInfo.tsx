type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
};

type UserInfoProps = {
  user: User;
};
export default function UserInfo({ user }: UserInfoProps) {
  return (
    <>
      <article className="flex flex-col">
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <p>{user?.role}</p>
      </article>
    </>
  );
}
