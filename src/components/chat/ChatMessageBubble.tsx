
import React from "react";

interface ChatMessageBubbleProps {
  content: string;
  isCurrentUser: boolean;
}

export const ChatMessageBubble = ({ content, isCurrentUser }: ChatMessageBubbleProps) => {
  return (
    <div
      className={`p-3 rounded-lg ${
        isCurrentUser
          ? "bg-purple-500 text-white rounded-br-none"
          : "bg-gray-100 rounded-bl-none"
      }`}
    >
      <p className="text-sm whitespace-pre-line">{content}</p>
    </div>
  );
};
