
import React from "react";
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, 
  Users, Copy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ControlBarProps {
  meetingId: string | undefined;
  meetingTitle?: string;
  isMuted: boolean;
  isVideoOff: boolean;
  toggleMute: () => void;
  toggleVideo: () => void;
  leaveMeeting: () => void;
  openParticipants: () => void;
}

const ControlBar = ({
  meetingId,
  meetingTitle,
  isMuted,
  isVideoOff,
  toggleMute,
  toggleVideo,
  leaveMeeting,
  openParticipants
}: ControlBarProps) => {
  const { toast } = useToast();
  
  const copyMeetingLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/video-meeting/${meetingId}`);
    toast({
      title: "Meeting link copied",
      description: "The meeting link has been copied to your clipboard",
      duration: 3000,
    });
  };

  return (
    <div className="bg-sky-100 py-3 px-4 flex items-center justify-between border-b border-[#93C5FD]/30 shadow-sm">
      <div className="text-gray-700">
        <h1 className="text-lg font-medium">
          {meetingTitle || `Meeting #${meetingId}`}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Meeting Link</span>
          <Button 
            variant="ghost" 
            size="icon"
            className="h-6 w-6 text-gray-500 hover:text-[#3B82F6] hover:bg-[#93C5FD]/20"
            onClick={copyMeetingLink}
          >
            <Copy size={14} />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant={isMuted ? "destructive" : "ghost"}
          size="icon"
          className={isMuted ? "bg-red-500/80 hover:bg-red-600" : "text-gray-600 hover:bg-[#93C5FD]/20 hover:text-[#3B82F6]"}
          onClick={toggleMute}
        >
          {isMuted ? <MicOff /> : <Mic />}
        </Button>
        
        <Button
          variant={isVideoOff ? "destructive" : "ghost"}
          size="icon"
          className={isVideoOff ? "bg-red-500/80 hover:bg-red-600" : "text-gray-600 hover:bg-[#93C5FD]/20 hover:text-[#3B82F6]"}
          onClick={toggleVideo}
        >
          {isVideoOff ? <VideoOff /> : <Video />}
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:bg-[#93C5FD]/20 hover:text-[#3B82F6]"
          onClick={openParticipants}
        >
          <Users />
        </Button>
        
        <Button
          variant="destructive"
          size="icon"
          className="bg-red-500 hover:bg-red-600"
          onClick={leaveMeeting}
        >
          <PhoneOff />
        </Button>
      </div>
    </div>
  );
};

export default ControlBar;
