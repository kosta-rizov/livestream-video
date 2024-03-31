import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/actions";

interface UsernamePageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UsernamePageProps) => {
  const user = await getUserByUserName(params.username);

  if (!user) notFound();

  const isFollowing = await isFollowingUser(user.id);

  return (
    <div className="">
      <p>{user.username}</p>
      <p>{user.id}</p>
      <p>{user.externalUserId}</p>
      <p>is following:{`${isFollowing}`}</p>

      <Actions userId={user.id} isFollowing={isFollowing} />
    </div>
  );
};

export default UserPage;
