"use client"
import { useViewerToken } from "@/hooks/use-viewer-token"
import { Stream, User } from "@prisma/client"

interface StreamPlayerProps {
    user: User & {stream: Stream | null}
    stream: Stream
    isFollowing: boolean
}

const StreamPlayer = ({user, stream, isFollowing}:StreamPlayerProps) => {

    const { token, identity, name } = useViewerToken(user.id)

    if(!token || !name || !identity) {
        return (
            <div>
                Cannot watch the stream
            </div>
        )
    }

  return (
    <div>
        Allowed to watch the stream
    </div>
  )
}

export default StreamPlayer