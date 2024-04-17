import { db } from "./db";

export const getUserByUserName = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      externalUserId: true,
      username: true,
      imageUrl: true,
      bio: true,
      stream: {
        select: {
          id: true,
          name: true,
          isLive: true,
          isChatEnabled: true,
          isChatDelayed: true,
          isChatFollowersOnly: true,
          thumbnailUrl: true,
        },
      },
      _count: {
        select: { followedBy: true },
      },
    },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
    include: { stream: true },
  });

  return user;
};
