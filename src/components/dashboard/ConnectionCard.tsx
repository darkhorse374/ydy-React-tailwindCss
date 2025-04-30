
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare, UserPlus } from "lucide-react";
import { getTagVariant } from "@/utils/communityUtils";

interface ConnectionCardProps {
  name: string;
  feeling: string;
  status: string;
  bio: string;
  struggles: string[];
  interests: string[];
  onConnectClick: () => void;
}

const ConnectionCard = ({ 
  name, 
  feeling, 
  status, 
  bio, 
  struggles, 
  interests, 
  onConnectClick 
}: ConnectionCardProps) => {
  const userId = Math.floor(Math.random() * 100) + 1;
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'pending'>('idle');
  const navigate = useNavigate();

  const handleConnectClick = () => {
    if (connectionStatus === 'idle') {
      onConnectClick();
      setConnectionStatus('pending');
    }
  };

  const handleMessageClick = () => {
    navigate(`/direct-message/${userId}`);
  };

  return (
    <Card className="overflow-hidden shadow-sm border border-gray-200 h-full flex flex-col transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:translate-y-[-2px] cursor-pointer">
      <div className="bg-gradient-to-r from-amber-50 to-orange-100 p-4">
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden">
              <img src="https://i.pravatar.cc/40" alt={name} className="w-full h-full object-cover" />
            </div>
            <span className="font-medium">{name}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className="text-base">{feeling}</span>
          </div>
        </div>
        
        <p className="text-sm font-medium">{status}</p>
      </div>
      
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-gray-600 mb-4">
          {bio}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Struggles</h4>
            <h4 className="text-sm font-medium text-gray-700">Recent Activity</h4>
          </div>
          
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-1.5 mb-3 max-w-[50%]">
              {struggles.map((struggle, index) => (
                <Badge 
                  key={index} 
                  variant={getTagVariant(struggle) as any}
                  className="text-[10px] px-2 py-0.5 shadow-sm font-medium"
                >
                  {struggle}
                </Badge>
              ))}
            </div>
            
            <div className="space-y-2">
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
        </div>
        
        <div className="border-t pt-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span 
                key={index} 
                className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full hover:bg-blue-100 cursor-pointer"
              >
                {interest}
                {index < interests.length - 1 && ", "}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-0 mt-auto">
        <div className="flex items-center justify-between w-full border-t">
          {connectionStatus === 'idle' ? (
            <Button 
              variant="subtle" 
              size="compact" 
              className="rounded-none m-0 py-3 w-1/3 font-normal"
              onClick={handleConnectClick}
              style={{ backgroundColor: '#F1F5FF', color: '#6699FF' }}
            >
              <UserPlus className="h-4 w-4 mr-1" />
              CONNECT
            </Button>
          ) : (
            <div className="rounded-none m-0 py-3 w-1/3 font-normal text-center text-gray-600 bg-gray-100">
              AWAITING CONNECTION
            </div>
          )}
          <Button
            variant="subtle"
            size="compact"
            className="rounded-none m-0 py-3 w-1/3 font-normal"
            onClick={handleMessageClick}
            style={{ backgroundColor: '#F1F5FF', color: '#6699FF' }}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            MESSAGE
          </Button>
          <Link to={`/user-profile/${userId}`} className="w-1/3">
            <Button 
              variant="ghost" 
              size="compact" 
              className="rounded-none m-0 py-3 w-full font-normal text-gray-600 hover:text-gray-900"
            >
              VIEW PROFILE
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ConnectionCard;
