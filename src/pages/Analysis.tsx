
import { useState, useEffect } from "react";
import { 
  Mic, 
  Square, 
  AlertCircle, 
  HelpCircle, 
  VolumeX, 
  Volume2, 
  Info 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const AnalysisPage = () => {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioLevel, setAudioLevel] = useState<number[]>([20, 30, 40, 60, 50, 35, 45, 55]);
  const [fillerWords, setFillerWords] = useState<string[]>([]);
  const [pace, setPace] = useState(0);
  const [clarity, setClarity] = useState(0);
  const [tone, setTone] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
        
        // Simulate audio level changes
        setAudioLevel((prev) => {
          const newLevels = [...prev];
          newLevels.shift();
          newLevels.push(Math.floor(Math.random() * 70) + 10);
          return newLevels;
        });
        
        // Simulate real-time analysis after 5 seconds
        if (recordingTime > 5 && recordingTime % 3 === 0) {
          // Random chance of detecting a filler word
          if (Math.random() > 0.6) {
            const fillers = ["um", "uh", "like", "you know", "actually"];
            const newFiller = fillers[Math.floor(Math.random() * fillers.length)];
            setFillerWords((prev) => [...prev, newFiller]);
          }
          
          // Update metrics
          setPace(Math.min(100, Math.floor(Math.random() * 20) + pace));
          setClarity(Math.min(100, Math.floor(Math.random() * 15) + clarity));
          setTone(Math.min(100, Math.floor(Math.random() * 10) + tone));
          
          // Add feedback after 10 seconds
          if (recordingTime > 10 && feedback.length < 2) {
            const feedbackOptions = [
              "Try to speak slower for better clarity",
              "Great job on varying your tone",
              "Consider adding more pauses for emphasis",
              "Your pronunciation is improving"
            ];
            const newFeedback = feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)];
            if (!feedback.includes(newFeedback)) {
              setFeedback((prev) => [...prev, newFeedback]);
            }
          }
        }
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording, recordingTime, pace, clarity, tone, feedback]);

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      setFillerWords([]);
      setPace(0);
      setClarity(0);
      setTone(0);
      setFeedback([]);
      
      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      });
    } else {
      // Stop recording
      setIsRecording(false);
      
      toast({
        title: "Recording stopped",
        description: "Your recording has been analyzed.",
      });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Real-time Analysis</h1>
        <p className="text-muted-foreground">
          Get instant feedback as you speak to improve your communication skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="border-2 border-navy-100 dark:border-navy-800 mb-6">
            <CardHeader>
              <CardTitle>Speech Recorder</CardTitle>
              <CardDescription>
                Record your speech to get real-time analysis and feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center mb-6">
                <Button
                  onClick={toggleRecording}
                  size="lg"
                  className={`rounded-full h-20 w-20 ${
                    isRecording 
                      ? "bg-red-500 hover:bg-red-600" 
                      : "bg-navy-600 hover:bg-navy-700"
                  }`}
                >
                  {isRecording ? (
                    <Square className="h-8 w-8" />
                  ) : (
                    <Mic className="h-8 w-8" />
                  )}
                </Button>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-2xl font-bold">{formatTime(recordingTime)}</div>
                <p className="text-sm text-muted-foreground">
                  {isRecording ? "Recording in progress..." : "Ready to record"}
                </p>
              </div>
              
              <div className="h-16 flex items-end justify-between gap-1 mb-4">
                {audioLevel.map((level, index) => (
                  <div
                    key={index}
                    className={`w-full bg-navy-600 dark:bg-navy-400 rounded-t-md transition-all ${
                      isRecording ? "animate-wave" : ""
                    }`}
                    style={{ 
                      height: `${isRecording ? level : 5}%`, 
                      animationDelay: `${index * 0.1}s` 
                    }}
                  ></div>
                ))}
              </div>
              
              {!isRecording && recordingTime > 0 && (
                <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-md p-3 text-green-800 dark:text-green-200 text-sm">
                  Analysis complete! Scroll down to see your results.
                </div>
              )}
              
              {!isRecording && recordingTime === 0 && (
                <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-md p-3 text-blue-800 dark:text-blue-200 text-sm flex items-start space-x-2">
                  <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
                  <p>
                    Click the microphone button to start recording. Speak clearly and at a natural pace for the best analysis results.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {(isRecording || recordingTime > 0) && (
            <Card className="border-2 border-navy-100 dark:border-navy-800">
              <CardHeader>
                <CardTitle>Real-time Metrics</CardTitle>
                <CardDescription>
                  Live analysis of your speaking performance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Speaking Pace</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">
                              Measures if you're speaking too quickly or too slowly. Aim for a balanced, natural pace.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-sm font-medium">
                      {pace < 30 ? "Too Slow" : pace > 70 ? "Too Fast" : "Good"}
                    </span>
                  </div>
                  <Progress value={pace} className="h-2" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Clarity</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">
                              Measures how clearly you articulate words and maintain consistent volume.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-sm font-medium">
                      {clarity < 40 ? "Needs Work" : clarity > 70 ? "Excellent" : "Good"}
                    </span>
                  </div>
                  <Progress value={clarity} className="h-2" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Tone Variation</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="w-60">
                              Measures how well you vary your tone to maintain audience engagement.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="text-sm font-medium">
                      {tone < 30 ? "Monotone" : tone > 70 ? "Dynamic" : "Average"}
                    </span>
                  </div>
                  <Progress value={tone} className="h-2" />
                </div>
                
                <div className="pt-2">
                  <h3 className="font-medium mb-3">Filler Words Detected</h3>
                  {fillerWords.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {fillerWords.map((word, index) => (
                        <Badge key={index} variant="secondary" className="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300">
                          "{word}" at {formatTime(index * 3 + 5)}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No filler words detected yet.</p>
                  )}
                </div>
                
                {feedback.length > 0 && (
                  <div className="pt-2">
                    <h3 className="font-medium mb-3">Live Feedback</h3>
                    <div className="space-y-2">
                      {feedback.map((item, index) => (
                        <div key={index} className="bg-navy-50 dark:bg-navy-900 p-3 rounded-md text-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="border-2 border-navy-100 dark:border-navy-800 sticky top-20">
            <CardHeader>
              <CardTitle>Speaking Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1 flex items-center">
                  <VolumeX className="h-4 w-4 mr-2" />
                  Avoid Filler Words
                </h3>
                <p className="text-sm text-muted-foreground">
                  Replace "um," "uh," and "like" with strategic pauses that add emphasis.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1 flex items-center">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Vary Your Tone
                </h3>
                <p className="text-sm text-muted-foreground">
                  Modulate your voice to emphasize key points and maintain engagement.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Monitor Your Pace
                </h3>
                <p className="text-sm text-muted-foreground">
                  Speak at a measured rate—not too fast to comprehend, not too slow to bore.
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-navy-50 dark:bg-navy-900 rounded-b-lg">
              <div className="text-xs text-navy-700 dark:text-navy-300 space-y-2">
                <p className="font-medium">Pro Tip:</p>
                <p>Record yourself practicing the same speech multiple times to track your improvement over repetitions.</p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
