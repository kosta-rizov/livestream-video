import { db } from "./db";

export const getStreamByUserId = async (userId: string) => {
  const string = await db.stream.findUnique({
    where: { userId },
  });

  return string;
};
