"use client";
import VerifiedMark from "../verified-mark";
import BioModel from "./bio-model";

interface AboutCardProps {
  hostName: string;
  viewIdentity: string;
  bio: string | null;
  followedByCount: number;
  hostIdentity: string;
}

const AboutCard = ({
  bio,
  followedByCount,
  hostIdentity,
  hostName,
  viewIdentity,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewIdentity === hostAsViewer;

  const followedByLabel = followedByCount === 1 ? "follower" : "followers";

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg">
            About {hostName}
            <VerifiedMark />
          </div>
          {isHost && <BioModel initialvalue={bio} />}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">
            {followedByCount} {followedByLabel}
          </span>
        </div>
        {bio || "No description."}
      </div>
    </div>
  );
};

export default AboutCard;
