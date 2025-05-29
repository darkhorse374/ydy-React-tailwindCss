
import React from "react";
import { format } from "date-fns";
import { CalendarIcon, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import DateList from "./DateList";
import { Meeting } from "@/types/meeting";

interface MeetingCalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onScheduleMeeting: () => void;
  isDayWithMeeting: (day: Date) => boolean;
  meetings: Meeting[];
  onViewMeeting?: (meeting: Meeting) => void;
}

const MeetingCalendar = ({
  date,
  setDate,
  onScheduleMeeting,
  isDayWithMeeting,
  meetings,
  onViewMeeting
}: MeetingCalendarProps) => {
  const getMeetingsForDate = (selectedDate: Date | undefined) => {
    if (!selectedDate) return [];
    
    const dateString = selectedDate.toISOString().split('T')[0];
    return meetings.filter(meeting => {
      const meetingDate = new Date(meeting.date).toISOString().split('T')[0];
      return meetingDate === dateString;
    });
  };

  const meetingsForSelectedDate = getMeetingsForDate(date);

  const handleMeetingClick = (meeting: Meeting) => {
    if (onViewMeeting) {
      onViewMeeting(meeting);
    }
  };

  const truncateDescription = (description: string, maxLength: number = 60) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Calendar</h2>
        <CalendarIcon className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="flex flex-1 min-h-[400px]">
        {/* Left side - Date list */}
        <div className="w-1/3 border-r border-gray-200">
          <DateList 
            selectedDate={date || new Date()}
            onSelectDate={setDate}
            isDayWithMeeting={isDayWithMeeting}
          />
        </div>
        
        {/* Right side - Meetings for selected date */}
        <div className="w-2/3 p-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium">
              {date ? format(date, "MMMM d, yyyy") : "Select a date"}
            </h3>
            <p className="text-sm text-gray-500">
              {meetingsForSelectedDate.length} meetings scheduled
            </p>
          </div>
          
          {meetingsForSelectedDate.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center">
              <p className="text-gray-500 mb-4">No meetings scheduled for this day</p>
              <Button 
                onClick={onScheduleMeeting} 
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Plus size={16} />
                Schedule Meeting
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {meetingsForSelectedDate.map((meeting) => (
                <div 
                  key={meeting.id}
                  className="p-3 border border-gray-200 rounded-md hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
                  onClick={() => handleMeetingClick(meeting)}
                >
                  <div className="font-medium">{meeting.title}</div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {meeting.time} - Hosted by {meeting.host}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users size={14} />
                      <span>{meeting.registrants.length}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {truncateDescription(meeting.description)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <Button 
          onClick={onScheduleMeeting} 
          variant="blue-custom"
          className="flex items-center gap-2 w-full justify-center"
        >
          <Plus size={16} />
          Schedule Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingCalendar;
