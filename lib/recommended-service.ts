import { db } from "@/lib/db";
import { getSelf } from "./auth-service";

export const getRecomended = async () => {
  let userId;

  try {
    const self = await getSelf();
    userId = self.id;
  } catch {
    userId = null;
  }

  let users = [];

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          // we should not be in recomended
          {
            NOT: {
              id: userId,
            },
          },
          // if we follow the user, not in recomended
          {
            NOT: {
              followedBy: {
                some: {
                  followerId: userId
                }
              }
            }
          },
          // the blocked user should not be in recomended
          {
            NOT: {
              blocking: {
                some: {
                  blockedId: userId
                }
              }
            }
          }
        ],
      },
      include: {
        stream: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    users = await db.user.findMany({
      include: {
        stream: true
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return users;
};
