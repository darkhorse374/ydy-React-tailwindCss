
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreatePostModal from "./CreatePostModal";
import { Post } from "@/types/post";

interface MessageBoardHeaderProps {
  title: string;
  onPostCreated?: (post: Post) => void;
}

export const MessageBoardHeader = ({ title, onPostCreated }: MessageBoardHeaderProps) => {
  const [createPostOpen, setCreatePostOpen] = useState(false);

  const handlePostCreated = (post: Post) => {
    if (onPostCreated) {
      onPostCreated(post);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#6699FF]">{title}</h1>
        <Button 
          variant="blue-custom" 
          className="rounded-full"
          onClick={() => setCreatePostOpen(true)}
        >
          <Plus size={18} className="mr-1" /> Create Post
        </Button>
      </div>
      
      <CreatePostModal 
        open={createPostOpen} 
        onOpenChange={setCreatePostOpen}
        onPostCreated={handlePostCreated}
      />
    </>
  );
};
