import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Heart,
  Calendar,
  Copy,
  Image,
  Sticker,
  Send,
  BookMarked,
  ArrowLeft,
  MessageCircle,
  Users,
  User,
  Eye
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ConnectionRequestModal from "@/components/connections/ConnectionRequestModal";
import { useIsMobile } from "@/hooks/use-mobile";

const profileData = {
  id: 1,
  name: "Jane Doe",
  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  tagline: "Finding hope in the journey",
  bio: "Living with anxiety and depression has been a challenging path, but I'm learning to embrace each day with hope. Here to connect with others who understand and to share our stories of resilience.",
  feeling: "😊",
  lastSeen: "2 hours ago",
  joinDate: "June 2023",
  communities: [
    { name: "Anxiety Support", variant: "anxiety" },
    { name: "Mindfulness", variant: "secondary" }
  ],
  themesAndStruggles: [
    { name: "Anxiety", variant: "anxiety" },
    { name: "Depression", variant: "depression" },
    { name: "Social Isolation", variant: "isolation" },
    { name: "Self-care", variant: "secondary" }
  ],
  aboutTags: [
    { name: "Parent", variant: "default" },
    { name: "Dog lover", variant: "default" },
    { name: "Creative", variant: "default" },
    { name: "Therapist", variant: "default" }
  ],
  demographics: {
    location: "Seattle, WA",
    age: "32",
    gender: "Female",
    language: "English",
    school: "University of Washington",
    work: "Mental Health Clinic",
    occupation: "Therapist"
  },
  socials: {
    website: "www.janedoe.com",
    instagram: "@janedoe",
    twitter: "@janedoe_therapy"
  },
  posts: [
    {
      id: 1,
      title: "Finding Peace in Chaos",
      date: "May 15, 2024",
      content: "Today I practiced mindfulness during a particularly stressful work meeting. By focusing on my breathing and staying present, I was able to reduce my anxiety and contribute meaningfully to the discussion. Small wins matter! #MentalHealthJourney #Mindfulness",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      title: "A Letter to My Younger Self",
      date: "May 3, 2024",
      content: "Dear younger me, the path ahead is winding and sometimes steep, but you are stronger than you know. The struggles you face now are shaping your resilience. Trust the journey. #Reflection #Growth",
      likes: 45,
      comments: 12
    }
  ],
  conversations: [
    {
      id: 1,
      sender: {
        id: 2,
        name: "Sam Wilson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      messages: [
        {
          id: 1,
          sender: 2,
          text: "Hey Jane, how have you been doing lately? I noticed your post about mindfulness and it really resonated with me.",
          time: "10:30 AM"
        },
        {
          id: 2,
          sender: 1,
          text: "Hi Sam! I've been doing pretty well, taking things one day at a time. I'm glad my post resonated with you. Mindfulness has been a game-changer for me in managing anxiety.",
          time: "10:45 AM"
        },
        {
          id: 3,
          sender: 2,
          text: "That's great to hear. Would you mind sharing some of your mindfulness practices? I've been trying to incorporate more into my daily routine.",
          time: "11:02 AM"
        },
        {
          id: 4,
          sender: 1,
          text: "Of course! I start each morning with a 10-minute meditation, and I try to take short breathing breaks throughout the day. I also found that mindful walking helps me a lot when I'm feeling overwhelmed.",
          time: "11:15 AM"
        },
        {
          id: 5,
          sender: 2,
          text: "That sounds doable. I'll try starting with the morning meditation. Thanks for sharing, Jane!",
          time: "11:20 AM"
        }
      ]
    }
  ],
  connections: [
    {
      id: 1,
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      status: "Finding balance each day",
      bio: "Navigating life with anxiety and depression. I'm passionate about art therapy and community support.",
      struggles: ["Anxiety", "Depression", "Work Stress"],
      interests: ["Art", "Hiking", "Reading", "Support Groups"]
    },
    {
      id: 2,
      name: "Michael Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      status: "One step at a time",
      bio: "Recovering from burnout and rebuilding my relationship with work. Finding joy in small moments.",
      struggles: ["Burnout", "Anxiety", "Sleep Issues"],
      interests: ["Photography", "Cooking", "Meditation", "Nature"]
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
      status: "Embracing my journey",
      bio: "Living with PTSD and finding strength through community connection and storytelling.",
      struggles: ["PTSD", "Trauma", "Social Anxiety"],
      interests: ["Writing", "Advocacy", "Yoga", "Pets"]
    }
  ]
};

const getStruggleVariant = (struggle: string): string => {
  const struggleLower = struggle.toLowerCase();
  if (struggleLower.includes("depression")) return "depression";
  if (struggleLower.includes("anxiety")) return "anxiety";
  if (struggleLower.includes("isolation")) return "isolation";
  if (struggleLower.includes("burnout") || struggleLower.includes("stress")) return "stress";
  if (struggleLower.includes("trauma") || struggleLower.includes("ptsd")) return "trauma";
  if (struggleLower.includes("sleep")) return "insomnia";
  return "default";
};

const UserProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("about");
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [showBackButton, setShowBackButton] = useState(false);
  const [backButtonPath, setBackButtonPath] = useState("/dashboard");
  const [backButtonText, setBackButtonText] = useState("Back to Dashboard");
  const [connectionRequestModalOpen, setConnectionRequestModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }, 100);
    
    const secondTimer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }, 300);
    
    const state = location.state as { from?: string; isChatRedirect?: boolean } | null;
    const fromPath = state?.from;
    const isChatRedirect = state?.isChatRedirect;
    
    if (isChatRedirect && fromPath) {
      setShowBackButton(true);
      setBackButtonPath(fromPath);
      setBackButtonText("Back to Chat");
    } else {
      const referrer = document.referrer;
      const isPeopleReferrer = referrer.includes('/people') || referrer.includes('/connections');
      const isFromPeople = location.pathname.includes('/user-profile') && (location.state as any)?.fromPeople;
      
      setShowBackButton(true);
      
      if (isPeopleReferrer || isFromPeople) {
        setBackButtonPath("/people");
        setBackButtonText("Back to People");
      } else {
        const isDashboardReferrer = referrer.includes('/dashboard');
        setBackButtonPath("/dashboard");
        setBackButtonText("Back to Dashboard");
      }
    }
    
    return () => {
      clearTimeout(timer);
      clearTimeout(secondTimer);
    };
  }, [location, params.id]);
  
  useEffect(() => {
    if (activeTab === "chat") {
      scrollChatToBottom();
    }
  }, [activeTab]);
  
  const scrollChatToBottom = () => {
    if (chatScrollAreaRef.current) {
      setTimeout(() => {
        const scrollContainer = chatScrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }, 100);
    }
  };
  
  const handleGoBack = () => {
    navigate(backButtonPath);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleSendConnectionRequest = () => {
    setConnectionRequestModalOpen(true);
  };

  const closeConnectionRequestModal = () => {
    setConnectionRequestModalOpen(false);
  };

  const handleMessageClick = () => {
    navigate(`/direct-message/${profileData.id}`);
  };

  return (
    <div className="p-4 md:p-6 max-w-5xl mx-auto">
      {showBackButton && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
          onClick={handleGoBack}
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          {backButtonText}
        </Button>
      )}
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 md:p-6 mb-6">
        <div className="flex items-start gap-4 md:gap-6">
          <Avatar className="h-20 w-20 md:h-24 md:w-24 border-2 border-white shadow-md">
            <AvatarImage src={profileData.avatar} alt={profileData.name} />
            <AvatarFallback>{profileData.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start">
              <div className={isMobile ? "flex flex-col" : "flex items-center gap-2"}>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{profileData.name}</h1>
                  {!isMobile && <span>{profileData.feeling}</span>}
                </div>
                {isMobile && (
                  <div className="flex items-center gap-2 mb-1">
                    <span>{profileData.feeling}</span>
                    <span className="text-xs text-gray-400">Last seen {profileData.lastSeen}</span>
                  </div>
                )}
              </div>
              {!isMobile && (
                <div>
                  <span className="text-xs text-gray-400">Last seen {profileData.lastSeen}</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-600 mb-1">{profileData.tagline}</p>
            <p className="text-gray-700 text-sm mt-2 mb-4">{profileData.bio}</p>
            
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center text-xs text-gray-500">
                <Calendar className="h-3 w-3 mr-1" />
                Joined {profileData.joinDate}
              </div>
              
              <div className="flex items-center text-xs text-gray-500">
                <Users className="h-3 w-3 mr-1" />
                Active in: Mindful Community
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button 
            variant="subtle-blue" 
            size="sm" 
            className="flex-1"
            onClick={handleMessageClick}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
          </Button>
          <Button 
            variant="blue-custom" 
            size="sm" 
            className="flex-1"
            onClick={handleSendConnectionRequest}
          >
            Connect
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-4">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="chat">Messages</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardContent className="px-4 py-6">
              <div className="mb-6">
                <h4 className="font-medium text-sm mb-3">Struggles</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profileData.themesAndStruggles.map((theme, index) => (
                    <Badge key={index} variant={theme.variant as any} className="shadow-sm">
                      {theme.name}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-sm mb-3">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="shadow-sm bg-indigo-100 text-indigo-700 border border-indigo-200">Reading</Badge>
                  <Badge className="shadow-sm bg-indigo-100 text-indigo-700 border border-indigo-200">Art Therapy</Badge>
                  <Badge className="shadow-sm bg-indigo-100 text-indigo-700 border border-indigo-200">Mindfulness</Badge>
                  <Badge className="shadow-sm bg-indigo-100 text-indigo-700 border border-indigo-200">Hiking</Badge>
                </div>
              </div>
              
              <h4 className="font-medium text-sm mb-2">Demographics</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-6">
                <div>
                  <p className="text-gray-500">Location</p>
                  <p>{profileData.demographics.location}</p>
                </div>
                <div>
                  <p className="text-gray-500">Age</p>
                  <p>{profileData.demographics.age}</p>
                </div>
                <div>
                  <p className="text-gray-500">Gender</p>
                  <p>{profileData.demographics.gender}</p>
                </div>
                <div>
                  <p className="text-gray-500">Language</p>
                  <p>{profileData.demographics.language}</p>
                </div>
                <div>
                  <p className="text-gray-500">School</p>
                  <p>{profileData.demographics.school}</p>
                </div>
                <div>
                  <p className="text-gray-500">Work</p>
                  <p>{profileData.demographics.work}</p>
                </div>
                <div>
                  <p className="text-gray-500">Occupation</p>
                  <p>{profileData.demographics.occupation}</p>
                </div>
              </div>
              
              <h4 className="font-medium text-sm mb-2">Social</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <a href={`https://${profileData.socials.website}`} className="text-blue-500 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                    {profileData.socials.website}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-gray-500" />
                  <a href={`https://instagram.com/${profileData.socials.instagram.replace('@', '')}`} className="text-blue-500 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                    {profileData.socials.instagram}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-gray-500" />
                  <a href={`https://twitter.com/${profileData.socials.twitter.replace('@', '')}`} className="text-blue-500 hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                    {profileData.socials.twitter}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="chat" className="space-y-4">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={profileData.conversations[0].sender.avatar} alt={profileData.conversations[0].sender.name} />
                  <AvatarFallback>{profileData.conversations[0].sender.name[0]}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium">{profileData.conversations[0].sender.name}</h3>
              </div>
            </div>
            <CardContent className="p-4">
              <ScrollArea className="h-[300px] pr-4" ref={chatScrollAreaRef}>
                {profileData.conversations[0].messages.map((message) => (
                  <div key={message.id} className={`mb-4 ${message.sender === profileData.id ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block rounded-lg p-3 max-w-[80%] shadow-sm ${message.sender === profileData.id ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-800'}`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                  </div>
                ))}
              </ScrollArea>
              
              <div className="mt-4 flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 rounded-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Type a message..."
                />
                <Button size="sm" variant="blue-custom">Send</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="connections" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileData.connections.map((connection) => (
              <ConnectionCard 
                key={connection.id} 
                connection={connection} 
                getStruggleVariant={getStruggleVariant}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <ConnectionRequestModal 
        isOpen={connectionRequestModalOpen}
        onClose={closeConnectionRequestModal}
      />
    </div>
  );
};

interface ConnectionCardProps {
  connection: {
    id: number;
    name: string;
    avatar: string;
    status: string;
    bio: string;
    struggles: string[];
    interests: string[];
  };
  getStruggleVariant: (struggle: string) => string;
}

const ConnectionCard = ({ connection, getStruggleVariant }: ConnectionCardProps) => {
  const { name, avatar, status, bio, struggles, interests } = connection;
  const [connectionRequestModalOpen, setConnectionRequestModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSendConnectionRequest = () => {
    setConnectionRequestModalOpen(true);
  };

  const closeConnectionRequestModal = () => {
    setConnectionRequestModalOpen(false);
  };
  
  const handleMessageClick = () => {
    navigate(`/direct-message/${connection.id}`);
  };
  
  return (
    <Card className="overflow-hidden shadow-sm border border-gray-200">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <div className="flex items-center gap-3 mb-2">
          <Avatar>
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{name}</h3>
          </div>
        </div>
        
        <p className="text-sm font-medium">{status}</p>
      </div>
      
      <CardContent className="p-4">
        <p className="text-sm text-gray-600 mb-3">
          {bio}
        </p>
        
        <div className="mb-3">
          <h4 className="text-sm font-medium mb-1">Struggles</h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {struggles.map((struggle, index) => (
              <Badge 
                key={index} 
                variant={getStruggleVariant(struggle) as any}
                className="shadow-sm"
              >
                {struggle}
              </Badge>
            ))}
          </div>
          
          <h4 className="text-sm font-medium mb-1">Interests</h4>
          <div className="text-xs text-blue-500 mb-4">
            {interests.join(', ')}
          </div>
        </div>
        
        <div className="flex gap-2 mt-2">
          <Button 
            variant="subtle-blue" 
            size="sm"
            className="flex-1"
            onClick={handleMessageClick}
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Message
          </Button>
          
          <Button 
            variant="blue-custom"
            size="sm"
            className="flex-1"
            onClick={handleSendConnectionRequest}
          >
            Connect
          </Button>
        </div>

        <ConnectionRequestModal 
          isOpen={connectionRequestModalOpen}
          onClose={closeConnectionRequestModal}
        />
      </CardContent>
    </Card>
  );
};

export default UserProfilePage;
