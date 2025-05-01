
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, PinIcon } from "lucide-react";
import { Post } from "@/types/post";
import { getAvatarColor, getAvatarTextColor } from "@/utils/avatarUtils";

interface PinnedPostProps {
  post: Post;
  onLike: (postId: string, isLiked: boolean) => void;
}

export const PinnedPost = ({ post, onLike }: PinnedPostProps) => {
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
    <Card className="border-2 border-[#6699FF]/30 shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="pb-2 flex flex-row justify-between items-start">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarFallback className={`${avatarBgColor} ${avatarTextColor} font-medium`}>
              {post.author.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-xs text-gray-500">{formatDate(post.timestamp)}</div>
          </div>
        </div>
        <PinIcon size={18} className="text-[#6699FF]" />
      </CardHeader>
      <CardContent className="py-3 cursor-pointer" onClick={handleViewPost}>
        <h2 className="text-lg font-semibold mb-2 text-[#6699FF]">{post.title}</h2>
        <p className="text-gray-700">{post.content}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 flex items-center gap-1"
            onClick={handleLike}
          >
            <Heart 
              size={16} 
              className={isLiked ? "fill-red-400 text-red-400" : "text-red-400"} 
            /> 
            {likeCount} likes
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-gray-600 flex items-center gap-1"
          >
            <MessageSquare size={16} /> {post.replies} replies
          </Button>
        </div>
        <Button 
          variant="subtle-blue" 
          size="sm"
          onClick={handleViewPost}
        >
          view more
        </Button>
      </CardFooter>
    </Card>
  );
};
