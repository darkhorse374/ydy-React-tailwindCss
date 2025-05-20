
import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface TagInputProps {
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  availableTags: string[];
}

const TagInput = ({ selectedTags, setSelectedTags, availableTags }: TagInputProps) => {
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const tagInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Filter tag suggestions based on input
  const filteredTagSuggestions = availableTags.filter(tag => 
    tag.toLowerCase().includes(tagInput.toLowerCase()) && 
    !selectedTags.includes(tag)
  );

  // Add a tag
  const addTag = (tag: string) => {
    if (tag.trim() === "") return;
    
    // Check if tag already exists
    if (selectedTags.includes(tag)) {
      toast({
        title: "Tag already added",
        description: `The tag "${tag}" is already in your list.`,
        variant: "destructive"
      });
      return;
    }
    
    setSelectedTags([...selectedTags, tag]);
    setTagInput("");
    setShowTagSuggestions(false);
    if (tagInputRef.current) tagInputRef.current.focus();
  };

  // Handle key press events in tag input
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // Helper function to get tag variant based on tag content
  const getTagVariant = (tag: string) => {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes("depression")) return "depression";
    if (tagLower.includes("anxiety")) return "anxiety";
    if (tagLower.includes("isolation")) return "isolation";
    if (tagLower.includes("mood")) return "bipolar";
    if (tagLower.includes("medication")) return "medication";
    if (tagLower.includes("focus") || tagLower.includes("adhd") || tagLower.includes("organization")) return "focus";
    if (tagLower.includes("panic")) return "panic";
    if (tagLower.includes("stress")) return "stress";
    if (tagLower.includes("ptsd")) return "trauma";
    if (tagLower.includes("trauma")) return "trauma";
    if (tagLower.includes("recovery")) return "recovery";
    if (tagLower.includes("ocd") || tagLower.includes("intrusive")) return "depression";
    if (tagLower.includes("eating") || tagLower.includes("body")) return "secondary";
    if (tagLower.includes("addiction") || tagLower.includes("sobriety")) return "outline";
    return "default";
  };

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium">Tags</div>
      <div className="relative">
        <Input
          ref={tagInputRef}
          placeholder="Add tags..."
          value={tagInput}
          onChange={(e) => {
            setTagInput(e.target.value);
            setShowTagSuggestions(true);
          }}
          onKeyDown={handleTagKeyDown}
          onFocus={() => setShowTagSuggestions(true)}
          onBlur={() => {
            // Delay hiding suggestions to allow clicking on them
            setTimeout(() => setShowTagSuggestions(false), 200);
          }}
        />
        
        {showTagSuggestions && filteredTagSuggestions.length > 0 && (
          <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-auto">
            <div className="p-2">
              {filteredTagSuggestions.map((tag) => (
                <div
                  key={tag}
                  className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer"
                  onClick={() => addTag(tag)}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {selectedTags.map((tag) => (
          <Badge
            key={tag}
            variant={getTagVariant(tag)}
            className="px-3 py-1 flex items-center gap-1"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-xs rounded-full p-0.5 hover:bg-black/10"
            >
              <X size={14} />
            </button>
          </Badge>
        ))}
        {selectedTags.length === 0 && (
          <div className="text-sm text-gray-500">
            Type tags and press Enter or select from suggestions
          </div>
        )}
      </div>
    </div>
  );
};

export default TagInput;
