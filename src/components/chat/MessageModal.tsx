
import React, { useState, useEffect, useRef } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipient: {
    id: number;
    name: string;
    image: string;
  };
}

const MessageModal = ({ isOpen, onClose, recipient }: MessageModalProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Fetch any existing messages
  useEffect(() => {
    if (isOpen && recipient.id) {
      // In a real app, this would be an API call to get messages
      // For now, we'll use mock data based on the recipient id
      const mockMessages: Record<number, ChatMessage[]> = {
        1: [
          {
            id: "1",
            content: "Hey Robin, how have you been managing your mood swings lately?",
            sender: "Current User",
            senderInitials: "CU",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
            isCurrentUser: true,
          },
          {
            id: "2",
            content: "Hey there! Surfing has been helping a lot actually. The ocean is my therapy.",
            sender: recipient.name,
            senderInitials: recipient.name.charAt(0),
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
            isCurrentUser: false,
          }
        ],
        2: [
          {
            id: "1",
            content: "Alex, I came across a book that might help with depression. Would you be interested?",
            sender: "Current User",
            senderInitials: "CU",
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
            isCurrentUser: true,
          }
        ],
      };
      
      setMessages(mockMessages[recipient.id] || []);
    }
  }, [isOpen, recipient.id, recipient.name]);

  // Scroll to bottom when messages change or when modal opens
  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 100);
      }
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: ChatMessage = {
        id: Date.now().toString(),
        content: newMessage,
        sender: "Current User",
        senderInitials: "CU",
        timestamp: new Date(),
        isCurrentUser: true,
      };

      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={recipient.image} alt={recipient.name} />
              <AvatarFallback>{recipient.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>Message {recipient.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        {/* Message history */}
        <ScrollArea className="h-64 px-1" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-center text-sm text-gray-500 py-8">
                No messages yet. Start a conversation!
              </p>
            ) : (
              messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${
                      message.isCurrentUser 
                        ? 'bg-purple-100 text-purple-900' 
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        
        <div className="flex items-center gap-2 mt-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
