
export interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    initials: string;
  };
  timestamp: Date;
  likes: number;
  replies: number;
  isPinned?: boolean;
  image?: string;
}
