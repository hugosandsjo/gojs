import { SignOut } from "@/app/components/buttons/SignOut";
import { User } from "@prisma/client";
import H2 from "@/app/components/typography/H3";
import H3 from "@/app/components/typography/H3";

type UserInfoProps = {
  user: User;
};
export default function UserInfo({ user }: UserInfoProps) {
  return (
    <section className="flex flex-col px-20 gap-20">
      <H2>Profile</H2>
      <article className="w-full flex flex-col gap-8 text-left">
        <div className="flex items-center justify-between">
          <H3>Name</H3> <H3>{user?.name}</H3>
        </div>
        <div className="flex items-center justify-between">
          <H3>Email</H3> <H3>{user?.email}</H3>
        </div>
        <div className="flex items-center justify-between">
          <H3>Role</H3> <H3>{user?.role}</H3>
        </div>
        <div className="flex items-center justify-between">
          <H3>Bio</H3> <H3>{user?.bio}</H3>
        </div>
        <div className="flex items-center justify-between">
          <H3>Facebook</H3> <H3>{user?.facebook}</H3>
        </div>
        <div className="flex items-center justify-between">
          <H3>Instagram</H3> <H3>{user?.instagram}</H3>
        </div>
        <div className="flex items-center justify-between">
          <H3>Location</H3> <H3>{user?.location}</H3>
        </div>
        {/* <SignOut /> */}
      </article>
    </section>
  );
}
