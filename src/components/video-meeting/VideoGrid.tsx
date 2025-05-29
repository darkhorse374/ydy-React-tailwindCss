
import React from "react";
import { Participant } from "@/types/video";
import ParticipantCard from "./ParticipantCard";

interface VideoGridProps {
  participants: Participant[];
}

const VideoGrid = ({ participants }: VideoGridProps) => {
  return (
    <div className="flex-1 p-4 grid grid-cols-2 gap-4 overflow-y-auto">
      {participants.map((participant) => (
        <ParticipantCard key={participant.id} participant={participant} />
      ))}
    </div>
  );
};

export default VideoGrid;
