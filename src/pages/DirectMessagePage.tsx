
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChatMessageList } from "@/components/chat/ChatMessageList";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatMessage } from "@/types/chat";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const DirectMessagePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [recipient, setRecipient] = useState<{ name: string; initials: string; }>({ 
    name: "", 
    initials: "" 
  });

  useEffect(() => {
    const mockUsers: Record<string, { name: string; initials: string; messages: ChatMessage[] }> = {
      "101": {
        name: "Sarah Johnson",
        initials: "SJ",
        messages: [
          {
            id: "1",
            content: "Hey, how are you doing today?",
            sender: "Sarah Johnson",
            senderInitials: "SJ",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            isCurrentUser: false,
          },
          {
            id: "2",
            content: "I'm doing well, thanks for asking! How about you?",
            sender: "Current User",
            senderInitials: "CU",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
            isCurrentUser: true,
          },
          {
            id: "3",
            content: "I've been meaning to ask if you've had a chance to think about that community event we discussed last week?",
            sender: "Sarah Johnson",
            senderInitials: "SJ",
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            isCurrentUser: false,
          }
        ]
      },
      "102": {
        name: "David Miller",
        initials: "DM",
        messages: [
          {
            id: "1",
            content: "Did you see the latest resource on mental health practices?",
            sender: "David Miller",
            senderInitials: "DM",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
            isCurrentUser: false,
          },
          {
            id: "2",
            content: "Not yet, can you send me the link?",
            sender: "Current User",
            senderInitials: "CU",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
            isCurrentUser: true,
          }
        ]
      },
      "103": {
        name: "Emily Chang",
        initials: "EC",
        messages: [
          {
            id: "1",
            content: "Thanks for sharing your experience in yesterday's group session. It really resonated with me.",
            sender: "Emily Chang",
            senderInitials: "EC",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
            isCurrentUser: false,
          }
        ]
      }
    };

    if (userId && !mockUsers[userId]) {
      const connections = [
        { id: 1, name: "Alex Thompson" }, 
        { id: 2, name: "Jamie Lee" }, 
        { id: 3, name: "Chris Rodriguez" },
      ];
      
      const foundUser = connections.find(c => c.id.toString() === userId);
      
      if (foundUser) {
        const initials = foundUser.name.split(' ').map(n => n[0]).join('').toUpperCase();
        mockUsers[userId] = {
          name: foundUser.name,
          initials: initials,
          messages: [
            {
              id: "1",
              content: "Hey there! This is a new conversation.",
              sender: foundUser.name,
              senderInitials: initials,
              timestamp: new Date(Date.now() - 1000 * 60 * 60),
              isCurrentUser: false,
            }
          ]
        };
      }
    }

    if (userId && mockUsers[userId]) {
      setRecipient({
        name: mockUsers[userId].name,
        initials: mockUsers[userId].initials
      });
      setMessages(mockUsers[userId].messages);
    }
  }, [userId]);

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

  const handleBack = () => {
    navigate("/chat");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] pb-0 mt-0">
      <div className="px-4 py-3 border-b flex items-center bg-white">
        {isMobile && (
          <Button variant="ghost" size="icon" className="mr-2 h-8 w-8" onClick={handleBack}>
            <ArrowLeft size={20} />
          </Button>
        )}
        <Avatar className="h-8 w-8 mr-3">
          <AvatarFallback className="bg-purple-100 text-purple-800">
            {recipient.initials}
          </AvatarFallback>
        </Avatar>
        <h2 className="text-lg font-semibold">{recipient.name}</h2>
      </div>

      <div className="flex-1 flex flex-col h-full bg-white">
        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <ChatMessageList messages={messages} />
          </div>
        </div>
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default DirectMessagePage;
