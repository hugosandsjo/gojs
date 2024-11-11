import { UserRoundPen } from "lucide-react";

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
      <article className="flex">
        <UserRoundPen size={40} />
      </article>
    </>
  );
}
