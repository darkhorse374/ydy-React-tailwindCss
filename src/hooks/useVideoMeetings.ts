
import { useState } from "react";
import { Meeting } from "@/types/meeting";
import { addDays, startOfDay } from "date-fns";

// Initial meetings data
const initialMeetings = [
  {
    id: 1,
    title: "Team Catchup",
    date: addDays(startOfDay(new Date()), 1).toISOString(),
    time: "10:00 AM",
    duration: 45,
    host: "Jane Smith",
    description: "Weekly team catchup to discuss progress and challenges",
    registrants: [
      { id: 101, name: "Alex Johnson", avatar: "/placeholder.svg" },
      { id: 102, name: "Sam Wilson", avatar: "/placeholder.svg" },
      { id: 103, name: "Taylor Brown", avatar: "/placeholder.svg" },
    ]
  },
  {
    id: 2,
    title: "Anxiety Support Group",
    date: addDays(startOfDay(new Date()), 3).toISOString(),
    time: "3:00 PM",
    duration: 60,
    host: "Dr. Michael Chen",
    description: "Support group for discussing anxiety management techniques",
    registrants: [
      { id: 201, name: "Jordan Lee", avatar: "/placeholder.svg" },
      { id: 202, name: "Casey Morgan", avatar: "/placeholder.svg" },
      { id: 203, name: "Robin Taylor", avatar: "/placeholder.svg" },
      { id: 204, name: "Bailey Parker", avatar: "/placeholder.svg" },
    ]
  },
  {
    id: 3,
    title: "Project Planning",
    date: addDays(startOfDay(new Date()), 0).toISOString(),
    time: "2:00 PM",
    duration: 30,
    host: "Morgan Rivera",
    description: "Planning session for the upcoming project sprint",
    registrants: [
      { id: 301, name: "Jamie Wong", avatar: "/placeholder.svg" },
      { id: 302, name: "Riley Patel", avatar: "/placeholder.svg" },
    ]
  },
  {
    id: 4,
    title: "Product Demo",
    date: addDays(startOfDay(new Date()), 2).toISOString(),
    time: "11:00 AM",
    duration: 60,
    host: "Alex Thompson",
    description: "Demonstration of new features for client feedback",
    registrants: [
      { id: 401, name: "Dakota Smith", avatar: "/placeholder.svg" },
      { id: 402, name: "Jordan Kim", avatar: "/placeholder.svg" },
      { id: 403, name: "Taylor Meyer", avatar: "/placeholder.svg" },
    ]
  },
];

export const useVideoMeetings = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [detailsSheetOpen, setDetailsSheetOpen] = useState(false);

  const handleScheduleMeeting = (values: any) => {
    const newMeeting = {
      id: meetings.length + 1,
      ...values,
      date: values.date.toISOString(),
      host: "You",
      registrants: [],
    };
    
    setMeetings([...meetings, newMeeting]);
    setCreateModalOpen(false);
  };

  const handleViewMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setDetailsSheetOpen(true);
  };

  const isDayWithMeeting = (day: Date) => {
    const dateString = day.toISOString().split('T')[0];
    return meetings.some(meeting => {
      const meetingDate = new Date(meeting.date).toISOString().split('T')[0];
      return meetingDate === dateString;
    });
  };

  return {
    date,
    setDate,
    meetings,
    createModalOpen,
    setCreateModalOpen,
    selectedMeeting,
    detailsSheetOpen,
    setDetailsSheetOpen,
    handleScheduleMeeting,
    handleViewMeeting,
    isDayWithMeeting
  };
};
