
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChatMessageBubble } from "./ChatMessageBubble";
import { ChatMessageTime } from "./ChatMessageTime";

export interface ChatMessageType {
  id: string;
  content: string;
  sender: string;
  senderInitials: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div
      className={`flex items-start gap-3 ${
        message.isCurrentUser ? "justify-end" : ""
      }`}
    >
      {!message.isCurrentUser && (
        <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-sm">
          {message.senderInitials}
        </div>
      )}
      
      <div className="max-w-[70%]">
        <ChatMessageBubble 
          content={message.content} 
          isCurrentUser={message.isCurrentUser} 
        />
        <ChatMessageTime 
          timestamp={message.timestamp} 
          isCurrentUser={message.isCurrentUser} 
        />
      </div>
      
      {message.isCurrentUser && (
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-purple-600 text-white text-xs">
            {message.senderInitials}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
