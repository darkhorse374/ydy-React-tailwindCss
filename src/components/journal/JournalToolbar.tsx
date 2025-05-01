
import React from "react";
import { 
  PenLine, 
  FileText, 
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

interface JournalToolbarProps {
  currentDate: string;
  onGenerateNewTopic: () => void;
  onShowHistory: () => void;
}

const JournalToolbar = ({ 
  currentDate, 
  onGenerateNewTopic, 
  onShowHistory 
}: JournalToolbarProps) => {
  const { toast } = useToast();

  return (
    <div className="flex flex-row items-center justify-between space-y-0 pb-2 border-b bg-gray-50/80">
      <div className="text-sm text-muted-foreground pl-6">
        Last Updated {currentDate}
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-gray-200"
          onClick={onGenerateNewTopic}
        >
          <PenLine className="h-5 w-5 text-[#6699FF]" />
        </Button>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-200">
              <FileText className="h-5 w-5 text-[#6699FF]" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Analyze your journal entry?</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-4">
                I can analyze your journal entry to identify patterns, emotions, and insights that might be helpful for your self-reflection.
              </p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => {}}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Analysis started",
                    description: "Your journal is being analyzed. Results will be available shortly.",
                  });
                }}>
                  Analyze
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-gray-200"
          onClick={onShowHistory}
        >
          <Calendar className="h-5 w-5 text-[#6699FF]" />
        </Button>
      </div>
    </div>
  );
};

export default JournalToolbar;
