
import React from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ResourceSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onCreateArticle: () => void;
}

const ResourceSearch = ({
  searchQuery,
  setSearchQuery,
  onCreateArticle
}: ResourceSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Input 
          placeholder="Search resources..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2 text-gray-700"
      >
        <Filter size={18} />
        <span>Filter</span>
      </Button>
      
      <Button 
        variant="blue-custom" 
        className="rounded-full"
        onClick={onCreateArticle}
      >
        Create Article
      </Button>
    </div>
  );
};

export default ResourceSearch;
