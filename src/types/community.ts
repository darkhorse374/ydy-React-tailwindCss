
export interface CommunityPost {
  id: number;
  author: {
    name: string;
    avatar: string;
    date: string;
  };
  title: string;
  content: string;
  image: string;
  likes: number;
  comments: {
    id: number;
    author: {
      name: string;
      avatar: string;
      date: string;
    };
    content: string;
  }[];
}

export interface CommunityData {
  id: string;
  title: string;
  description: string;
  tags: string[];
  members: number;
  articles: number;
  isFeatured: boolean;
  isPublic: boolean;
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  owners?: {
    name: string;
    avatar: string;
  }[];
  bulletPoints?: string[];
  upcomingEvents?: {
    id: number;
    title: string;
    date: string;
    description: string;
  }[];
  posts?: CommunityPost[];
  banner?: string;
}
