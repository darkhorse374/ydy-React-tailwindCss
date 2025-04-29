
import React from "react";
import { Badge } from "@/components/ui/badge";
import { getTagVariant } from "@/utils/communityUtils";

interface CommunityTagBadgeProps {
  tag: string;
  className?: string;
}

const CommunityTagBadge = ({ tag, className = "" }: CommunityTagBadgeProps) => {
  // Get the variant based on the tag name and cast it to the correct type
  // This ensures TypeScript knows the returned value is a valid badge variant
  const variant = getTagVariant(tag) as "depression" | "anxiety" | "isolation" | "bipolar" | 
    "mood" | "medication" | "focus" | "panic" | "stress" | "ptsd" | 
    "trauma" | "recovery" | "insomnia" | "social" | "default" | 
    "secondary" | "destructive" | "outline";
  
  return (
    <Badge 
      variant={variant} 
      className={`shadow-sm ${className}`}
    >
      {tag}
    </Badge>
  );
};

export default CommunityTagBadge;
