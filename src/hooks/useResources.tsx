
import { useState } from "react";
import { Resource } from "@/types/resource";
import { useToast } from "@/hooks/use-toast";

export const useResources = (initialResources: Resource[]) => {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { toast } = useToast();

  const allTags = Array.from(
    new Set(resources.flatMap(resource => resource.tags))
  ).sort();

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesSearch = 
      searchQuery === "" || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      resource.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = 
      selectedTags.length === 0 || 
      selectedTags.some(tag => resource.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const handleArticleCreated = (article: Resource) => {
    setResources([article, ...resources]);
    
    toast({
      title: "Article published!",
      description: "Your article has been published successfully.",
    });
  };

  return {
    resources,
    searchQuery,
    setSearchQuery,
    selectedTags,
    allTags,
    toggleTag,
    filteredResources,
    handleArticleCreated
  };
};
