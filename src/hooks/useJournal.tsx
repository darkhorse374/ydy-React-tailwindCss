
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export interface JournalEntry {
  id: number;
  date: string;
  topic: string;
  content: string;
}

const journalPrompts = [
  "What made you smile today?",
  "Describe a challenge you're facing and how you might overcome it",
  "What are three things you're grateful for right now?",
  "Write about a recent interaction that affected you emotionally",
  "What do you want your life to look like one year from now?",
  "Describe a recent accomplishment and how it made you feel",
  "What self-care activities would benefit you this week?",
  "Reflect on a past mistake and what you learned from it",
  "Write about someone who inspires you and why",
  "What boundaries do you need to establish or maintain?",
  "How have your priorities changed in the past year?",
  "What brings you peace when you're feeling anxious?",
  "Describe a moment when you felt truly connected to someone",
  "What limiting beliefs are holding you back right now?",
  "Write a letter to your future self one year from now"
];

export const useJournal = () => {
  const [displayedEntry, setDisplayedEntry] = useState(
    "There's one moment that stands out vividly when I think about feeling truly connected. It was a cold evening last winter, and I had just joined a new support group for mental health.\n\nI remember walking in, feeling unsure of what to expect. Would they understand? Would they judge? My anxiety was through the roof, but I stayed because I knew I needed this.\n\nAs the meeting started, people began sharing their stories. The room felt heavy but also safe, like the weight was shared by everyone. When it came to my turn, I hesitated, but then I spoke. Not perfectly, not fluently, but honestly. I talked about my struggles, my fears, and how isolating it sometimes felt..."
  );
  const [journalEntry, setJournalEntry] = useState("");
  const [showJournalHistory, setShowJournalHistory] = useState(false);
  const [currentTopic, setCurrentTopic] = useState("A Time I Felt Truly Connected");
  const [currentDate, setCurrentDate] = useState("Jan 3, 2023 - 10AM");
  const { toast } = useToast();

  const journalHistory: JournalEntry[] = [
    { 
      id: 1,
      date: "Jan 3, 2023", 
      topic: "A Time I Felt Truly Connected",
      content: "There's one moment that stands out vividly when I think about feeling truly connected. It was a cold evening last winter, and I had just joined a new support group for mental health.\n\nI remember walking in, feeling unsure of what to expect. Would they understand? Would they judge? My anxiety was through the roof, but I stayed because I knew I needed this.\n\nAs the meeting started, people began sharing their stories. The room felt heavy but also safe, like the weight was shared by everyone. When it came to my turn, I hesitated, but then I spoke. Not perfectly, not fluently, but honestly. I talked about my struggles, my fears, and how isolating it sometimes felt..."
    },
    { 
      id: 2,
      date: "Dec 28, 2022", 
      topic: "Overcoming a Personal Challenge",
      content: "Last month I faced one of the most difficult challenges of my career. I was asked to lead a project with a team I had never worked with before, and the deadline was incredibly tight.\n\nI remember feeling overwhelmed at first. The project specifications kept changing, and I wasn't sure if I had the right experience to guide the team effectively. There were nights I couldn't sleep, going over all the ways things could go wrong.\n\nWhat helped was breaking down the project into smaller, manageable steps. Instead of focusing on the entire mountain, I just focused on the next step ahead..."
    },
    { 
      id: 3,
      date: "Dec 15, 2022", 
      topic: "What Brings Me Joy",
      content: "It's the small things that bring me the most joy. The smell of fresh coffee in the morning, the sound of rain against my window when I'm cozy indoors, and unexpected messages from old friends.\n\nI've noticed that the moments I feel most joyful are rarely about big achievements or material things. Instead, they're about connection – to others, to nature, or to myself.\n\nYesterday, I spent an hour just watching birds in my backyard. There was something so peaceful about observing them go about their lives, completely present in the moment..."
    },
    { 
      id: 4,
      date: "Dec 5, 2022", 
      topic: "My Goals for the Next Year",
      content: "As the year comes to a close, I've been reflecting on what I want to accomplish in the coming months. Not just professional goals, but personal ones too.\n\nOne thing I've realized is that I need to make more time for creative pursuits. I used to paint regularly, but that habit has fallen by the wayside as work got busier. I miss the sense of flow and accomplishment that comes from creating something with my hands.\n\nI also want to focus on deepening my relationships. It's easy to let friendships coast on autopilot, but the most meaningful connections require intention and care..."
    },
    { 
      id: 5,
      date: "Nov 22, 2022", 
      topic: "A Moment of Gratitude",
      content: "Today I'm grateful for the support system I have. Family, friends, even colleagues who have become friends over time.\n\nThis past week has been challenging in many ways, but having people who check in, who listen without judgment, and who offer help without being asked – it makes all the difference.\n\nI'm especially thankful for my sister, who called at exactly the right moment yesterday. She couldn't have known I was having a hard day, but her call turned things around. Just talking and laughing about nothing important reminded me that difficult moments pass..."
    },
  ];

  const generateNewTopic = () => {
    const randomIndex = Math.floor(Math.random() * journalPrompts.length);
    const newTopic = journalPrompts[randomIndex];
    
    setCurrentTopic(newTopic);
    setCurrentDate(format(new Date(), "MMM d, yyyy - h:mma"));
    
    setDisplayedEntry("");
    setJournalEntry("");
    
    toast({
      title: "New topic generated",
      description: "Start writing about your new journal topic.",
    });
  };

  const saveJournalEntry = () => {
    if (journalEntry.trim()) {
      const updatedEntry = displayedEntry ? `${displayedEntry}\n\n${journalEntry}` : journalEntry;
      setDisplayedEntry(updatedEntry);
      setJournalEntry("");
      setCurrentDate(format(new Date(), "MMM d, yyyy - h:mma"));
      
      toast({
        title: "Journal updated",
        description: "Your journal entry has been saved.",
      });
    }
  };

  const handleSelectJournalEntry = (entry: JournalEntry) => {
    setDisplayedEntry(entry.content);
    setJournalEntry("");
    setCurrentTopic(entry.topic);
    setCurrentDate(entry.date);
    setShowJournalHistory(false);
    
    toast({
      title: "Journal entry loaded",
      description: `Loaded journal entry from ${entry.date}`,
    });
  };

  return {
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
  };
};
