
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Resource } from "@/types/resource";

interface ResourceCardProps {
  resource: Resource;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric',
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <Card key={resource.id} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex h-full">
        {resource.imageUrl && (
          <div className="w-1/4 bg-gray-100 flex items-center justify-center overflow-hidden">
            <img 
              src={resource.imageUrl} 
              alt={resource.title} 
              className="h-full object-cover"
            />
          </div>
        )}
        <div className={`${resource.imageUrl ? 'w-3/4' : 'w-full'} p-4`}>
          <div className="flex items-center mb-2 gap-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-purple-100 text-purple-800 text-xs">
                {resource.author.initials}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium">{resource.author.name}</span>
            <span className="text-gray-500 text-sm">{formatDate(resource.timestamp)}</span>
            <span className="ml-auto text-sm text-gray-500">{resource.readTime}</span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{resource.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{resource.content}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span className="text-sm text-gray-600">{resource.likes} likes</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                <span className="text-sm text-gray-600">{resource.views} views</span>
              </div>
            </div>
            <Button variant="ghost" className="text-green-600 hover:text-green-700 hover:bg-green-50 px-3 py-1 h-auto">
              Download
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard;
