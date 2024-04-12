"use client";

import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { onFollow, onUnfollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
  isFollowing: boolean;
  isHost: boolean;
  hostIdentity: string;
}

const Actions = ({ hostIdentity, isFollowing, isHost }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { userId } = useAuth();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(`You are now following ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(`You have unfollowed ${data.following.username}`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const toggleFollow = () => {
    // if not login
    if (!userId) {
      return router.push("/sign-in");
    }
    // not following ourselves
    if (isHost) return;

    // follow / unfollow
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      onClick={toggleFollow}
      disabled={isPending || isHost}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn("h-4 w-4 mr-2", isFollowing ? "fill-white" : "fill-none")}
      />
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default Actions;

export const ActionSkeleton = () => {
  return <Skeleton className="h-10 w-full lg:w-24" />;
};
