
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JournalEntry {
  id: number;
  date: string;
  topic: string;
  content: string;
}

interface JournalHistoryProps {
  journalHistory: JournalEntry[];
  onSelectEntry: (entry: JournalEntry) => void;
  onBack: () => void;
}

const JournalHistory = ({ journalHistory, onSelectEntry, onBack }: JournalHistoryProps) => {
  const gradientClasses = [
    "bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100",
    "bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100",
    "bg-gradient-to-r from-amber-50 to-yellow-50 hover:from-amber-100 hover:to-yellow-100",
    "bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100",
    "bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100"
  ];

  return (
    <Card className="border shadow-md bg-white/70 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={onBack}
          >
            <ArrowLeft className="h-5 w-5 text-[#6699FF]" />
          </Button>
          <h2 className="text-xl font-semibold text-gray-800">Journal History</h2>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-5">
          {journalHistory.map((entry, index) => (
            <div 
              key={entry.id} 
              className={`p-5 border rounded-xl shadow-sm transition-all duration-200 cursor-pointer transform hover:scale-[1.01] ${gradientClasses[index % gradientClasses.length]}`}
              onClick={() => onSelectEntry(entry)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg text-gray-800">{entry.topic}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm bg-white px-2.5 py-1 rounded-full border text-gray-600 shadow-sm">{entry.date}</span>
                  {index === 0 && (
                    <div className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-800" />
                      <span>Latest</span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-gray-600 line-clamp-3 text-sm mt-2">
                {entry.content.substring(0, 120)}...
              </p>
              <div className="flex justify-between items-center mt-3">
                <div className="text-xs text-gray-500">
                  {Math.ceil(entry.content.length / 500)} min read
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1 text-[#6699FF] hover:text-[#5580DD] hover:bg-[#EDF2FF] px-2"
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  <span className="text-xs">Save</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalHistory;
