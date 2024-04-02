"use client"
import { Button } from "@/components/ui/button"
import { onFollow, onUnfollow } from "@/actions/follow"
import { useTransition } from "react"
import { toast } from "sonner"
import { onBlock, onUnblock } from "@/actions/block"

interface ActionsProp {
    isFollowing: boolean
    userId: string
}

export const Actions = ({isFollowing, userId}: ActionsProp) => {

    const [ isPending, startTransition ] = useTransition()

    const OnFollowHandler = () => {
        startTransition(() => {
            onFollow(userId)
            .then((data) => toast.success(`You now following ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"))
        })
    }

    const OnUnfollowHandler = () => {
        startTransition(() => {
            onUnfollow(userId)
            .then((data) => toast.success(`You unfollowed ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"))
        })
    }

    const onClick = () => {
        if(isFollowing) {
            OnUnfollowHandler()
        } else {
            OnFollowHandler()
        }
    }

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
            .then((data) => toast.success(`Block the user ${data.blocked.username}`))
            .catch(() => toast.error("Something went wrong"))
        })
    }

  return (
    <>
    <Button 
        disabled={isPending}
        variant="primary"
        onClick={onClick}    
    >
        {isFollowing ? "Unfollow" : "Follow"}
    </Button>
    <Button 
        onClick={handleBlock}
        disabled={isPending}
        variant="primary"
    >
        Block
    </Button>
    </>
  )
}

