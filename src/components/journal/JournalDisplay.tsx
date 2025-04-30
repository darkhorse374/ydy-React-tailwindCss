
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface JournalDisplayProps {
  topic: string;
  displayedEntry: string;
}

const JournalDisplay = ({ topic, displayedEntry }: JournalDisplayProps) => {
  return (
    <>
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[#6699FF]">Topic: {topic}</h2>
      </div>
      
      <ScrollArea className="rounded-md border bg-white/80 shadow-inner" style={{ height: "550px" }}>
        <div className="p-6 whitespace-pre-line text-base leading-relaxed text-gray-800">
          {displayedEntry}
        </div>
      </ScrollArea>
    </>
  );
};

export default JournalDisplay;
