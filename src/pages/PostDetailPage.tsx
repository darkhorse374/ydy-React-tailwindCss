import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Heart, Image as ImageIcon, Smile, ChevronUp, BookOpen } from "lucide-react";
import { Post } from "@/types/post";
import { getAvatarColor, getAvatarTextColor } from "@/utils/avatarUtils";

const POST_DATA: Post = {
  id: "1",
  title: "How Do You Recognize When Mania is Taking Over?",
  content: 
    "\"Hey everyone, Greg here. I've been feeling an intense surge of energy lately—barely sleeping, hyper-focused on new projects, and talking a mile a minute. At first, it feels amazing, like I can conquer anything, but I know from experience that this can quickly spiral out of control.\n\nI'm trying to be more self-aware, but it's tough to tell when I'm just feeling productive vs. when I'm slipping into full-blown mania. What early signs do you notice in yourself, and what strategies help you slow down before things get out of hand?\n\nWould love to hear your experiences. Thanks in advance!\"",
  author: {
    name: "Greg",
    initials: "GR",
  },
  timestamp: new Date("2023-01-04T08:30:00"),
  likes: 7,
  replies: 17,
  image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2680&auto=format&fit=crop",
};

const COMMENTS_DATA = [
  {
    id: "1",
    author: {
      name: "Alex",
      initials: "AL",
    },
    content: "\"For me, the first sign is when my thoughts start racing faster than I can keep up. I also tend to take on way too many projects at once. When I notice this happening, I try to slow down by setting reminders to take breaks and check in with myself.\"",
    timestamp: new Date("2023-01-04T08:30:00"),
    likes: 7,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Alex",
          initials: "AL",
        },
        content: "Alex, I totally relate to the feeling of taking on too many projects at once! It's like everything suddenly feels urgent and exciting, but then it becomes overwhelming. Setting reminders to take breaks is a great idea—do you have any go-to strategies for actually sticking to them when your energy is through the roof?",
        timestamp: new Date("2023-01-04T08:30:00"),
        likes: 7,
        parentId: "1",
      },
      {
        id: "1-1-1",
        author: {
          name: "Alex",
          initials: "AL",
        },
        content: "Yeah, it's definitely hard to stick to them when I'm in that hyper-focused mode! What helps me is using alarms with calming sounds instead of jarring ones. I'm also more likely to actually pause instead of just ignoring them if I also have a \"check-in buddy\" who reminds me to slow down when I start going full speed ahead. Do you have anything that works for you?",
        timestamp: new Date("2023-01-04T08:30:00"),
        likes: 7,
        parentId: "1-1",
      }
    ]
  },
  {
    id: "2",
    author: {
      name: "Alex",
      initials: "AL",
    },
    content: "\"For me, the first sign is when my thoughts start racing faster than I can keep up. I also tend to take on way too many projects at once. When I notice this happening, I try to slow down by setting reminders to take breaks and check in with myself.\"",
    timestamp: new Date("2023-01-04T08:30:00"),
    likes: 7,
    replies: []
  }
];

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

interface CommentProps {
  comment: any;
  level?: number;
  onReply: (commentId: string) => void;
}

const Comment = ({ comment, level = 0, onReply }: CommentProps) => {
  const [liked, setLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  const handleReply = () => {
    setShowReplyInput(false);
    onReply(comment.id);
  };
  
  const avatarBgColor = getAvatarColor(comment.author.initials);
  const avatarTextColor = getAvatarTextColor(comment.author.initials);
  
  return (
    <div className={`py-3 ${level > 0 ? 'ml-8 border-l-2 pl-4 border-gray-200' : ''}`}>
      <div className="flex items-start gap-3">
        <Avatar className="h-8 w-8">
          <AvatarFallback className={`${avatarBgColor} ${avatarTextColor} text-xs`}>
            {comment.author.initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <span className="font-medium">{comment.author.name}</span>
            <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
          </div>
          
          <p className="text-sm text-gray-700 whitespace-pre-line mb-2">
            {comment.content}
          </p>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`gap-1 p-0 h-auto ${liked ? 'text-red-500' : 'text-gray-500'}`} 
              onClick={handleLike}
            >
              <Heart size={14} className={liked ? "fill-red-400 text-red-400" : "text-red-400"} /> {comment.likes} likes
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-1 p-0 h-auto text-[#6699FF]" 
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              reply
            </Button>
          </div>
          
          {showReplyInput && (
            <div className="mt-3 flex gap-2">
              <Input 
                placeholder="Write a reply..." 
                className="flex-1"
              />
              <Button onClick={handleReply} variant="blue-custom">Reply</Button>
            </div>
          )}
          
          {comment.replies && comment.replies.map((reply: any) => (
            <Comment 
              key={reply.id} 
              comment={reply} 
              level={level + 1}
              onReply={onReply}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(COMMENTS_DATA);
  const post = POST_DATA; // In a real app, we'd fetch based on the id
  
  const handleLike = () => {
    setLiked(!liked);
  };
  
  const handleComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: String(comments.length + 1),
        author: {
          name: "You",
          initials: "YO",
        },
        content: commentText,
        timestamp: new Date(),
        likes: 0,
        replies: []
      };
      
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };
  
  const handleReply = (commentId: string) => {
    console.log(`Reply to comment with ID: ${commentId}`);
    // In a real app, this would add the reply to the comment
  };
  
  const handleBackClick = () => {
    navigate(-1);
  };
  
  const handleJournalEntry = () => {
    console.log("Navigating to journal with state:", { newEntry: true, title: post.title || "Reflection on a post" });
    navigate('/journal', { 
      state: { 
        newEntry: true, 
        title: post.title || "Reflection on a post" 
      } 
    });
  };

  const avatarBgColor = getAvatarColor(post.author.initials);
  const avatarTextColor = getAvatarTextColor(post.author.initials);
  
  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <Button 
        variant="ghost" 
        size="sm" 
        className="mb-4 gap-1"
        onClick={handleBackClick}
      >
        <ArrowLeft size={16} /> Back to Message Board
      </Button>
      
      <Card className="overflow-hidden shadow-md">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className={`${avatarBgColor} ${avatarTextColor}`}>
                {post.author.initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium">{post.author.name}</span>
                <span className="text-sm text-gray-500">{formatDate(post.timestamp)}</span>
              </div>
            </div>
          </div>
          
          <h1 className="text-xl font-bold text-[#6699FF] mb-3">{post.title}</h1>
          <div className="text-gray-700 whitespace-pre-line mb-4">
            {post.content}
          </div>
          
          {post.image && (
            <div className="my-4 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt="Post" 
                className="w-full h-auto max-h-[400px] object-cover"
              />
            </div>
          )}
          
          <div className="flex items-center gap-3 mt-4 border-t pt-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`gap-1 ${liked ? 'text-red-500' : 'text-gray-500'}`}
              onClick={handleLike}
            >
              <Heart size={16} className={liked ? "fill-red-400 text-red-400" : "text-red-400"} /> {post.likes} likes
            </Button>
            
            <div className="text-sm text-gray-500">
              {post.replies} comments
            </div>
          </div>
        </div>
        
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-2">
            <Input 
              placeholder="Write a comment..." 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1"
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500"
            >
              <ImageIcon size={18} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500"
            >
              <Smile size={18} />
            </Button>
            <Button 
              variant="blue-custom" 
              onClick={handleComment}
              disabled={!commentText.trim()}
            >
              Comment
            </Button>
          </div>
        </div>
        
        <div className="border-t border-gray-100">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="font-medium">Comments</h2>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-[#6699FF] hover:text-[#5580DD] hover:bg-blue-50"
                onClick={handleJournalEntry}
                title="Add to journal"
              >
                <BookOpen size={16} />
              </Button>
              <Button variant="ghost" size="sm" className="gap-1">
                <ChevronUp size={14} /> Newest first
              </Button>
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-500px)] min-h-[300px]">
            <div className="divide-y">
              {comments.map((comment) => (
                <div key={comment.id} className="px-6">
                  <Comment comment={comment} onReply={handleReply} />
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Card>
    </div>
  );
};

export default PostDetailPage;
