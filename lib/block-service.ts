import { db } from "./db";
import { getSelf } from "./auth-service";

//Check if we are blocked by user
export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otheruser = await db.user.findUnique({
      where: { id },
    });

    if (!otheruser) throw new Error("User not found");

    if (otheruser.id === self.id) return false;

    const exsistingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otheruser.id,
          blockedId: self.id,
        },
      },
    });

    return !!exsistingBlock;
  } catch (error) {
    return false;
  }
};

// Block user
export const blockUser = async (id: string) => {

    const self = await getSelf();
    
    if(self.id === id) throw new Error("Cannot block yourself")

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if(!otherUser) throw new Error("User not found")

    // check if already blocked the user
    const exsistingBlock = await db.block.findUnique({
        where:{
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })

    if(exsistingBlock) throw new Error("Alredy blocked")

    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id
        },
        include:{ blocked: true}
    })

    return block
}

// Unblock User
export const unblockUser = async (id: string) => {

    const self = await getSelf();

    if(self.id === id) throw new Error("Cannot unblock yourself")

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if(!otherUser) throw new Error("User not found")

    // check if we have block for this user
    const exsistingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId: {
                blockerId: self.id,
                blockedId: otherUser.id
            }
        }
    })

    if(!exsistingBlock) throw new Error("User not blocked")

    const unblock = await db.block.delete({
        where: {
            id: exsistingBlock.id
        },
        include: { blocked: true}
    })

    return unblock
}