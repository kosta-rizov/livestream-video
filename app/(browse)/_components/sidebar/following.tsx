"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Follow, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-Item";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null;
    };
  })[];
}

export const Following = ({ data }: FollowingProps) => {
  
  const { collapsed } = useSidebar();
  const router = useRouter()

  const isLiveStream = data.map(el => el.following.stream?.isLive)

  useEffect(() => {
    router.refresh()
  },[isLiveStream , router])

  if (!data) return null;

  return (
    <div>
      {!collapsed && data.length > 0 && (
        <div className="bl-6 mb-4">
          <p className="text-sm text-muted-foreground ml-6">Following</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  );
};

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 lg:pt-0">
      {[...Array(3)].map((_, index) => (
        <UserItemSkeleton key={index} />
      ))}
    </ul>
  );
};
