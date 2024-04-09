"use client";

import { ReceivedChatMessage } from "@livekit/components-react";
import ChatMessage from "./chat-message";

interface ChatList {
  messages: ReceivedChatMessage[];
  isHidden: boolean;
}

const ChatList = ({ isHidden, messages }: ChatList) => {
  if (isHidden || !messages || messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          {isHidden ? "Chat is disabled" : "Wellcome to the chat"}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-auto p-3 h-full">
      {messages.map((messageEl) => (
        <ChatMessage key={messageEl.timestamp} data={messageEl} />
      ))}
    </div>
  );
};

export default ChatList;
