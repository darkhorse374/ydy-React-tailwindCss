
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ResourceCard from "./ResourceCard";
import { Resource } from "@/types/resource";

interface ResourceGridProps {
  resources: Resource[];
}

const ResourceGrid = ({ resources }: ResourceGridProps) => {
  return (
    <ScrollArea className="h-[calc(100vh-280px)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default ResourceGrid;
