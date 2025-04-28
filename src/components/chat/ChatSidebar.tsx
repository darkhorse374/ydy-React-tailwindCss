
import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatChannel {
  id: string;
  name: string;
  description?: string;
  unreadCount?: number;
  messages: any[];
}

interface ChatMember {
  id: string;
  name: string;
  isOwner: boolean;
}

interface ChatSidebarProps {
  channels: ChatChannel[];
  members: ChatMember[];
  selectedChannel: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onChannelClick: (channelId: string) => void;
  isMobileSheet?: boolean;
}

export const ChatSidebar = ({
  channels,
  members,
  selectedChannel,
  activeTab,
  setActiveTab,
  onChannelClick,
  isMobileSheet = false
}: ChatSidebarProps) => {
  return (
    <div className={`${isMobileSheet ? 'w-full h-full' : 'w-64'} bg-[#D3E4FD] flex-shrink-0 flex flex-col h-full`}>
      {isMobileSheet && (
        <div className="p-4 border-b bg-white">
          <h2 className="font-semibold">BipolarChat</h2>
        </div>
      )}
      
      <ScrollArea className="flex-grow">
        <div className="p-3 space-y-1">
          <h3 className="text-sm font-bold px-3 pt-2 pb-1">Channels</h3>
          {channels.map((channel) => (
            <div
              key={channel.id}
              className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer ${
                selectedChannel === channel.id ? "bg-purple-100" : "hover:bg-blue-50"
              }`}
              onClick={() => onChannelClick(channel.id)}
            >
              <span className="text-sm font-medium">{channel.name}</span>
              {channel.unreadCount && (
                <span className="bg-[#6698FF] text-white text-xs px-1.5 py-0.5 rounded-full">
                  {channel.unreadCount}
                </span>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
