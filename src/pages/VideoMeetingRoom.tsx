import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import VideoGrid from "@/components/video-meeting/VideoGrid";
import ControlBar from "@/components/video-meeting/ControlBar";
import ParticipantsSidebar from "@/components/video-meeting/ParticipantsSidebar";
import { Participant } from "@/types/video";
import { useVideoMeetings } from "@/hooks/useVideoMeetings";

// Mock participants data
const mockAttendees: Participant[] = [
  { id: 1, name: "You", isSelf: true, isMuted: false, isVideoOff: false, avatar: "/placeholder.svg" },
  { id: 2, name: "Alex Johnson", isMuted: true, isVideoOff: false, avatar: "/placeholder.svg" },
  { id: 3, name: "Sam Wilson", isMuted: false, isVideoOff: true, avatar: "/placeholder.svg", hasPicture: true },
  { id: 4, name: "Jordan Lee", isMuted: false, isVideoOff: false, avatar: "/placeholder.svg" },
  { id: 5, name: "Taylor Swift", isMuted: true, isVideoOff: true, avatar: "/placeholder.svg" },
  { id: 6, name: "Jamie Rodriguez", isMuted: false, isVideoOff: false, avatar: "/placeholder.svg" },
  { id: 7, name: "Casey Williams", isMuted: true, isVideoOff: false, avatar: "/placeholder.svg" },
  { id: 8, name: "Riley Parker", isMuted: false, isVideoOff: true, avatar: "/placeholder.svg" },
];

const VideoMeetingRoom = () => {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const { meetings } = useVideoMeetings();
  
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [participants, setParticipants] = useState(mockAttendees);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [currentMeeting, setCurrentMeeting] = useState<{ title: string } | null>(null);
  
  // Fetch meeting details when component mounts
  useEffect(() => {
    if (meetingId && meetings.length > 0) {
      const meeting = meetings.find(m => m.id === parseInt(meetingId));
      if (meeting) {
        setCurrentMeeting(meeting);
      }
    }
  }, [meetingId, meetings]);
  
  // Update the local participant when state changes
  useEffect(() => {
    setParticipants(prev => 
      prev.map(participant => 
        participant.isSelf 
          ? { ...participant, isMuted, isVideoOff }
          : participant
      )
    );
  }, [isMuted, isVideoOff]);
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      title: !isMuted ? "Microphone muted" : "Microphone unmuted",
      duration: 2000,
    });
    // Here you would actually mute the microphone
  };
  
  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);
    toast({
      title: !isVideoOff ? "Camera turned off" : "Camera turned on",
      duration: 2000,
    });
    // Here you would actually turn off the camera
  };
  
  const leaveMeeting = () => {
    navigate("/video-meetings");
    toast({
      title: "Left meeting",
      description: `You have left ${currentMeeting?.title || `meeting #${meetingId}`}`,
      duration: 3000,
    });
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#EBF4FF] to-[#F8FAFC]">
      {/* Meeting header with controls */}
      <ControlBar 
        meetingId={meetingId}
        meetingTitle={currentMeeting?.title}
        isMuted={isMuted}
        isVideoOff={isVideoOff}
        toggleMute={toggleMute}
        toggleVideo={toggleVideo}
        leaveMeeting={leaveMeeting}
        openParticipants={() => setParticipantsOpen(true)}
      />
      
      {/* Video grid */}
      <VideoGrid participants={participants} />
      
      {/* Participants sidebar */}
      <ParticipantsSidebar 
        isOpen={participantsOpen}
        onOpenChange={setParticipantsOpen}
        participants={participants}
      />
    </div>
  );
};

export default VideoMeetingRoom;
