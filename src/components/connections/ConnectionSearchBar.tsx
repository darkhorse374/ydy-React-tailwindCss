
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ConnectionSearchBarProps {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ConnectionSearchBar = ({ searchTerm, onChange }: ConnectionSearchBarProps) => {
  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search"
        className="pl-10"
        value={searchTerm}
        onChange={onChange}
      />
    </div>
  );
};

export default ConnectionSearchBar;
