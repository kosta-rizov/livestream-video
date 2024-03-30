import { db } from "@/lib/db";

export const getRecomended = async () => {

  const users = await db.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};
