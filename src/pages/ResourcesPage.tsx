
import React, { useState } from "react";
import CreateArticleModal from "@/components/resources/CreateArticleModal";
import ResourceSearch from "@/components/resources/ResourceSearch";
import TagFilter from "@/components/resources/TagFilter";
import ResourceGrid from "@/components/resources/ResourceGrid";
import { useResources } from "@/hooks/useResources";

const ResourcesPage = () => {
  const [createArticleOpen, setCreateArticleOpen] = useState(false);
  
  const {
    searchQuery,
    setSearchQuery,
    selectedTags,
    allTags,
    toggleTag,
    filteredResources,
    handleArticleCreated
  } = useResources([
    {
      id: "1",
      title: "How Do You Recognize When Mania is Taking Over?",
      content: 
        "Hey everyone, Greg here. I've been feeling an intense surge of energy lately—barely sleeping, hyper-focused on new projects, and talking a mile a minute...",
      author: {
        name: "Greg",
        initials: "GR",
      },
      timestamp: new Date("2023-01-04T08:30:00"),
      likes: 7,
      views: 27,
      readTime: "5 minute read",
      tags: ["bipolar", "mania", "mental health"],
      imageUrl: "/lovable-uploads/0a562c8a-588d-414d-8fa2-57497d502e7b.png",
    },
    {
      id: "2",
      title: "Coping Strategies for Anxiety Attacks",
      content: 
        "I wanted to share some techniques that have helped me manage my anxiety attacks over the years...",
      author: {
        name: "Jamie",
        initials: "JL",
      },
      timestamp: new Date("2023-01-03T14:15:00"),
      likes: 12,
      views: 43,
      readTime: "4 minute read",
      tags: ["anxiety", "coping strategies", "self-care"],
    },
    {
      id: "3",
      title: "Understanding Depression: A Comprehensive Guide",
      content: 
        "Depression is more than just feeling sad. It's a complex condition that affects millions of people worldwide...",
      author: {
        name: "Taylor",
        initials: "TJ",
      },
      timestamp: new Date("2023-01-02T19:45:00"),
      likes: 15,
      views: 56,
      readTime: "7 minute read",
      tags: ["depression", "guide", "mental health"],
    },
    {
      id: "4",
      title: "Mindfulness Exercises for Daily Practice",
      content: 
        "Incorporating mindfulness into your daily routine can significantly improve your mental well-being...",
      author: {
        name: "Morgan",
        initials: "MS",
      },
      timestamp: new Date("2023-01-01T10:30:00"),
      likes: 20,
      views: 61,
      readTime: "6 minute read",
      tags: ["mindfulness", "meditation", "daily practice"],
    },
    {
      id: "5",
      title: "The Connection Between Diet and Mental Health",
      content: 
        "What we eat can have a significant impact on how we feel emotionally. Here's what research tells us about the diet-mental health connection...",
      author: {
        name: "Casey",
        initials: "CP",
      },
      timestamp: new Date("2023-01-05T09:15:00"),
      likes: 18,
      views: 39,
      readTime: "5 minute read",
      tags: ["nutrition", "mental health", "wellness"],
    },
    {
      id: "6",
      title: "Supporting a Loved One Through Depression",
      content: 
        "When someone you care about is experiencing depression, it can be difficult to know how to help...",
      author: {
        name: "Alex",
        initials: "AT",
      },
      timestamp: new Date("2023-01-06T16:20:00"),
      likes: 14,
      views: 32,
      readTime: "5 minute read",
      tags: ["depression", "support", "relationships"],
    },
  ]);

  return (
    <div className="container mx-auto py-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-purple-800 mb-6">Resources</h1>
        
        <ResourceSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onCreateArticle={() => setCreateArticleOpen(true)}
        />
        
        <TagFilter 
          allTags={allTags}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
        />
      </div>

      <ResourceGrid resources={filteredResources} />

      <CreateArticleModal 
        open={createArticleOpen} 
        onOpenChange={setCreateArticleOpen}
        onArticleCreated={handleArticleCreated}
      />
    </div>
  );
};

export default ResourcesPage;
