"use client";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import ChatInfo from "./chat-info";

interface ChatFormProps {
  onSubmith: () => void;
  onChange: (value: string) => void;
  value: string;
  isFollowersOnly: boolean;
  isDelayed: boolean;
  isFollowing: boolean;
  isHidden: boolean;
}

const ChatForm = ({
  value,
  isDelayed,
  isFollowersOnly,
  isFollowing,
  isHidden,
  onChange,
  onSubmith,
}: ChatFormProps) => {

  const [isDelayBlocked, setIsDelayBlocked] = useState(false);

  const isFollowersOnlyAndNotFollowing = isFollowersOnly && !isFollowing;
  const isDisabled =
    isHidden || isDelayBlocked || isFollowersOnlyAndNotFollowing;

  const submithHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (!value) return;
    
    if (isDelayed && !isDelayBlocked) {
      setIsDelayBlocked(true);
      setTimeout(() => {
        setIsDelayBlocked(false);
        onSubmith();
      }, 3000);
    } else {
      onSubmith();
    }
  };

  if (isHidden) return null;

  return (
    <form
      className="flex flex-col items-center gap-y-4"
      onSubmit={submithHandler}
    >
      <div className="w-full">
        <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly} />
        <Input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          disabled={isDisabled}
          placeholder="Send a message"
          className={cn(
            "border-white/10",
            (isFollowersOnly || isDelayed) && "rounded-t-none border-t-0"
          )}
        />
      </div>
      <div className="ml-auto mr-4 mb-2">
        <Button variant="primary" type="submit" size="sm" disabled={isDisabled}>
          Chat
        </Button>
      </div>
    </form>
  );
};

export default ChatForm;

export const ChatFormSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-y-4 p-3">
      <Skeleton className="w-full h-10" />
      <div className="flex items-center gap-x-2 ml-auto">
        <Skeleton className="h-7 w-7" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
};
