
import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useJournal } from "@/hooks/useJournal";
import JournalToolbar from "@/components/journal/JournalToolbar";
import JournalDisplay from "@/components/journal/JournalDisplay";
import JournalEditor from "@/components/journal/JournalEditor";
import JournalHistory from "@/components/journal/JournalHistory";

const JournalPage = () => {
  const {
    displayedEntry,
    journalEntry,
    setJournalEntry,
    showJournalHistory,
    setShowJournalHistory,
    currentTopic,
    currentDate,
    journalHistory,
    generateNewTopic,
    saveJournalEntry,
    handleSelectJournalEntry
  } = useJournal();

  if (showJournalHistory) {
    return (
      <div className="p-6 animate-fade-in">
        <JournalHistory 
          journalHistory={journalHistory}
          onSelectEntry={handleSelectJournalEntry}
          onBack={() => setShowJournalHistory(false)}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <Card className="border shadow-md bg-white/90 backdrop-blur-sm">
        <CardHeader className="p-0">
          <JournalToolbar 
            currentDate={currentDate}
            onGenerateNewTopic={generateNewTopic}
            onShowHistory={() => setShowJournalHistory(true)}
          />
        </CardHeader>
        
        <CardContent className="pt-4 pb-6 bg-gradient-to-br from-[#EDF2FF]/30 to-white">
          <JournalDisplay 
            topic={currentTopic}
            displayedEntry={displayedEntry}
          />
          
          <JournalEditor 
            journalEntry={journalEntry}
            setJournalEntry={setJournalEntry}
            saveJournalEntry={saveJournalEntry}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalPage;
