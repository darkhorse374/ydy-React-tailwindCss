
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";

interface CommunitySearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
}

const CommunitySearch = ({ searchQuery, onSearchChange, onFilterClick }: CommunitySearchProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          placeholder="Search communities..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button 
        variant="outline" 
        className="md:w-auto flex items-center gap-2"
        onClick={onFilterClick}
      >
        <Tag size={16} />
        Filter by Tags
      </Button>
    </div>
  );
};

export default CommunitySearch;
