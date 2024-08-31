import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pause, Disc3, Play } from 'lucide-react';

const StreamPreviewCard: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);

  const toggleRecording = () => setIsRecording(!isRecording);
  const toggleStreaming = () => setIsStreaming(!isStreaming);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Stream Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative mb-4">
          <p className="text-white text-sm sm:text-base">Stream Preview</p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            className="w-full sm:w-auto text-xs sm:text-sm"
            size="sm"
            variant={isRecording ? "destructive" : "secondary"}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <Pause className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <Disc3 className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            )}
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
          <Button
            className="w-full sm:w-auto text-xs sm:text-sm"
            size="sm"
            variant={isStreaming ? "destructive" : "secondary"}
            onClick={toggleStreaming}
          >
            {isStreaming ? (
              <Pause className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            ) : (
              <Play className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
            )}
            {isStreaming ? "Stop Streaming" : "Start Streaming"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreamPreviewCard;