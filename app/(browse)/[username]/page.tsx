import StreamPlayer from "@/components/stream-player";
import { isBlockedByUser } from "@/lib/block-service";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUserName } from "@/lib/user-service";
import { notFound } from "next/navigation";

interface UsernamePageProps {
  params: {
    username: string;
  };
}

const UserPage = async ({ params }: UsernamePageProps) => {
  
  const user = await getUserByUserName(params.username);

  if (!user || !user.stream) notFound();

  const isFollowing = await isFollowingUser(user.id);
  const isBlocked = await isBlockedByUser(user.id);

  if (isBlocked) notFound();

  return (
    <StreamPlayer user={user} stream={user.stream} isFollowing={isFollowing} />
  );
};

export default UserPage;
