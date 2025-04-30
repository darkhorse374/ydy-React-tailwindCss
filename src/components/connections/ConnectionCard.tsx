
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, UserPlus, Eye } from "lucide-react";

interface ConnectionCardProps {
  profile: {
    id: number;
    name: string;
    avatar?: string;
    image?: string;
    status?: string;
    bio: string;
    struggles: string[];
    interests: string[];
  };
  onMessageClick: () => void;
  onConnectClick: () => void;
  onViewProfile?: () => void;
  getStruggleVariant: (struggle: string) => string;
}

const ConnectionCard = ({
  profile,
  onMessageClick,
  onConnectClick,
  onViewProfile,
  getStruggleVariant
}: ConnectionCardProps) => {
  const { name, avatar, image, status, bio, struggles, interests } = profile;
  
  // Generate random support indicators
  const seeksSupport = Math.random() > 0.5;
  const givesSupport = Math.random() > 0.3;

  return (
    <Card className="h-full overflow-hidden transition-shadow hover:shadow-md flex flex-col">
      <div className="bg-gradient-to-r from-amber-50 to-orange-100 p-4">
        <div className="flex items-center">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarImage src={avatar || image} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-base">{name}</h3>
            <p className="text-sm text-gray-600">{status || "Available to connect"}</p>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-3">
          {seeksSupport && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Seeks Support
            </Badge>
          )}
          {givesSupport && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Gives Support
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {bio}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-between mb-4">
          <div className="flex-1">
            <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Struggles</h4>
            <div className="flex flex-wrap gap-1 mb-3">
              {struggles.slice(0, 2).map((struggle, i) => (
                <Badge
                  key={i}
                  variant={getStruggleVariant(struggle) as any}
                  className="text-xs font-normal"
                >
                  {struggle.length > 15 ? `${struggle.slice(0, 15)}...` : struggle}
                </Badge>
              ))}
              {struggles.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{struggles.length - 2}
                </Badge>
              )}
            </div>
            
            <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Interests</h4>
            <p className="text-xs text-gray-600 line-clamp-1">
              {interests.join(", ")}
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500 mb-2">Recent Activity</h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">Joined Bipolar Bears 1/24/25</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">Active in Chat Rooms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">New Post</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-0 mt-auto">
        <div className="flex items-center justify-between w-full border-t">
          <Button 
            variant="subtle" 
            size="compact" 
            className="rounded-none m-0 py-3 w-1/3 font-normal"
            onClick={onMessageClick}
            style={{ backgroundColor: '#F1F5FF', color: '#6699FF' }}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            MESSAGE
          </Button>
          <Button
            variant="subtle"
            size="compact"
            className="rounded-none m-0 py-3 w-1/3 font-normal"
            onClick={onConnectClick}
            style={{ backgroundColor: '#F1F5FF', color: '#6699FF' }}
          >
            <UserPlus className="h-4 w-4 mr-1" />
            CONNECT
          </Button>
          {onViewProfile && (
            <Button 
              variant="ghost" 
              size="compact" 
              className="rounded-none m-0 py-3 w-1/3 font-normal text-gray-600 hover:text-gray-900"
              onClick={onViewProfile}
            >
              <Eye className="h-4 w-4 mr-1" />
              VIEW
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ConnectionCard;
