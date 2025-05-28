
import React from "react";
import { format, addDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DateListProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  isDayWithMeeting: (day: Date) => boolean;
  numberOfDays?: number;
}

const DateList: React.FC<DateListProps> = ({
  selectedDate,
  onSelectDate,
  isDayWithMeeting,
  numberOfDays = 30
}) => {
  // Generate dates starting from today
  const dates = Array.from({ length: numberOfDays }, (_, i) => 
    addDays(new Date(), i)
  );

  return (
    <div className="border-r border-gray-200 h-full">
      <ScrollArea className="h-[450px]">
        <div className="flex flex-col">
          {dates.map((date) => {
            const isSelected = isSameDay(date, selectedDate);
            const hasMeeting = isDayWithMeeting(date);
            
            return (
              <button
                key={date.toISOString()}
                onClick={() => onSelectDate(date)}
                className={cn(
                  "py-3 px-4 text-left border-l-2 transition-colors",
                  isSelected 
                    ? "bg-blue-50 border-blue-500 font-medium" 
                    : "border-transparent hover:bg-gray-50",
                  hasMeeting && !isSelected && "border-l-2 border-blue-200"
                )}
              >
                <div className="text-xs text-gray-500">
                  {format(date, "EEEE")}
                </div>
                <div className={cn(
                  "text-sm font-medium",
                  isSelected ? "text-blue-700" : hasMeeting ? "text-blue-600" : "text-gray-700"
                )}>
                  {format(date, "MMMM d")}
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DateList;
