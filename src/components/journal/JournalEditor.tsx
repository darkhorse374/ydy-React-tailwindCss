
import React from "react";
import { 
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Heading1,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface JournalEditorProps {
  journalEntry: string;
  setJournalEntry: (value: string) => void;
  saveJournalEntry: () => void;
}

const JournalEditor = ({ 
  journalEntry, 
  setJournalEntry, 
  saveJournalEntry 
}: JournalEditorProps) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-wrap items-center gap-1 border-t border-b py-2 bg-[#D3E4FD]/30">
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-[#D3E4FD]/60">
          <Bold className="h-4 w-4 text-[#6699FF]" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-[#D3E4FD]/60">
          <Italic className="h-4 w-4 text-[#6699FF]" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-[#D3E4FD]/60">
          <Underline className="h-4 w-4 text-[#6699FF]" />
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-[#D3E4FD]/60">
          <AlignLeft className="h-4 w-4 text-[#6699FF]" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-[#D3E4FD]/60">
          <AlignCenter className="h-4 w-4 text-[#6699FF]" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-[#D3E4FD]/60">
          <AlignRight className="h-4 w-4 text-[#6699FF]" />
        </Button>
        <Separator orientation="vertical" className="h-6 mx-1" />
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-[#D3E4FD]/60">
          <List className="h-4 w-4 text-[#6699FF]" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-[#D3E4FD]/60">
          <ListOrdered className="h-4 w-4 text-[#6699FF]" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 hover:bg-[#D3E4FD]/60">
          <Heading1 className="h-4 w-4 text-[#6699FF]" />
        </Button>
      </div>
      
      <div className="flex flex-col space-y-3">
        <Textarea 
          placeholder="Add to your journal entry..." 
          className="min-h-[180px] resize-none focus:ring-2 focus:ring-[#6699FF]/20 transition-all shadow-sm bg-white"
          value={journalEntry}
          onChange={(e) => {
            setJournalEntry(e.target.value);
          }}
        />
        
        <Button 
          variant="blue-custom" 
          className="self-end"
          onClick={saveJournalEntry}
          disabled={!journalEntry.trim()}
        >
          Save Entry
        </Button>
      </div>
    </div>
  );
};

export default JournalEditor;
