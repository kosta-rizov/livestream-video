"use client";

import { useParticipants } from "@livekit/components-react";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import CommunityItem from "./community-item";
import { LocalParticipant, RemoteParticipant } from "livekit-client";

interface ChatCommunityProps {
  viewerName: string;
  hostName: string;
  isHidden: boolean;
}

const ChatCommunity = ({
  hostName,
  isHidden,
  viewerName,
}: ChatCommunityProps) => {
  const [value, setValue] = useState("");
  const participants = useParticipants();

  const [debounceValue, setDebounceValue] = useDebounceValue<string>(
    value,
    500
  );

  const onChangeHandler = (newValue: string) => {
    setValue(newValue);
  };

  const filterParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participantEl) => {
      const hostAsViewer = `host-${participantEl.identity}`;

      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participantEl);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);

    return deduped.filter((participantEl) => {
      return participantEl.name
        ?.toLowerCase()
        .includes(debounceValue.toLowerCase());
    });
  }, [participants, debounceValue]);

  if (isHidden) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChangeHandler(e.target.value)}
        placeholder="Search Community"
      />
      <ScrollArea className="gap-y-2 mt-4">
        <p className="hidden last:block text-muted-foreground text-center text-sm p-2">
          No results
        </p>
        {filterParticipants.map((participantEl) => (
          <CommunityItem
            key={participantEl.identity}
            hostName={hostName}
            viewerName={viewerName}
            participantName={participantEl.name}
            participantIdentity={participantEl.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
