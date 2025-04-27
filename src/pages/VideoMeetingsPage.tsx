
import React from "react";
import { Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useVideoMeetings } from "@/hooks/useVideoMeetings";
import MeetingCalendar from "@/components/video-meeting/MeetingCalendar";
import CreateMeetingForm from "@/components/video-meeting/CreateMeetingForm";
import MeetingDetails from "@/components/video-meeting/MeetingDetails";

const VideoMeetingsPage = () => {
  const navigate = useNavigate();
  const {
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
  } = useVideoMeetings();

  const handleJoinMeeting = (meetingId: number) => {
    navigate(`/video-meeting/${meetingId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Video className="h-8 w-8 text-[#6699FF]" />
          <h1 className="text-3xl font-bold">Video Meetings</h1>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <MeetingCalendar 
          date={date}
          setDate={setDate}
          onScheduleMeeting={() => setCreateModalOpen(true)}
          isDayWithMeeting={isDayWithMeeting}
          meetings={meetings}
          onViewMeeting={handleViewMeeting}
        />
      </div>

      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Schedule a New Meeting</DialogTitle>
            <DialogDescription>
              Complete the form below to create a new video meeting.
            </DialogDescription>
          </DialogHeader>
          <CreateMeetingForm 
            onSubmit={handleScheduleMeeting} 
            onCancel={() => setCreateModalOpen(false)} 
          />
        </DialogContent>
      </Dialog>

      <Sheet open={detailsSheetOpen} onOpenChange={setDetailsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          {selectedMeeting && (
            <MeetingDetails 
              meeting={selectedMeeting} 
              onJoinMeeting={handleJoinMeeting} 
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default VideoMeetingsPage;
