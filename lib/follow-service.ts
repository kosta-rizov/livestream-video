import { db } from "./db";
import { getSelf } from "./auth-service";

export const getFollowedUsers = async () => {

    try {
        const self = await getSelf();
        
        const followedUsers = db.follow.findMany({
            where: {
                followerId: self.id,
                // if some user block us dont show on our following list
                following: {
                    blocking: {
                        none: {
                            blockedId: self.id
                        }
                    }
                }
            },
            include: { 
                following: {
                    include: {
                        stream: {
                            select: {isLive: true}
                        }
                    }
                }  
            }
        })

        return followedUsers

    } catch (error) {
        return []
    }
        
}

export const isFollowingUser = async (id: string) => {

    try {
        const self = await getSelf()

        const otherUser = await db.user.findUnique({
            where: { id }
        })

        if(!otherUser) throw new Error("User not found")

        if(otherUser.id === self.id) return true

        const existingFollow = await db.follow.findFirst({
            where: {
                followerId: self.id,
                followingId: otherUser.id
            }
        })

        return !!existingFollow

    } catch (error) {
        return false
    }

}

export const followUser = async (id: string) => {

    const self = await getSelf();

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if(!otherUser) throw new Error("User not found")
    if(otherUser.id === self.id)  throw new Error("Cannot follow youreself")

    const exsistingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    })

    if(exsistingFollow) throw new Error("Alredy following")

    const follow = await db.follow.create({
        data: {
            followerId: self.id,
            followingId: otherUser.id
        },
        include: {
            follower: true,
            following: true
        }
    })

    return follow

}

export const unfollowUser = async (id: string) => {

    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if(!otherUser) throw new Error("User not found")
    if(otherUser.id === self.id) throw new Error("Cannot unfollow yourself")

    // check if user is following this user
    const exsistingFollow = await db.follow.findFirst({
        where: {
            followerId: self.id,
            followingId: otherUser.id
        }
    })
    if(!exsistingFollow) throw new Error("Not Following")

    // delete 
    const follow = await db.follow.delete({
        where: {
            id: exsistingFollow.id
        },
        include: { following: true }
    })    

    return follow

}