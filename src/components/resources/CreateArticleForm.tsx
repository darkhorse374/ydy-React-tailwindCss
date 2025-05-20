
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import TagInput from "./TagInput";
import FileUpload from "./FileUpload";
import ReadTimeSelector from "./ReadTimeSelector";
import { Resource } from "@/types/resource";
import { v4 as uuidv4 } from "uuid";

interface CreateArticleFormProps {
  onArticleCreated: (article: Resource) => void;
  onOpenChange: (open: boolean) => void;
}

const CreateArticleForm = ({ onArticleCreated, onOpenChange }: CreateArticleFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [readTime, setReadTime] = useState("5");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTags = [
    "depression", "anxiety", "bipolar", "mania", "mental health", 
    "self-care", "mindfulness", "meditation", "wellness", "support", 
    "coping strategies", "nutrition", "daily practice", "guide", "relationships"
  ];

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);

    // Create a new article resource
    const newArticle: Resource = {
      id: uuidv4(),
      title: title.trim(),
      content: content.trim(),
      author: {
        name: "You", // In a real app, this would come from the user profile
        initials: "YO"
      },
      timestamp: new Date(),
      likes: 0,
      views: 0,
      readTime: `${readTime} minute read`,
      tags: selectedTags.length > 0 ? selectedTags : ["mental health"],
      imageUrl: imagePreview || undefined
    };

    // Call the callback function to add the article
    onArticleCreated(newArticle);

    // Reset form
    setTitle("");
    setContent("");
    setImagePreview(null);
    setReadTime("5");
    setSelectedTags([]);
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <div className="space-y-4 py-4">
      <div>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-base"
        />
      </div>
      
      <div>
        <Textarea
          placeholder="Synopsis"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[150px] text-base"
        />
      </div>
      
      <ReadTimeSelector readTime={readTime} setReadTime={setReadTime} />
      
      <FileUpload imagePreview={imagePreview} setImagePreview={setImagePreview} />
      
      <TagInput 
        selectedTags={selectedTags} 
        setSelectedTags={setSelectedTags} 
        availableTags={availableTags} 
      />

      <DialogFooter className="flex justify-end gap-2 pt-4">
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting || !title.trim() || !content.trim()}
          variant="purple"
        >
          Create Article
        </Button>
      </DialogFooter>
    </div>
  );
};

export default CreateArticleForm;
