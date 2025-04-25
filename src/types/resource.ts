
export interface Resource {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    initials: string;
  };
  timestamp: Date;
  likes: number;
  views: number;
  readTime: string;
  tags: string[];
  imageUrl?: string;
}
