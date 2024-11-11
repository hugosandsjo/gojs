"use client";

import { UserRoundPen } from "lucide-react";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  role: string;
};

type UserEditProps = {
  user: User;
};

export default function UserEdit({ user }: UserEditProps) {
  return (
    <article className="flex flex-col">
      <UserRoundPen size={40} />
    </article>
  );
}
