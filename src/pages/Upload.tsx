
import { useState } from "react";
import { 
  Upload, 
  File, 
  X, 
  CheckCircle2, 
  AlertCircle 
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const UploadPage = () => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadComplete(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setUploadComplete(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
    setUploadComplete(false);
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadComplete(true);
        toast({
          title: "Upload complete!",
          description: "Your speech has been uploaded and is now being analyzed.",
        });
      }
    }, 500);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upload Speech</h1>
        <p className="text-muted-foreground">
          Upload an audio recording for detailed analysis and feedback
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="border-2 border-navy-100 dark:border-navy-800">
            <CardHeader>
              <CardTitle>Upload Audio File</CardTitle>
              <CardDescription>
                Supported formats: MP3, WAV, M4A (Max size: 500MB)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  selectedFile ? "border-green-500" : "border-border"
                }`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {!selectedFile ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <Upload className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your audio file here, or
                      </p>
                      <Button
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Select File
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".mp3,.wav,.m4a"
                        onChange={handleFileSelect}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border rounded-md p-3">
                      <div className="flex items-center space-x-3">
                        <File className="h-8 w-8 text-navy-600 dark:text-navy-300" />
                        <div className="text-left">
                          <p className="font-medium">{selectedFile.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleRemoveFile}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}

                    {uploadComplete && (
                      <div className="flex items-center justify-center space-x-2 text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Upload complete! Analysis in progress...</span>
                      </div>
                    )}

                    {!isUploading && !uploadComplete && (
                      <Button onClick={handleUpload} className="w-full">
                        Start Upload
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {uploadComplete && (
            <Card className="mt-6 border-2 border-navy-100 dark:border-navy-800">
              <CardHeader>
                <CardTitle>Analysis in Progress</CardTitle>
                <CardDescription>
                  Our AI is analyzing your speech for detailed feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Analyzing speech patterns...</span>
                    <span>60%</span>
                  </div>
                  <Progress value={60} className="h-2" />
                  
                  <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md p-3 text-amber-800 dark:text-amber-200 text-sm flex items-start space-x-2">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p>
                      Analysis might take a few minutes depending on the length of your recording. You'll receive a notification when it's complete.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          <Card className="border-2 border-navy-100 dark:border-navy-800">
            <CardHeader>
              <CardTitle>Tips for Better Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Audio Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure your recording has minimal background noise for better analysis.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">Speech Content</h3>
                <p className="text-sm text-muted-foreground">
                  For best results, upload a speech that's at least 1 minute long.
                </p>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-1">File Format</h3>
                <p className="text-sm text-muted-foreground">
                  MP3 and WAV formats typically provide the best audio quality.
                </p>
              </div>
            </CardContent>
            <CardFooter className="bg-navy-50 dark:bg-navy-900 rounded-b-lg">
              <p className="text-xs text-navy-700 dark:text-navy-300">
                Your audio files are encrypted and securely processed. We don't store your original recordings longer than necessary for analysis.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
