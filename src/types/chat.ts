
export interface ChatMessage {
  id: string;
  content: string;
  sender: string;
  senderInitials: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export interface ChatChannel {
  id: string;
  name: string;
  description?: string;
  unreadCount?: number;
  messages: ChatMessage[];
}

export interface ChatMember {
  id: string;
  name: string;
  isOwner: boolean;
}
