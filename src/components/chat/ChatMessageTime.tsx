
import React from "react";

interface ChatMessageTimeProps {
  timestamp: Date;
  isCurrentUser: boolean;
}

export const ChatMessageTime = ({ timestamp, isCurrentUser }: ChatMessageTimeProps) => {
  return (
    <div className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? "text-right" : ""}`}>
      {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};
