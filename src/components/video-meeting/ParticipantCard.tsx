
import React from "react";
import { MicOff, CameraOff } from "lucide-react";
import { Participant } from "@/types/video";

interface ParticipantCardProps {
  participant: Participant;
}

const ParticipantCard = ({ participant }: ParticipantCardProps) => {
  return (
    <div
      className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center"
    >
      {participant.isVideoOff ? (
        <div className="flex flex-col items-center justify-center">
          {participant.hasPicture ? (
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1501286353178-1ec881214838?auto=format&fit=crop&w=200&h=200" 
                alt={participant.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl">
              {participant.name.charAt(0)}
            </div>
          )}
          <div className="mt-2 text-white">{participant.name}</div>
        </div>
      ) : (
        <>
          <img
            src={participant.avatar}
            alt={participant.name}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.7)" }}
          />
          <div className="absolute bottom-4 left-4 text-white text-sm bg-black/40 px-2 py-1 rounded">
            {participant.name} {participant.isSelf && "(You)"}
          </div>
        </>
      )}
      {participant.isMuted && (
        <div className="absolute top-4 right-4 bg-black/60 p-1 rounded-full">
          <MicOff size={16} className="text-red-500" />
        </div>
      )}
    </div>
  );
};

export default ParticipantCard;
