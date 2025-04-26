
import React, { useState } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatMemberList } from "@/components/chat/ChatMemberList";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { ChatMessage, ChatChannel, ChatMember } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { Menu, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { communitiesData } from "@/data/communitiesDetailData";

const ChatPage = () => {
  const isMobile = useIsMobile();
  
  // Sample chat channels data
  const [channels, setChannels] = useState<ChatChannel[]>([
    {
      id: "general",
      name: "General",
      messages: [],
    },
    {
      id: "bear-den",
      name: "The Bear Den",
      messages: [],
    },
    {
      id: "mood-swings",
      name: "Mood Swings",
      messages: [],
    },
    {
      id: "chill-mode",
      name: "Chill Mode",
      unreadCount: 12,
      messages: [],
    },
    {
      id: "storytime",
      name: "Storytime",
      unreadCount: 4,
      messages: [],
    },
    {
      id: "meds-mania",
      name: "Meds and Mania",
      messages: [],
    },
    {
      id: "late-night",
      name: "Late Night Rambles",
      messages: [],
    },
    {
      id: "hug-bear",
      name: "Hug a Bear",
      unreadCount: 9,
      messages: [],
    },
  ]);

  // Sample members data
  const members: ChatMember[] = [
    { id: "1", name: "Grahem", isOwner: true },
    { id: "2", name: "Fjori", isOwner: true },
    { id: "3", name: "Grahem", isOwner: true },
    { id: "4", name: "Fjori", isOwner: true },
    { id: "5", name: "CP", isOwner: true },
    { id: "6", name: "Grahem", isOwner: false },
    { id: "7", name: "Fjori", isOwner: false },
    { id: "8", name: "Grahem", isOwner: false },
    { id: "9", name: "Fjori", isOwner: false },
    { id: "10", name: "CP", isOwner: false },
  ];

  // Sample messages for selected channel
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      sender: "Other Person",
      senderInitials: "OP",
      timestamp: new Date(new Date().setHours(20, 0, 0, 0)),
      isCurrentUser: false,
    },
    {
      id: "2",
      content: "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      sender: "Current User",
      senderInitials: "CU",
      timestamp: new Date(new Date().setHours(20, 0, 0, 0)),
      isCurrentUser: true,
    },
    {
      id: "3",
      content: "Lorem ipsum has been the industry's standard dummy text\never since the 1500s.\n\nThis is a multi-line message.",
      sender: "Other Person",
      senderInitials: "OP",
      timestamp: new Date(new Date().setHours(20, 0, 0, 0)),
      isCurrentUser: false,
    },
    {
      id: "4",
      content: "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      sender: "Current User",
      senderInitials: "CU",
      timestamp: new Date(new Date().setHours(20, 0, 0, 0)),
      isCurrentUser: true,
    },
    {
      id: "5",
      content: "Lorem ipsum has been the industry's standard dummy text ever since the 1500s.",
      sender: "Other Person",
      senderInitials: "OP",
      timestamp: new Date(new Date().setHours(20, 0, 0, 0)),
      isCurrentUser: false,
    },
  ]);

  const [selectedChannel, setSelectedChannel] = useState("meds-mania");
  const [activeTab, setActiveTab] = useState("channels");
  const [showChannelSheet, setShowChannelSheet] = useState(false);
  const [showMembersSheet, setShowMembersSheet] = useState(false);

  const handleChannelClick = (channelId: string) => {
    setSelectedChannel(channelId);
    setShowChannelSheet(false);
    // In a real app, this would fetch messages for the selected channel
  };

  const handleSendMessage = (newMessageContent: string) => {
    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      content: newMessageContent,
      sender: "Current User",
      senderInitials: "CU",
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setMessages([...messages, newMsg]);
  };

  // Get the channel name from selectedChannel
  const currentChannel = channels.find(channel => channel.id === selectedChannel);
  
  // Get community data - in a real app, this would be fetched based on which community's chat you're viewing
  const community = communitiesData["bipolar-bears"];
  const communityName = community?.title || "BipolarChat";

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <ChatSidebar 
          channels={channels} 
          members={members}
          selectedChannel={selectedChannel}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onChannelClick={handleChannelClick}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-full bg-white relative">
        {/* Mobile Header with menu buttons */}
        {isMobile && (
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <Sheet open={showChannelSheet} onOpenChange={setShowChannelSheet}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-[280px]">
                <ChatSidebar 
                  channels={channels} 
                  members={members}
                  selectedChannel={selectedChannel}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  onChannelClick={handleChannelClick}
                  isMobileSheet={true}
                />
              </SheetContent>
            </Sheet>
            
            <div className="flex-1 text-center font-semibold mx-2 whitespace-nowrap overflow-hidden">
              <span className="block truncate">
                {currentChannel?.name ? `${communityName} | ${currentChannel.name}` : communityName}
              </span>
            </div>
            
            <Sheet open={showMembersSheet} onOpenChange={setShowMembersSheet}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Users size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0 w-[280px]">
                <div className="p-4 bg-white h-full overflow-auto">
                  <ChatMemberList members={members} isMobileSheet={true} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
        
        {/* Regular header for desktop or expanded channel info on mobile */}
        {(!isMobile || (isMobile && currentChannel && currentChannel.id === "meds-mania")) && (
          <ChatHeader currentChannel={currentChannel} communityName={communityName} />
        )}
        
        <ChatMessageList messages={messages} />
        <ChatInput onSendMessage={handleSendMessage} />
      </div>

      {/* Desktop Member List (hidden on mobile) */}
      {!isMobile && <ChatMemberList members={members} />}
    </div>
  );
};

export default ChatPage;
