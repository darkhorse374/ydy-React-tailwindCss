
import React from "react";
import { Participant } from "@/types/video";
import { MicOff, CameraOff } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface ParticipantsSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  participants: Participant[];
}

const ParticipantsSidebar = ({
  isOpen,
  onOpenChange,
  participants,
}: ParticipantsSidebarProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetHeader className="mb-6">
          <SheetTitle>Participants ({participants.length})</SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    {participant.name} {participant.isSelf && "(You)"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {participant.isMuted && <MicOff size={14} className="text-red-500" />}
                {participant.isVideoOff && <CameraOff size={14} className="text-red-500" />}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ParticipantsSidebar;
