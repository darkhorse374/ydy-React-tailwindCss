
import React from "react";

interface ChatChannel {
  id: string;
  name: string;
  description?: string;
}

interface ChatHeaderProps {
  currentChannel: ChatChannel | undefined;
  communityName: string;
}

export const ChatHeader = ({ currentChannel, communityName }: ChatHeaderProps) => {
  return (
    <>
      {currentChannel && (
        <div className="px-4 py-3 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold flex items-center">
            {currentChannel.name === "Meds and Mania" && (
              <span className="mr-2 text-red-500">🔴</span>
            )}
            {communityName} | {currentChannel.name}
          </h2>
          {currentChannel.id === "meds-mania" && (
            <div className="text-sm text-gray-600 mt-1">
              <p>Respect everyone's experiences – what works for one person may not work for another. Avoid giving direct medical advice; share personal experiences but encourage consulting a doctor for medical concerns.</p>
              <p className="mt-1">Keep discussions supportive and non-judgmental – this is a space for learning, sharing, and navigating medication and mania together.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};
