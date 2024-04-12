"use client";

import {
  useRemoteParticipant,
  useParticipants,
} from "@livekit/components-react";
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar";
import VerifiedMark from "../verified-mark";
import { UserIcon } from "lucide-react";
import Actions, { ActionSkeleton } from "./actions";
import { Skeleton } from "../ui/skeleton";

interface HeaderProps {
  hostName: string;
  viewIdentity: string;
  imageUrl: string;
  isFollowing: boolean;
  name: string;
  hostIdentity: string;
}

const Header = ({
  hostName,
  viewIdentity,
  imageUrl,
  isFollowing,
  hostIdentity,
  name,
}: HeaderProps) => {
  const participants = useParticipants(); // all participants
  const participant = useRemoteParticipant(hostIdentity); // strimer

  const isLive = !!participant;
  const participantCount = participants.length - 1; // - strimer

  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewIdentity === hostAsViewer;

  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4 gap-x-2">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          username={hostName}
          imageUrl={imageUrl}
          isLive={isLive}
          size="lg"
          showBage
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold">{hostName}</h2>
            <VerifiedMark />
          </div>
          <p className="text-sm font-semibold">{name}</p>
          {isLive ? (
            <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
              <UserIcon className="h-4 w-4" />
              <p>
                {participantCount}{" "}
                {participantCount === 1 ? "viewer" : "viewers"}
              </p>
            </div>
          ) : (
            <p className="font-semibold text-xs text-muted-foreground">
              Offline
            </p>
          )}
        </div>
      </div>

      <Actions
        isFollowing={isFollowing}
        isHost={isHost}
        hostIdentity={hostIdentity}
      />
    </div>
  );
};

export default Header;

export const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4 gap-x-2">
      <div className="flex items-center gap-x-2">
        <UserAvatarSkeleton />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <ActionSkeleton />
    </div>
  );
};
