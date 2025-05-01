
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare } from "lucide-react";
import { Post } from "@/types/post";
import { getAvatarColor, getAvatarTextColor } from "@/utils/avatarUtils";

interface PostCardProps {
  post: Post;
  onLike: (postId: string, isLiked: boolean) => void;
}

export const PostCard = ({ post, onLike }: PostCardProps) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  
  // Format date as "Jan 4 8:30 AM"
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }) + " " + date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };
  
  const handleViewPost = () => {
    navigate(`/message-board/posts/${post.id}`);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount(prevCount => newIsLiked ? prevCount + 1 : prevCount - 1);
    onLike(post.id, newIsLiked);
  };

  const avatarBgColor = getAvatarColor(post.author.initials);
  const avatarTextColor = getAvatarTextColor(post.author.initials);

  return (
    <Card className="border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-1 flex flex-row justify-between items-start">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback className={`${avatarBgColor} ${avatarTextColor} text-xs font-medium`}>
              {post.author.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{post.author.name}</div>
            <div className="text-xs text-gray-500">{formatDate(post.timestamp)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-2 cursor-pointer" onClick={handleViewPost}>
        <h3 className="text-md font-semibold mb-1 text-[#6699FF]">{post.title}</h3>
        <p className="text-sm text-gray-700 line-clamp-3">{post.content}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="xs" 
            className="text-gray-600 flex items-center gap-1 p-0"
            onClick={handleLike}
          >
            <Heart 
              size={14} 
              className={isLiked ? "fill-red-400 text-red-400" : "text-red-400"} 
            /> 
            {likeCount} likes
          </Button>
          <Button 
            variant="ghost" 
            size="xs"
            className="text-gray-600 flex items-center gap-1 p-0"
          >
            <MessageSquare size={14} /> {post.replies} replies
          </Button>
        </div>
        <Button 
          variant="subtle-blue" 
          size="xs"
          onClick={handleViewPost}
        >
          view more
        </Button>
      </CardFooter>
    </Card>
  );
};
