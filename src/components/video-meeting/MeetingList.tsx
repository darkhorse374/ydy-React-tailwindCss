
import React from "react";
import { format } from "date-fns";
import { Video, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MeetingCard from "./MeetingCard";
import { Meeting } from "@/types/meeting";

interface MeetingListProps {
  date: Date | undefined;
  meetings: Meeting[];
  onViewMeeting: (meeting: Meeting) => void;
  onScheduleMeeting: () => void;
}

const MeetingList = ({
  date,
  meetings,
  onViewMeeting,
  onScheduleMeeting,
}: MeetingListProps) => {
  const getMeetingsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    const dateString = selectedDate.toISOString().split('T')[0];
    return meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date).toISOString().split('T')[0];
      return meetingDate === dateString;
    });
  };

  const meetingsForSelectedDate = getMeetingsForDate(date);

  return (
    <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          {date ? format(date, "MMMM d, yyyy") : "Select a date"}
        </h2>
        <div className="text-sm text-gray-500">
          {meetingsForSelectedDate.length} meetings scheduled
        </div>
      </div>

      {meetingsForSelectedDate.length === 0 ? (
        <EmptyMeetingState onScheduleMeeting={onScheduleMeeting} />
      ) : (
        <div className="space-y-4">
          {meetingsForSelectedDate.map((meeting) => (
            <MeetingCard 
              key={meeting.id} 
              meeting={meeting} 
              onClick={() => onViewMeeting(meeting)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

const EmptyMeetingState = ({ onScheduleMeeting }: { onScheduleMeeting: () => void }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <Video className="h-16 w-16 text-gray-300 mb-4" />
    <h3 className="text-lg font-medium text-gray-500 mb-2">No meetings scheduled</h3>
    <p className="text-gray-400 mb-6">There are no meetings scheduled for this date</p>
    <Button 
      onClick={onScheduleMeeting} 
      variant="outline"
      className="flex items-center gap-2"
    >
      <Plus size={16} />
      Schedule a Meeting
    </Button>
  </div>
);

export default MeetingList;
