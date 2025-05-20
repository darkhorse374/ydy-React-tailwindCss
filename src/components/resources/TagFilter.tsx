
import React from "react";
import { Badge } from "@/components/ui/badge";

interface TagFilterProps {
  allTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
}

const TagFilter = ({ allTags, selectedTags, toggleTag }: TagFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {allTags.map(tag => (
        <Badge 
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"} 
          className={`cursor-pointer px-3 py-1 ${
            selectedTags.includes(tag) 
              ? 'border-purple-300 bg-purple-50 text-purple-800' 
              : 'border-gray-300 bg-white text-gray-700'
          } ${selectedTags.includes(tag) ? 'shadow-sm' : ''}`}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default TagFilter;
