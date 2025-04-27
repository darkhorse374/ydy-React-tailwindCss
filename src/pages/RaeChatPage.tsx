
import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const RaeChatPage = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there, I'm Rae. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        content: inputValue,
        sender: "user",
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputValue("");
      
      // Simulate bot response after a short delay
      setTimeout(() => {
        const botResponses = [
          "I understand how you feel. Would you like to talk more about that?",
          "Thank you for sharing. How does that make you feel?",
          "I'm here to listen. Can you tell me more about your situation?",
          "That sounds challenging. What coping strategies have worked for you in the past?",
          "It's normal to feel that way. What would help you feel better right now?"
        ];
        
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
        
        const botMessage: Message = {
          id: Date.now().toString(),
          content: randomResponse,
          sender: "bot",
          timestamp: new Date(),
        };
        
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleGoBack = () => {
    navigate("/rae");
  };

  return (
    <div className="container mx-auto p-6 h-[calc(100vh-150px)] flex flex-col">
      <div className="flex items-center mb-4 gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={handleGoBack} 
          className="mr-2"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Bot className="h-8 w-8 text-[#6699FF]" />
        <h1 className="text-2xl font-bold">Chat with Rae</h1>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  {message.sender === "bot" && (
                    <Avatar className="h-8 w-8 bg-[#6699FF] text-white flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </Avatar>
                  )}
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-[#6699FF] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.sender === "user" && (
                    <Avatar className="h-8 w-8 bg-gray-300 text-white flex items-center justify-center">
                      <span className="text-xs font-medium">You</span>
                    </Avatar>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Textarea
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="resize-none"
              rows={1}
            />
            <Button
              variant="blue-custom"
              size="icon"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Rae is an AI assistant and may not always provide accurate information.
            For serious mental health concerns, please contact a professional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RaeChatPage;
