
import React from "react";
import { Clock, Users } from "lucide-react";
import { Meeting } from "@/types/meeting";

interface MeetingCardProps {
  meeting: Meeting;
  onClick: () => void;
}

const MeetingCard = ({ meeting, onClick }: MeetingCardProps) => {
  return (
    <div 
      className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-lg">{meeting.title}</h3>
        <span className="text-sm text-gray-500">{meeting.time}</span>
      </div>
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{meeting.duration} min</span>
        </div>
        <div className="flex items-center gap-1">
          <Users size={14} />
          <span>{meeting.registrants.length} attendees</span>
        </div>
      </div>
      <p className="text-sm text-gray-600 line-clamp-2">{meeting.description}</p>
    </div>
  );
};

export default MeetingCard;
