
import React from "react";

interface ReadTimeSelectorProps {
  readTime: string;
  setReadTime: (readTime: string) => void;
}

const ReadTimeSelector = ({ readTime, setReadTime }: ReadTimeSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="text-sm text-gray-600">Estimated Read Time</div>
      <div className="w-20">
        <select 
          value={readTime} 
          onChange={(e) => setReadTime(e.target.value)}
          className="h-8 rounded-md border border-input bg-background px-3 text-sm"
        >
          {[3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map((minutes) => (
            <option key={minutes} value={minutes.toString()}>
              {minutes}
            </option>
          ))}
        </select>
      </div>
      <div className="text-sm text-gray-600">minutes</div>
    </div>
  );
};

export default ReadTimeSelector;
