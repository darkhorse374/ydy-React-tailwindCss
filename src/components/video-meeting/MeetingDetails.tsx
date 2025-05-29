
import React, { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock, CheckCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  host: string;
  description: string;
  registrants: { id: number; name: string; avatar: string }[];
}

interface MeetingDetailsProps {
  meeting: Meeting;
  onJoinMeeting: (id: number) => void;
}

const MeetingDetails = ({ meeting, onJoinMeeting }: MeetingDetailsProps) => {
  const { toast } = useToast();
  const [isRegistered, setIsRegistered] = useState(false);
  
  const handleRegister = () => {
    setIsRegistered(true);
    toast({
      title: "Successfully registered",
      description: `You are now registered for "${meeting.title}"`,
    });
  };

  return (
    <>
      <SheetHeader className="mb-6">
        <SheetTitle>{meeting.title}</SheetTitle>
        <SheetDescription>
          Hosted by {meeting.host}
        </SheetDescription>
      </SheetHeader>
      
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarIcon size={16} />
            <span>{format(new Date(meeting.date), "MMMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>{meeting.time} • {meeting.duration} minutes</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users size={16} />
            <span>{meeting.registrants.length} attendees</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Description</h3>
          <p className="text-sm text-gray-600">{meeting.description}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Attendees ({meeting.registrants.length})</h3>
          <div className="space-y-2">
            {meeting.registrants.map((person) => (
              <div key={person.id} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src={person.avatar} 
                    alt={person.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm">{person.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-6 space-y-3">
          {isRegistered ? (
            <div className="flex items-center justify-center gap-2 p-2 bg-green-50 text-green-600 rounded-md mb-3">
              <CheckCircle size={16} />
              <span className="text-sm font-medium">You are registered for this meeting</span>
            </div>
          ) : (
            <Button 
              onClick={handleRegister} 
              variant="outline"
              className="w-full"
            >
              Register for Meeting
            </Button>
          )}
          <Button 
            onClick={() => onJoinMeeting(meeting.id)} 
            className="w-full"
            variant="blue-custom"
          >
            Join Meeting
          </Button>
        </div>
      </div>
    </>
  );
};

export default MeetingDetails;
