import { db } from "./db";
import { getSelf } from "./auth-service";

export const getSearch = async (term?: string) => {
  let userId;

  try {
    // log in users
    const self = await getSelf();
    userId = self.id;
  } catch (error) {
    // log out users
    userId = null;
  }

  let streams = [];

  if (userId) {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: { contains: term },
          },
          {
            user: {
              username: { contains: term },
            },
          },
        ],
      },
      select: {
        user: true,
        id: true,
        thumbnailUrl: true,
        isLive: true,
        name: true,
        updatedAt: true,
      },
      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  } else {
    streams = await db.stream.findMany({
      where: {
        OR: [
          {
            name: { contains: term },
          },
          {
            user: {
              username: { contains: term },
            },
          },
        ],
      },

      select: {
        user: true,
        id: true,
        thumbnailUrl: true,
        isLive: true,
        name: true,
        updatedAt: true,
      },

      orderBy: [{ isLive: "desc" }, { updatedAt: "desc" }],
    });
  }

  return streams;
};
