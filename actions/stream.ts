"use server";

import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";

export const updateStream = async (values: Partial<Stream>) => {
  try {
    const self = await getSelf();

    const selfStream = await db.stream.findUnique({
      where: { userId: self.id },
    });

    if (!selfStream) throw new Error("Stream not found");

    // values user to update to stream
    const validData = {
      name: values.name,
      isChatEnabled: values.isChatEnabled,
      isChatFollowersOnly: values.isChatFollowersOnly,
      isChatDelayed: values.isChatDelayed,
    };

    // update stream values
    const stream = await db.stream.update({
      where: { id: selfStream.id },
      data: { ...validData },
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);
    revalidatePath(`/u/${self.username}/chat`);

    return stream;
  } catch (error) {
    throw new Error("Internal Error");
  }
};
