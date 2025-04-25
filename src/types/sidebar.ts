
// Types related to communities and sidebar functionality

export interface Community {
  id: string | number;
  name: string;
  color?: string;
}

export interface DirectMessage {
  id: number;
  name: string;
  isOnline: boolean;
  unreadCount: number;
}

export interface Connection {
  id: number;
  name: string;
}
