
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Post } from "@/types/post";
import { MessageBoardHeader } from "@/components/message-board/MessageBoardHeader";
import { PinnedPost } from "@/components/message-board/PinnedPost";
import { PostCard } from "@/components/message-board/PostCard";
import { useToast } from "@/components/ui/use-toast";

const MessageBoardPage = () => {
  const { toast } = useToast();
  
  // Sample post data
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "How Do You Recognize When Mania is Taking Over?",
      content: 
        "Hey everyone, Greg here. I've been feeling an intense surge of energy lately—barely sleeping, hyper-focused on new projects, and talking a mile a minute. At first, it feels amazing, like I can conquer anything, but I know from experience that this can quickly spiral out of control...",
      author: {
        name: "Greg",
        initials: "GR",
      },
      timestamp: new Date("2023-01-04T08:30:00"),
      likes: 7,
      replies: 17,
      isPinned: true,
    },
    {
      id: "2",
      title: "Finding Peace in Routine",
      content: 
        "I wanted to share something that's been helping me manage my anxiety. Creating a consistent daily routine has been a game-changer for me...",
      author: {
        name: "Jamie",
        initials: "JL",
      },
      timestamp: new Date("2023-01-03T14:15:00"),
      likes: 12,
      replies: 8,
    },
    {
      id: "3",
      title: "Medication Side Effects Discussion",
      content: 
        "Has anyone else experienced weight gain with their mood stabilizers? I've been on them for about 3 months and have noticed significant changes...",
      author: {
        name: "Taylor",
        initials: "TJ",
      },
      timestamp: new Date("2023-01-02T19:45:00"),
      likes: 15,
      replies: 23,
    },
    {
      id: "4",
      title: "Weekly Gratitude Thread",
      content: 
        "Let's share one thing we're grateful for this week. I'll start: I'm grateful for my supportive partner who has been patient with me during this depressive episode...",
      author: {
        name: "Morgan",
        initials: "MS",
      },
      timestamp: new Date("2023-01-01T10:30:00"),
      likes: 20,
      replies: 31,
    },
  ]);

  // Function to handle liking a post
  const handleLike = (postId: string, isLiked: boolean) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: isLiked ? post.likes + 1 : post.likes - 1 } 
        : post
    ));
  };

  // Function to handle creating a new post
  const handlePostCreated = (newPost: Post) => {
    setPosts([newPost, ...posts]);
    toast({
      title: "Post created!",
      description: "Your post has been published successfully.",
      variant: "default",
    });
  };

  const pinnedPosts = posts.filter(post => post.isPinned);
  const regularPosts = posts.filter(post => !post.isPinned);

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <MessageBoardHeader 
        title="Message Board" 
        onPostCreated={handlePostCreated}
      />
      
      <ScrollArea className="h-[calc(100vh-170px)]">
        <div className="space-y-4">
          {/* Pinned Posts */}
          {pinnedPosts.map(post => (
            <PinnedPost key={post.id} post={post} onLike={handleLike} />
          ))}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {regularPosts.map(post => (
              <PostCard key={post.id} post={post} onLike={handleLike} />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageBoardPage;
