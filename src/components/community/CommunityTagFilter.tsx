
import React from "react";
import { Badge } from "@/components/ui/badge";
import { getTagVariant } from "@/utils/communityUtils";

interface CommunityTagFilterProps {
  allTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

const CommunityTagFilter = ({ allTags, selectedTags, onTagToggle }: CommunityTagFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {allTags.map((tag) => (
        <Badge
          key={tag}
          variant={getTagVariant(tag) as any}
          className={`cursor-pointer shadow-sm transition-all ${
            selectedTags.includes(tag) ? 'ring-2 ring-blue-300' : ''
          }`}
          onClick={() => onTagToggle(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
};

export default CommunityTagFilter;
