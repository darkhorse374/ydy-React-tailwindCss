
import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Image as ImageIcon, X } from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import { Post } from "@/types/post";
import { useToast } from "@/components/ui/use-toast";

interface CreatePostModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPostCreated: (post: Post) => void;
}

const CreatePostModal = ({ open, onOpenChange, onPostCreated }: CreatePostModalProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Image must be less than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title to your post",
        variant: "destructive"
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Content required",
        description: "Please add some content to your post",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Create a new post object
    const newPost: Post = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      author: {
        name: "You", // In a real app, this would come from the user profile
        initials: "YO"
      },
      timestamp: new Date(),
      likes: 0,
      replies: 0,
      image: imagePreview || undefined
    };

    // Call the callback function to add the post
    onPostCreated(newPost);

    // Reset form
    setTitle("");
    setContent("");
    setImagePreview(null);
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-center text-[#6699FF]">
            Share your thoughts and engage in the community!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-lg"
            />
          </div>
          
          <div>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Share your thoughts or journey..."
              className="min-h-[200px]"
            />
          </div>
          
          {imagePreview && (
            <div className="relative mt-4 rounded-md overflow-hidden border border-gray-200">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="max-h-64 w-auto mx-auto"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={removeImage}
              >
                <X size={16} />
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center sm:justify-between gap-2">
          <div>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-600"
            >
              <ImageIcon size={20} className="mr-2" />
              Add Image
            </Button>
          </div>
          
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !content.trim()}
              variant="blue-custom"
            >
              Post
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
