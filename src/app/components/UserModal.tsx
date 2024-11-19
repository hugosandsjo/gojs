import { SignOut } from "@/app/components/buttons/SignOut";
import { User } from "@prisma/client";
import H2 from "@/app/components/typography/H3";
import H3 from "@/app/components/typography/H3";
import UserModalArticle from "@/app/components/UserModalArticle";

type UserInfoProps = {
  user: User;
};
export default function UserModal({ user }: UserInfoProps) {
  return (
    <section className="flex flex-col px-4 md:px-24 gap-20">
      <article className="flex flex-col md:flex-row gap-4 justify-between items-center w-full">
        <H2>Profile</H2>
        <SignOut />
        <div></div>
      </article>
      <article className="w-full flex flex-col gap-8 text-left">
        <UserModalArticle>
          <H3>Name</H3> <H3>{user?.name}</H3>
        </UserModalArticle>
        <UserModalArticle>
          <H3>Email</H3> <H3>{user?.email}</H3>
        </UserModalArticle>
        <UserModalArticle>
          <H3>Role</H3> <H3>{user?.role}</H3>
        </UserModalArticle>
        <UserModalArticle>
          <H3>Bio</H3> <H3>{user?.bio}</H3>
        </UserModalArticle>
        <UserModalArticle>
          <H3>Facebook</H3> <H3>{user?.facebook}</H3>
        </UserModalArticle>
        <UserModalArticle>
          <H3>Instagram</H3> <H3>{user?.instagram}</H3>
        </UserModalArticle>
        <UserModalArticle>
          <H3>Location</H3> <H3>{user?.location}</H3>
        </UserModalArticle>
      </article>
    </section>
  );
}
