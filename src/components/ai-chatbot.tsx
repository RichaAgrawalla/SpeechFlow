
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

// Define the message type
interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

// Define the predefined responses for at least 20 keywords
const predefinedResponses: Record<string, string> = {
  // Keyword responses for speech improvement
  "filler words": "To reduce filler words like 'um' and 'uh', try pausing instead. Practice being comfortable with silence and prepare key points before speaking.",
  "pace": "Work on your speaking pace by practicing with a metronome or recording yourself. Aim for 120-150 words per minute for optimal comprehension.",
  "too fast": "Try marking pauses in your script. Take a breath at punctuation marks and practice speaking more deliberately.",
  "too slow": "Practice increasing your pace gradually. Record yourself and aim to reduce the time without sacrificing clarity.",
  "volume": "To improve volume control, practice deep diaphragmatic breathing. Project from your core rather than straining your throat.",
  "monotone": "Add vocal variety by emphasizing important words, changing your pitch for questions, and practicing reading emotional passages aloud.",
  "pronunciation": "Work on pronunciation by breaking down difficult words into syllables and practicing them slowly before increasing speed.",
  "articulation": "Improve articulation with tongue twisters. Focus on enunciating consonants clearly, especially at the ends of words.",
  "pauses": "Strategic pauses can emphasize important points. Try the 'pause and punch' technique before key statements.",
  "gestures": "Natural hand movements can enhance your message. Practice keeping your hands visible and using deliberate gestures that reinforce your points.",
  "eye contact": "Practice maintaining eye contact for 3-5 seconds per person when speaking to groups. In virtual settings, look directly at the camera.",
  "confidence": "Build speaking confidence through preparation, visualization, and regular practice in low-stakes situations.",
  "anxiety": "Manage speech anxiety with deep breathing exercises, positive visualization, and thorough preparation of your content.",
  "structure": "A clear speech structure (strong opening, 3-5 main points, memorable conclusion) helps both you and your audience follow along.",
  "engagement": "Engage your audience by asking rhetorical questions, sharing relevant stories, and varying your delivery style.",
  "feedback": "To improve, record yourself regularly and watch with the sound off (for body language) and listen with eyes closed (for vocal variety).",
  "practice": "Effective practice involves speaking out loud, not just reading silently. Consider joining a group like Toastmasters for regular practice.",
  "storytelling": "Enhance storytelling by including sensory details, clear characters, conflict, and a resolution that connects to your main message.",
  "audience": "Always adapt your content and delivery to your specific audience's knowledge level, interests, and expectations.",
  "credibility": "Build credibility by supporting claims with evidence, sharing relevant experiences, and acknowledging different perspectives.",
  "presentation": "For impactful presentations, follow the 10-20-30 rule: 10 slides, 20 minutes, 30-point font minimum.",
  "slides": "Keep slides simple with one idea per slide. Use high-quality visuals and minimal text with a consistent design.",
  "virtual": "For virtual presentations, look at the camera, ensure good lighting on your face, use a clean background, and check your audio quality.",
  "questions": "When handling Q&A, listen fully before responding, rephrase complex questions, and prepare for likely questions in advance.",
};

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your AI speech coach. How can I help improve your speaking skills today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Generate bot response based on keywords
    setTimeout(() => {
      const botResponse = generateResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const generateResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowercaseInput.includes(keyword)) {
        return response;
      }
    }
    
    // Default responses if no keyword match
    const defaultResponses = [
      "Could you tell me more about what specific speaking skills you'd like to improve?",
      "I'm here to help with various aspects of public speaking. You can ask about pacing, filler words, structure, engagement, and more.",
      "Try asking about specific speech challenges like handling nervousness, improving vocal variety, or structuring your presentations.",
      "Based on your speaking history, focusing on pacing and clarity might be beneficial. Would you like specific tips?",
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  return (
    <div className="flex flex-col h-[400px] border rounded-md overflow-hidden">
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
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </Avatar>
                )}
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messageEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for speaking tips..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
